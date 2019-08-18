import axios from "axios";


export const apiCalls = {
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
                    var weekday = new Array(7);
                    weekday[0] = "Su";
                    weekday[1] = "M";
                    weekday[2] = "Tu";
                    weekday[3] = "W";
                    weekday[4] = "Th";
                    weekday[5] = "F";
                    weekday[6] = "Sa";
                    var weekSteps = {}
                    for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                        var date = new Date()
                        date.setDate(date.getDate() + i + 1)
                        weekSteps[weekday[date.getDay()]] = parseInt(response.data.bucket[i].dataset[0].point[0].value[0].intVal)
                    }
                    this.$store.commit('setStepsLast7Days', weekSteps)

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


    }
}