<template>
    <v-card
            max-width="344"
            class="mx-auto"
    >
        <v-list-item>
            <v-list-item-avatar color="teal"><v-icon medium color="black">{{this.icon}}</v-icon></v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">{{this.title}}</v-list-item-title>
                <v-list-item-subtitle class="subheadline">{{this.subtitle}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-progress-circular
                :value="value"
                color="teal"
                rotate="270"
                :size="size"
                :width="width"
        ><v-icon medium>{{this.icon}}</v-icon> <br>{{this.progressTitle}}</v-progress-circular>


        <!--<v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>-->

        <v-card-actions class="text-md-center">
            <v-chip-group class="text-md-center"
                    v-model="selection"
                    active-class="teal"
                    mandatory
                    center-active
            >
                <v-chip  v-for="size in sizes" :key="size" :value="size">
                    {{ size }}
                </v-chip>
            </v-chip-group>
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
            title: "Steps of the day",
            subtitle: "100 pasos para el objetivo",
            icon: "mdi-walk",
            progressTitle: "Steps",
            selection: '08',
            sizes: [
                'M', 'T', 'W', 'Th', 'F', 'S', 'Su',
            ],


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

<style scoped>
    v-chip-group{
        align-content: center;
    }

    .headline{
        text-align: left;
    }

    .subheadline{
        text-align: left;
    }

</style>