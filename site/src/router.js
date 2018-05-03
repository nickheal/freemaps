import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import GettingStarted from './views/GettingStarted.vue';
import Maps from './views/Maps.vue';
import SpecificMap from './views/SpecificMap.vue';
import Themes from './views/Themes.vue';
import SpecificTheme from './views/SpecificTheme.vue';
import Contact from './views/Contact.vue';

Vue.use(Router);

export default new Router({
    linkActiveClass: 'is-active',
    routes: [{
        path: '/',
        name: 'home',
        component: Home,
    }, {
        path: '/about',
        name: 'about',
        component: About
    }, {
        path: '/getting-started',
        name: 'getting-started',
        component: GettingStarted
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
    }, {
        path: '/contact',
        name: 'contact',
        component: Contact,
        props: route => ({
            msg: route.query.msg
        })
    }],
});
