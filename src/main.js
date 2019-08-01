import Vue from 'vue'
import Router from './router'
import App from './App.vue'
import Vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from '../.firebaseConfig.json'

var fireConfig = {
    apiKey: firebaseConfig.APIKEY,
    authDomain: firebaseConfig.AUTHDOMAIN,
    databaseURL: firebaseConfig.DATABASEURL,
    projectId: firebaseConfig.PROJECTID,
    storageBucket: firebaseConfig.STORAGEBUCKET,
    messagingSenderId: firebaseConfig.MESSAGINGSENDERID,
    appId: firebaseConfig.APPID
};

firebase.initializeApp(fireConfig);


new Vue({
    el: '#app',
    router: Router,
    Vuetify,
    VueFire,
    firebase,
    render: h => h(App)
});
