import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../views/Home'
import About from '../views/About'
import NotFoundPage from '../views/NotFoundPage'

const routes = [
    {path: '/home', component: Home},
    {path: '/about', component: About},
    {path: '/*', component: NotFoundPage}
];



export default new VueRouter({routes});
