import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import keys from '@/keys';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['maps']
    })],
    state: {
        googleMaps: null,
        googleMapsGeocoder: null,
        maps: [{
            id: 'foeafadf',
            title: 'Map 1',
            center: {
                name: 'Fleet',
                lat: 45,
                lng: 23
            },
            zoom: 5,
            markers: [{
                id: 'sgsfgasf',
                name: 'Farnborough',
                lat: 45,
                lng: 23
            }]
        }]
    },
    mutations: {
        setGoogleMaps(state, googleMaps) {
            state.googleMaps = googleMaps;
        },
        setGoogleMapsGeocoder(state, googleMapsGeocoder) {
            state.googleMapsGeocoder = googleMapsGeocoder;
        },
        addNewMap(state, id) {
            state.maps.push({
                id,
                title: '',
                center: { name: 'Uluru', lat: -25.363, lng: 131.044 },
                zoom: 1,
                markers: []
            });
        },
        deleteMap(state, id) {
            state.maps = state.maps.filter(_ => _.id !== id);
        },
        updateMapTitle(state, { id, title }) {
            state.maps.find(_ => _.id === id).title = title;
        }
    },
    actions: {
        setGoogleMaps(context, googleMaps) {
            context.commit('setGoogleMaps', googleMaps);
            context.commit('setGoogleMapsGeocoder', new googleMaps.Geocoder());
        },
        createNewMap(context) {
            let loops = 0;
            let uidFound = false;
            let newId;
            while (!uidFound) {
                loops++;
                if (loops > 20) {
                    throw new Error('Something has gone terribly wrong generating a UID for this map!');
                }
                newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                if (!context.state.maps.find(_ => _.id === newId)) {
                    uidFound = true;
                }
            }
            context.commit('addNewMap', newId);
            return newId;
        },
        deleteMap(context, id) {
            context.commit('deleteMap', id);
        },
        updateMapTitle(context, params) {
            context.commit('updateMapTitle', params);
        }
    },
    getters: {
        googleMaps(state) {
            return state.googleMaps
        },
        maps(state) {
            return state.maps;
        }
    }
});
