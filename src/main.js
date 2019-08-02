import Vue from 'vue'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from '../.firebaseConfig.json'

Vue.config.productionTip = false

export const fireConfig = {
    apiKey: firebaseConfig.APIKEY,
    authDomain: firebaseConfig.AUTHDOMAIN,
    databaseURL: firebaseConfig.DATABASEURL,
    projectId: firebaseConfig.PROJECTID,
    storageBucket: firebaseConfig.STORAGEBUCKET,
    messagingSenderId: firebaseConfig.MESSAGINGSENDERID,
    appId: firebaseConfig.APPID
};

firebase.initializeApp(fireConfig)



new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    vuetify,

}).$mount('#app')


