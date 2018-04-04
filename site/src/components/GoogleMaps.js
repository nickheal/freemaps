import GoogleMapsLoader from 'google-maps';
import keys from '@/keys';
import store from '@/store';

GoogleMapsLoader.KEY = keys.googleMapsApiKey;

GoogleMapsLoader.load(google => {
    store.dispatch('setGoogleMaps', google.maps);
});