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

        <apexchart width="350" type="radialBar" :options="chartOptions" :series="series"></apexchart>


        <!--<v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>-->

        <v-card-actions>
            <v-btn
                    text
                    color="deep-purple accent-4"
            >
                Read
            </v-btn>
            <v-btn
                    text
                    color="deep-purple accent-4"
            >
                Bookmark
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
            </v-btn>
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
            chartOptions: {
                labels: ["Steps"],
                colors: ['#2dfa00'],
            },
            series: [81],
        }),

    }


</script>