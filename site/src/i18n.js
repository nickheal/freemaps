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
        markers: 'Markers',
        centerPoint: 'Center point',
        zoom: 'Zoom',
        title: 'Title',
        editMap: 'Edit map',

        pages: {
            home: {
                title: 'Welcome!',
                content: `A while ago a friend asked me if it was possible to add stylised google maps to a website. My answer was yes, but then I found it surprisingly difficult to explain exactly how you'd go about doing it and I couldn't find the right tool for the job. This is where freemaps comes from. The idea is that you can create as many maps and themes as you want, combine them, and then add them to your website, using a simple JS snippet or Vue.js component.`
            },
            about: {
                title: 'About',
                content: 'This site was borne out of a desire to easily customise themes for google maps to add to websites.'
            },
            maps: {
                title: 'Maps',
            },
            specificMap: {
                title: 'Edit map',
                mapSettings: 'Map settings',
                thisIsTheCode: 'This is the code you need to include in your site:'
            },
            themes: {
                title: 'Themes',
            },
            specificTheme: {
                title: 'Edit theme',
                themeSettings: 'Theme settings',
            },
            gettingStarted: {
                title: 'Getting started'
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