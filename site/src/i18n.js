import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    en: {
        freemaps: 'Freemaps',
        about: 'About',
        gettingStarted: 'Getting started',
        maps: 'Maps',
        themes: 'Themes',
        contact: 'Contact',
        edit: 'Edit',
        delete: 'Delete',
        mapSettings: 'Map settings',
        markers: 'Markers',
        centerPoint: 'Center point',
        zoom: 'Zoom',
        title: 'Title',
        editMap: 'Edit map'
    }
}

export default new VueI18n({
    locale: 'en',
    messages
});