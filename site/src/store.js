import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import keys from '@/keys';

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
        paths: ['maps', 'themes']
    })],
    state: {
        voiceMode: false,
        googleMaps: null,
        googleMapsGeocoder: null,
        maps: [],
        themes: []
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
        addNewTheme(state, id) {
            state.themes.push({
                id,
                title: '',
                roads: '#ff0000'
            });
        },
        deleteMap(state, id) {
            state.maps = state.maps.filter(_ => _.id !== id);
        },
        deleteTheme(state, id) {
            state.themes = state.themes.filter(_ => _.id !== id);
        },
        updateMapTitle(state, { id, title }) {
            state.maps.find(_ => _.id === id).title = title;
        },
        updateMapZoom(state, { id, zoom }) {
            state.maps.find(_ => _.id === id).zoom = zoom;
        },
        updateMapCenter(state, { id, center }) {
            state.maps.find(_ => _.id === id).center = center;
        },
        updateMapMarkers(state, { id, markers }) {
            state.maps.find(_ => _.id === id).markers = markers;
        },
        changeVoiceMode(state, newMode) {
            state.voiceMode = newMode;
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
        createNewTheme(context) {
            let loops = 0;
            let uidFound = false;
            let newId;
            while (!uidFound) {
                loops++;
                if (loops > 20) {
                    throw new Error('Something has gone terribly wrong generating a UID for this theme!');
                }
                newId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                if (!context.state.maps.find(_ => _.id === newId)) {
                    uidFound = true;
                }
            }
            context.commit('addNewTheme', newId);
            return newId;
        },
        deleteMap(context, id) {
            context.commit('deleteMap', id);
        },
        deleteTheme(context, id) {
            context.commit('deleteTheme', id);
        },
        updateMapTitle(context, params) {
            context.commit('updateMapTitle', params);
        },
        updateMapZoom(context, params) {
            context.commit('updateMapZoom', params);
        },
        updateMapCenter(context, params) {
            context.commit('updateMapCenter', params);
        },
        updateMapMarkers(context, params) {
            context.commit('updateMapMarkers', params);
        },
        activateVoiceMode(context) {
            context.commit('changeVoiceMode', true);
        },
        deactivateVoiceMode(context) {
            context.commit('changeVoiceMode', false);
        }
    },
    getters: {
        googleMaps(state) {
            return state.googleMaps
        },
        maps(state) {
            return state.maps;
        },
        themes(state) {
            return state.themes;
        },
        voiceMode(state) {
            return state.voiceMode;
        }
    }
});
