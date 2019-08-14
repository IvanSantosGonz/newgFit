<template>
    <div class="container">
        <h2>Home</h2>
        <v-container grid-list-xl fluid>
            <v-layout justify-center wrap>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <fit-data-card :stepsLast7Days="stepsLast7Days"></fit-data-card>
                </v-flex>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <bar-data-card></bar-data-card>
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

    export default {
        name: 'app',
        data: () => ({
            result: "",
            stepsLast7Days: {},
        }),
        components: {
            BarDataCard,
            HelloWorld,
            "fit-data-card": FitDataCard,
            "bar-data-card": BarDataCard
        },
        mounted() {
            this.$eventBus.$on('emitAuthToken', payload =>
                this.get7DaysSteps(payload)
            )
        },
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

            get7DaysSteps(token) {
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

                        for (var i = 0; i <= response.data.bucket.length - 1; i++) {
                            var date = new Date()
                            console.log("today is ", date.getDay())
                            date.setDate(date.getDate() + i + 1 )
                            console.log("day = ", date.getDay())
                            this.stepsLast7Days[weekday[date.getDay()]] = parseInt(response.data.bucket[i].dataset[0].point[0].value[0].intVal)
                        }
                        console.log(response);
                        console.log(this.stepsLast7Days);
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
        beforeDestroy() {
            this.$eventBus.$off('emitAuthToken');
        }

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
