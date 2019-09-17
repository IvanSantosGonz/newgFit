<template>
    <v-card
            class="mt-4 mx-auto"
            max-width="400"
    >
        <v-sheet
                class="v-sheet--offset mx-auto"
                color="cyan"
                elevation="12"
                max-width="calc(100% - 32px)"
        >
            <apexchart type=area height=150 :options="chartOptions" :series="series"/>
        </v-sheet>

        <v-card-text class="pt-0">
            <v-container grid-list-xl fluid>
                <v-layout align-center justify-center>
                    <v-icon
                            color="red lighten-2"
                            class="mr-6"
                            size="64"
                    >
                        mdi-heart-pulse
                    </v-icon>
                    <div class="title font-weight-light mb-2">
                        {{title}}
                    </div>
                </v-layout>
                <v-layout align-center justify-center>
                    <v-flex xs6 sm6 md6 lg6 xl6>
                        <div class="title font-weight-light grey--text">{{subtitle1Name}} <br> {{subtitle1Value}}</div>
                    </v-flex>
                    <v-flex xs6 sm6 md6 lg6 xl6>
                        <div class="title font-weight-light grey--text">{{subtitle2Name}} <br> {{subtitle2Value}}</div>
                    </v-flex>
                </v-layout>
            </v-container>

            <v-divider class="my-2"></v-divider>
            <v-card-actions>

                <v-layout class="chip-group-layout" align-center justify-center>
                    <v-chip-group
                            v-model="selection"
                            active-class="teal"
                            mandatory
                            center-active
                    >

                        <v-chip @click="clicked(day)" v-for="day in Object.keys(days)" :key="day" :value="day">
                            {{ day }}
                        </v-chip>
                    </v-chip-group>

                </v-layout>
            </v-card-actions>

            <v-divider class="my-2"></v-divider>

            <v-btn @click.stop="dialog = true" class="ma-2" tile outlined color="teal">
                <v-icon left>mdi-timetable</v-icon>
                History
            </v-btn>
        </v-card-text>

        <v-dialog
                v-model="dialog"
                max-width="290"
        >
            <v-date-picker v-model="picker"></v-date-picker>
        </v-dialog>


    </v-card>




</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    import {timeUtils} from '../mixins/timeUtils'
    import {apiCalls} from '../mixins/apiCalls'


    export default {
        name: 'barDataCard',
        mixins: [timeUtils, apiCalls],
        components: {
            "apexchart": VueApexCharts
        },
        props: {
            type: String
        },
        data: () => ({
            dialog: false,
            picker: new Date().toISOString().substr(0, 10),
            title: "BPM",
            subtitle1Name: "Max DPI",
            subtitle1Value: "70",
            subtitle2Name: "Min DPI",
            subtitle2Value: "70",
            series: [{}],
            chartOptions: {
                grid: {
                    show: true,
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: false
                        }
                    }
                },
                dataLabels: {
                    enabled: false
                }
                ,
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'datetime',
                    categories:
                        [],

                },
                tooltip: {
                    enabled: false,
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    },
                    onDatasetHover: {
                        highlightDataSeries: false,
                    },
                },
                chart: {
                    toolbar: {
                        show: false,
                        tools: {
                            download: true,
                            selection: true,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true | '<img src="/static/icons/reset.png" width="20">',
                            customIcons: []
                        },
                        autoSelected: 'zoom'
                    },
                    selection: {
                        enabled: false,
                    },
                    zoom: {
                        enabled: false
                    }

                }

            },
            selection: 'Su',
            days:
                {},
        }),

        computed: {},
        methods: {
            setLast7Days: function () {
                let weekDays = this.getWeekDaysArray();
                for (let i = 6; i >= 0; i--) {
                    let date = new Date();
                    date.setDate(date.getDate() - i);
                    this.days[weekDays[date.getDay()]] = date
                }
                return this.days;
            },
            clicked: function (day) {
                this.getHeartRateByDate(this.$store.getters.authToken, this.days[day])
                    .then(averageHeartRateDataByHour => {
                            this.setData(averageHeartRateDataByHour)
                        }
                    );
            },
            setData: function (averageHeartRateDataByHour) {
                if (this.type == "heartRate") {
                    let keys = Object.keys(averageHeartRateDataByHour);
                    let values = Object.values(averageHeartRateDataByHour);

                    this.categories = keys;
                    //console.log("cats ", this.categories)
                    //console.log("series ", values)

                    this.subtitle1Value = Math.max(...values);
                    this.subtitle2Value = Math.min(...values);

                    this.chartOptions = {
                        ...this.chartOptions,
                        ...{
                            xaxis: {
                                type: 'datetime',
                                categories: keys,
                            }
                        }
                    };
                    this.series = [
                        {
                            name: "Average Heart Rate",
                            data: values
                        }
                    ];
                }
            }

        },
        mounted: function () {
            this.days = this.setLast7Days();
            let daysKeys = Object.keys(this.days);
            this.selection = daysKeys[daysKeys.length - 1];

            this.getHeartRateByDate(this.$store.getters.authToken, this.days[this.selection])
                .then(averageHeartRateDataByHour => {
                        this.setData(averageHeartRateDataByHour)
                    }
                );

        }
    }


</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

</style>