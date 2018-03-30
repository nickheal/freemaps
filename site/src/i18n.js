import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
    en: {
        edit: 'Edit',
        delete: 'Delete'
    }
}

export default new VueI18n({
    locale: 'en',
    messages,
});