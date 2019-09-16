import axios from "axios";
import { timeUtils } from '../mixins/timeUtils'
import moment from 'moment'


export const apiCalls = {
    mixins: [timeUtils],
    data: () => ({
    }),
    created: function () {
    },

    methods: {
        get7DaysSteps: function (token) {
            axios({
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }, method: 'post', url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', data: {
                    "aggregateBy": [{
                        "dataTypeName": "com.google.step_count.delta",
                        "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                    }],
                    "bucketByTime": {"durationMillis": 86400000},//24 hours
                    "startTimeMillis": this.get7DaysBeforeTodayMillis(),
                    "endTimeMillis": new Date().getTime()
                }
            }).then(response => {
                    //parseInt(response.data.bucket[0].dataset[0].point[0].value[0].intVal)
                    var weekDays = this.getWeekDaysArray()

                    var weekSteps = {}
                    for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                        var date = new Date()
                        date.setDate(date.getDate() + i + 1)
                        weekSteps[weekDays[date.getDay()]] = parseInt(response.data.bucket[i].dataset[0].point[0].value[0].intVal)
                    }
                    this.$store.commit('setStepsLast7Days', weekSteps)

                },
                error => {
                    console.log(error);
                })
        },

        getTodayHeartRate: function (token) {
            axios({
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }, method: 'post', url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', data: {
                    "aggregateBy": [{
                        "dataTypeName": "com.google.heart_rate.bpm",
                        "dataSourceId": "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
                    }],
                    "bucketByTime": {"durationMillis": 3600000},//1 hour
                    "startTimeMillis": this.getTodayStartOfDayMillis(),
                    "endTimeMillis": new Date().getTime()
                }
            }).then(response => {
                    var averageHeartRateDataByHour = {}
                    for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                        var hourData = response.data.bucket[i].dataset[0].point[0]
                        if (hourData != undefined) {
                            averageHeartRateDataByHour[moment(hourData.startTimeNanos / 1000000).format("YYYY-MM-DDTHH:mm:ss")] = Math.round(hourData.value[0].fpVal)
                        }
                    }
                    this.$store.commit('setAverageHeartRateDataByHour', averageHeartRateDataByHour)
                },
                error => {
                    console.log(error);
                })
        },

        getHeartRateByDate: function (token, date) {
            axios({
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }, method: 'post', url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', data: {
                    "aggregateBy": [{
                        "dataTypeName": "com.google.heart_rate.bpm",
                        "dataSourceId": "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
                    }],
                    "bucketByTime": {"durationMillis": 3600000},//1 hour
                    "startTimeMillis": this.getStartOfDayMillis(date),
                    "endTimeMillis": this.getEndOfDayMillis(date),
                }
            }).then(response => {
                    var averageHeartRateDataByHour = {}
                    for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                        var hourData = response.data.bucket[i].dataset[0].point[0]
                        if (hourData != undefined) {
                            averageHeartRateDataByHour[moment(hourData.startTimeNanos / 1000000).format("YYYY-MM-DDTHH:mm:ss")] = Math.round(hourData.value[0].fpVal)
                        }
                    }
                    this.$store.commit('setAverageHeartRateDataByHour', averageHeartRateDataByHour)
                },
                error => {
                    console.log(error);
                })
        },


    }
}