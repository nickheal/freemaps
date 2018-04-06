import Vue from 'vue';
import Vuex from 'vuex';

import keys from '@/keys';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        googleMaps: null,
        googleMapsGeocoder: null
    },
    mutations: {
        setGoogleMaps(state, googleMaps) {
            state.googleMaps = googleMaps;
        },
        setGoogleMapsGeocoder(state, googleMapsGeocoder) {
            state.googleMapsGeocoder = googleMapsGeocoder;
        }
    },
    actions: {
        setGoogleMaps(context, googleMaps) {
            context.commit('setGoogleMaps', googleMaps);
            context.commit('setGoogleMapsGeocoder', new googleMaps.Geocoder());
        }
    },
    getters: {
        googleMaps(state) {
            return state.googleMaps
        }
    }
});
