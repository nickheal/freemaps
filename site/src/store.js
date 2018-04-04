import Vue from 'vue';
import Vuex from 'vuex';

import keys from '@/keys';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        googleMaps: null
    },
    mutations: {
        setGoogleMaps(state, googleMaps) {
            state.googleMaps = googleMaps;
        }
    },
    actions: {
        setGoogleMaps(context, googleMaps) {
            context.commit('setGoogleMaps', googleMaps);
        }
    },
    getters: {
        googleMaps(state) {
            return state.googleMaps
        }
    }
});
