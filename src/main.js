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

Vue.prototype.$eventBus = new Vue(); // Global event bus



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

export const db = firebase.firestore()


router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if (requiresAuth && !firebase.auth().currentUser) {
        next('/sign-in');
    } else if (requiresAuth && firebase.auth().currentUser) {
        next();
    } else {
        next();
    }
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App),
    vuetify,

}).$mount('#app')


