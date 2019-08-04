<template>
    <v-card
            max-width="344"
            class="mx-auto"
    >
        <v-list-item>
            <v-list-item-avatar color="grey"></v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">Steps of the day</v-list-item-title>
                <v-list-item-subtitle>100 pasos para el objetivo</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-progress-circular
                :value="value"
                color="teal"
                rotate="270"
                :size="size"
                :width="width"
        >Steps</v-progress-circular>


        <!--<v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>-->

        <v-card-actions>
           
        </v-card-actions>
    </v-card>
</template>

<script>
    import VueApexCharts from 'vue-apexcharts'

    export default {
        name: 'fitDataCard',
        components: {
            "apexchart": VueApexCharts
        },
        data: () => ({
            value: 0,
            size: 150,
            width: 15,
            title: "",
            subtitle: "",
            icon: "",


        }),
        beforeDestroy () {
            clearInterval(this.interval)
        },
        mounted () {
            this.interval = setInterval(() => {
                if (this.value === 100) {
                    return (this.value = 0)
                }
                this.value += 10
            }, 1000)
        },

    }


</script>