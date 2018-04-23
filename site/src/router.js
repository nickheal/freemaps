import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Maps from './views/Maps.vue';
import SpecificMap from './views/SpecificMap.vue';
import Themes from './views/Themes.vue';
import SpecificTheme from './views/SpecificTheme.vue';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'is-active',
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
    }, {
        path: '/themes',
        name: 'themes',
        component: Themes,
    }, {
        path: '/themes/edit/:themeId',
        name: 'theme',
        component: SpecificTheme,
    }],
});
