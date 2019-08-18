import axios from "axios";
import { timeUtils } from '../mixins/timeUtils'


export const apiCalls = {
    mixins: [timeUtils],
    data: () => ({
    }),
    created: function () {
        console.log("Im in the Mixin")
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



    }
}