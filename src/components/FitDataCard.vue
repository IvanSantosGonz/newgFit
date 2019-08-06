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

        <v-progress-circular class="progress-circular"
                :value="value"
                color="teal"
                rotate="270"
                :size="size"
                :width="width"
        > <span class="progress-circular-title">12.548 </span><br><span class="progress-circular-subtitle">{{this.progressTitle}}</span></v-progress-circular>


        <!--<v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>-->

        <v-card-actions>

            <v-layout class="chip-group-layout"align-center justify-center>
            <v-chip-group
                    v-model="selection"
                    active-class="teal"
                    mandatory
                    center-active
            >

                <v-chip  v-for="size in sizes" :key="size" :value="size">
                    {{ size }}
                </v-chip>
            </v-chip-group>

            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>

    export default {
        name: 'barDataCard',
        components: {
        },
        data: () => ({
            value: 0,
            size: 150,
            width: 15,
            title: "Steps of the day",
            subtitle: "100 pasos para el objetivo",
            icon: "mdi-walk",
            progressTitle: "Steps",
            selection: 'Su',
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
    .chip-group-layout{
        padding: 5%;
    }
    .headline{
        text-align: left;
    }

    .subheadline{
        text-align: left;
    }

    .progress-circular-title{
        font-size: x-large;
        color: black;
        font-weight: 600;
    }

    .progress-circular-subtitle{
        font-size: larger;
        color: darkslategray;
    }

</style>