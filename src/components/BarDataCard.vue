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
                        <div class="title font-weight-light grey--text">{{subtitle1Name}} <br> {{setData}}</div>
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

                        <v-chip v-for="day in Object.keys(days)" :key="day" :value="day">
                            {{ day }}
                        </v-chip>
                    </v-chip-group>

                </v-layout>
            </v-card-actions>

            <v-divider class="my-2"></v-divider>

            <v-btn class="ma-2" tile outlined color="teal">
                <v-icon left>mdi-timetable</v-icon>
                History
            </v-btn>
        </v-card-text>

    </v-card>
</template>


<script>
    import VueApexCharts from 'vue-apexcharts'
    import { timeUtils } from '../mixins/timeUtils'

    export default {
        name: 'barDataCard',
        mixins: [timeUtils],
        components: {
            "apexchart": VueApexCharts
        },
        props: {
            type: ""
        },
        data: () => ({
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
                [
                ],
        }),

        computed: {
            setData: function () {
                if (this.type == "heartRate") {
                    var keys = Object.keys(this.$store.getters.averageHeartRateDataByHour)
                    var values = Object.values(this.$store.getters.averageHeartRateDataByHour)


                    this.categories = keys
                    console.log("cats ", this.categories)
                    console.log("series ", values)


                    this.title = "Heart Rate Registrations"
                    this.subtitle1Name = "Max BPM"
                    this.subtitle1Value = "180"
                    this.subtitle2Name = "Min BPM"
                    this.subtitle2Value = "45"

                    this.chartOptions = {
                        ...this.chartOptions,
                        ...{
                            xaxis: {
                                type: 'datetime',
                                categories: keys,
                            }
                        }
                    }
                    this.series = [
                        {
                            name: "Average Heart Rate",
                            data: values
                        }
                    ];


                }

                return Math.max(...values);
            }

        },
        methods: {
            setLast7Days: function () {
                var weekDays = this.getWeekDaysArray()
                var days = {}
                var j = 0
                for (var i = 6; i >= 0; i--) {
                    var date = new Date()
                    date.setDate(date.getDate() - i )
                    days[weekDays[date.getDay()]] = date
                    j++;
                }
                return days;
            }
        },
        mounted: function () {
            this.setData
            this.days = this.setLast7Days();
            this.selection = this.days[this.days.length - 1]


        }
    }


</script>

<style scoped>
    .v-sheet--offset {
        top: -24px;
        position: relative;
    }

</style>