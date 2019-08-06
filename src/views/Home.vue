<template>
    <div class="container">
        <h2>Home</h2>
        <v-container grid-list-xl fluid>
            <v-layout justify-center wrap>
                <v-flex xs12 sm10 md6 lg4 xl3 >
                    <fit-data-card></fit-data-card>
                </v-flex>
                <v-flex xs12 sm10 md6 lg4 xl3 >
                    <bar-data-card></bar-data-card>
                </v-flex>
                <v-flex xs12 sm10 md6 lg4 xl3 >
                    <fit-data-card></fit-data-card>
                </v-flex>
                <v-flex xs12 sm12 md6 lg4 xl3>
                    <fit-data-card></fit-data-card>
                </v-flex>
            </v-layout>
            <textarea>{{ result }}</textarea>

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
        }),
        components: {
            BarDataCard,
            HelloWorld,
            "fit-data-card" : FitDataCard,
            "bar-data-card" : BarDataCard
        },
        mounted() {
            this.$eventBus.$on('emitAuthToken', payload =>
                this.getFitData(payload)
            )
        },
        methods: {
            getFitData(token){
                axios({ headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                    },method: "GET", "url": "https://www.googleapis.com/fitness/v1/users/me/sessions" }
                ).then(result => {
                    this.result = result;
                }, error => {
                    console.error(error);
                });
            }

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
