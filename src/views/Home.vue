<template>
    <div class="container">
        <h2>Home</h2>
        <v-container grid-list-xl fluid>
            <v-layout justify-center wrap>
                <v-flex xs12 sm10 md6 lg4 xl3>
                    <fit-data-card :steps="steps"></fit-data-card>
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
            steps: 0,
        }),
        components: {
            BarDataCard,
            HelloWorld,
            "fit-data-card": FitDataCard,
            "bar-data-card": BarDataCard
        },
        mounted() {
            this.$eventBus.$on('emitAuthToken', payload =>
                this.getTodaySteps(payload)
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

            getTodaySteps(token) {
                axios({
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    }, method: 'post', url: 'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', data: {
                        "aggregateBy": [{
                            "dataTypeName": "com.google.step_count.delta",
                            "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                        }],
                        "bucketByTime": {"durationMillis": 86400000},//24 hours
                        "startTimeMillis": this.getStartOfDayMillis(),
                        "endTimeMillis": new Date().getTime()
                    }
                }).then(response => {
                        console.log(response);
                        this.steps = parseInt(response.data.bucket[0].dataset[0].point[0].value[0].intVal)
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
