import Vue from 'vue'
import router from './router'
import App from './App.vue'

const app = new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});
