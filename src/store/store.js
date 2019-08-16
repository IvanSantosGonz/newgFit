import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        authToken: "",
        stepsLast7Days: {},
        averageHeartRateDataByHour: {}
    },
    mutations: {
        setAuthToken(state, token){
            state.authToken = token
        },
        setStepsLast7Days(state, steps){
            state.stepsLast7Days = steps
        },
        setAverageHeartRateDataByHour(state, heartRateData){
            state.averageHeartRateDataByHour = heartRateData
        },
    },
    getters: {
        authToken: state => state.authToken,
        stepsLast7Days: state => state.stepsLast7Days,
        averageHeartRateDataByHour: state => state.averageHeartRateDataByHour,
    }
})


