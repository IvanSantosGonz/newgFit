<template>
    <v-card
            max-width="344"
            class="mx-auto"
    >
        <v-list-item>
            <v-list-item-avatar color="teal">
                <v-icon medium color="black">{{this.icon}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="headline">{{this.title}}</v-list-item-title>
                <v-list-item-subtitle class="subheadline">{{this.subtitle}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <v-progress-circular class="progress-circular"
                             :value="reachedGoal"
                             color="teal"
                             rotate="270"
                             :size="size"
                             :width="width"
        ><span class="progress-circular-title">8000 </span><br><span class="progress-circular-subtitle">{{this.progressTitle}}</span>
        </v-progress-circular>


        <!--<v-card-text>
            Visit ten places on our planet that are undergoing the biggest changes today.
        </v-card-text>-->
        <v-divider class="my-2"></v-divider>
        <v-layout class="chip-group-layout" align-center justify-center>

            <v-text-field
                    v-model="goal"
                    label="Step Goal"
                    outlined
                    color="teal"
                    prepend-inner-icon="mdi-walk"
                    hide-details
                    type="number"
                    @blur="saveGoal('stepGoal', goal)"

            ></v-text-field>
        </v-layout>
        <v-divider class="my-2"></v-divider>

        <v-card-actions>

            <v-layout class="chip-group-layout" align-center justify-center>
                <v-chip-group
                        v-model="selection"
                        active-class="teal"
                        mandatory
                        center-active
                >

                    <v-chip v-for="(value, key) in stepsLast7Days" :key="key" :value="key">
                        {{ key }}
                    </v-chip>
                </v-chip-group>

            </v-layout>
        </v-card-actions>
    </v-card>
</template>

<script>

    import {db} from "../main.js"
    import firebase from 'firebase'


    export default {
        name: 'fitDataCard',
        components: {},
        props: {
            stepsLast7Days: {},
        },
        data: () => ({
            value: 8000,
            size: 150,
            width: 15,
            title: "Steps of the day",
            subtitle: "100 pasos para el objetivo",
            icon: "mdi-walk",
            progressTitle: "Steps",
            selection: 'Su',
            goal: 10000,
            sizes: [
                'M', 'T', 'W', 'Th', 'F', 'S', 'Su',
            ],


        }),
        computed: {
            reachedGoal: function () {
                return this.value * 100 / this.goal
            },
            /*getLast7Days: function () {
                var days = this.stepsLast7Days
                //onsole.log("dyas " ,days.keys())
                return days
            },*/
        },
        methods: {
            saveGoal(goalName, goalValue) {
                const createdAt = new Date()
                var userRef = db.collection('users').doc(firebase.auth().currentUser.uid);

                var goalData = {}
                goalData[goalName] = goalValue

                userRef.update(goalData);

            },
            getGoal(goalName) {
                var userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
                var vm = this;
                userRef.onSnapshot(function (doc) {
                    var data = doc.data();
                    vm.goal = data[goalName]
                    console.log(vm.goal)
                });
            }
        },

        mounted: function () {
            // `this` points to the vm instance
            this.getGoal("stepGoal")
        }
    }

</script>

<style scoped>
    .chip-group-layout {
        padding: 5%;
    }

    .headline {
        text-align: left;
    }

    .subheadline {
        text-align: left;
    }

    .progress-circular-title {
        font-size: x-large;
        color: black;
        font-weight: 600;
    }

    .progress-circular-subtitle {
        font-size: larger;
        color: darkslategray;
    }

</style>