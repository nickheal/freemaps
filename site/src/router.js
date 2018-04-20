import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Maps from './views/Maps.vue';
import SpecificMap from './views/SpecificMap.vue';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/maps',
        name: 'maps',
        component: Maps,
    }, {
        path: '/maps/edit/:mapId',
        name: 'map',
        component: SpecificMap,
    }],
});
