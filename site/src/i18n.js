import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    en: {
        edit: 'Edit',
        delete: 'Delete',
        mapSettings: 'Map settings',
        markers: 'Markers',
        centerPoint: 'Center point',
        zoom: 'Zoom',
        title: 'Title'
    }
}

export default new VueI18n({
    locale: 'en',
    messages
});