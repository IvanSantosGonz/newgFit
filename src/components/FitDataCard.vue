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
        ><span class="progress-circular-title">{{setData}} </span><br><span class="progress-circular-subtitle">{{this.progressTitle}}</span>
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

                    <v-chip v-for="day in days" :key="day" :value="day">
                        {{ day }}
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
            type: "",
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
            days: [],



        }),
        computed: {
            reachedGoal: function () {
                return this.value * 100 / this.goal
            },
            setData: function(){
                if (this.type == "steps") {
                    var keys = Object.keys(this.$store.getters.stepsLast7Days)
                    this.days = keys
                    this.value = this.$store.getters.stepsLast7Days[this.selection]
                    this.title = "Steps"
                    this.subtitle = ((this.goal >= this.value) ? (this.goal - this.value).toString() + " steps for your goal" : "Goal reached");
                    return this.value
                }
            }

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
                var self = this;
                userRef.onSnapshot(function (doc) {
                    var data = doc.data();
                    self.goal = data[goalName]
                    console.log(self.goal)
                });
            },

        },

        mounted: function () {
            // `this` points to the vm instance
            this.getGoal("stepGoal")
            this.setData

            var keys = Object.keys(this.$store.getters.stepsLast7Days)
            this.days = keys
            this.selection = this.days[this.days.length - 1]
            console.log(keys)
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