<template>
    <div class="container">
        <h2>Home</h2>
        <v-container grid-list-xl fluid>
            <v-layout justify-center wrap>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <fit-data-card type=steps></fit-data-card>
                </v-flex>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <bar-data-card type=heartRate></bar-data-card>
                </v-flex>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <fit-data-card></fit-data-card>
                </v-flex>
                <v-flex xs12 sm12 md6 lg4 xl3>
                    <fit-data-card></fit-data-card>
                </v-flex>
            </v-layout>

        </v-container>

    </div>

</template>

<script>
    import axios from "axios";

    import HelloWorld from '../components/HelloWorld.vue'
    import FitDataCard from '../components/FitDataCard.vue'
    import BarDataCard from '../components/BarDataCard.vue'

    import moment from 'moment'
    import { apiCalls } from '../mixins/apiCalls'

    export default {
        name: 'app',
        mixins: [apiCalls],
        components: {
            BarDataCard,
            HelloWorld,
            "fit-data-card": FitDataCard,
            "bar-data-card": BarDataCard
        },
        data: () => ({
            result: "",
            stepsLast7Days: {}
        }),
        methods: {
            getFitData(token) {
                axios({
                        headers: {
                            Authorization: 'Bearer ' + token //the token is a variable which holds the token
                        }, method: "GET", "url": "https://www.googleapis.com/fitness/v1/users/me/sessions"
                    }
                ).then(result => {
                    this.result = result;
                }, error => {
                    console.error(error);
                });
            },

            getTodayHeartRate: function (token) {
                console.log("on getTodayHeartRate")
                axios({
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }, method: 'post', url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', data: {
                        "aggregateBy": [{
                            "dataTypeName": "com.google.heart_rate.bpm",
                            "dataSourceId": "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
                        }],
                        "bucketByTime": {"durationMillis": 3600000},//1 hour
                        "startTimeMillis": this.getStartOfDayMillis(),
                        "endTimeMillis": new Date().getTime()
                    }
                }).then(response => {
                        var averageHeartRateDataByHour = {}
                        for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                            var hourData = response.data.bucket[i].dataset[0].point[0]

                            if (hourData != undefined) {
                                averageHeartRateDataByHour[moment(hourData.startTimeNanos / 1000000).format("YYYY-MM-DDTHH:mm:ss")] = Math.round(hourData.value[0].fpVal)
                                console.log("val ", Math.round(hourData.value[0].fpVal))
                                console.log("startTimeNanos ", moment(hourData.startTimeNanos / 1000000).format("YYYY-MM-DDTHH:mm:ss"))
                            }
                        }
                        this.$store.commit('setAverageHeartRateDataByHour', averageHeartRateDataByHour)
                        // console.log("heart rate parsed data", averageHeartRateDataByHour)
                    },
                    error => {
                        console.log(error);
                    })
            },


            getStartOfDayMillis() {
                var now = new Date();
                now.setUTCHours(0, 0, 0, 0);
                return now.getTime()
            },
            get7DaysBeforeTodayMillis() {
                var now = new Date();
                now.setDate(now.getDate() - 6)
                now.setUTCHours(0, 0, 0, 0);
                return now.getTime()
            },


        },
        created() {
            this.getTodayHeartRate(this.$store.getters.authToken)
            this.get7DaysSteps(this.$store.getters.authToken)
        },


    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
