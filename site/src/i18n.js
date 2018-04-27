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
        editMap: 'Edit map',

        pages: {
            home: {
                title: 'Welcome!',
                content: 'This is freemaps, a site designed to help with adding stylised Google maps to a website.'
            },
            about: {
                title: 'About',
                content: 'This page was borne out of a desire to easily customise themes for google maps to add to websites.'
            },
            contact: {
                title: 'Contact',
                name: 'Name',
                email: 'E-mail',
                message: 'Message',
                send: 'Send'
            }
        }
    }
}

export default new VueI18n({
    locale: 'en',
    messages
});