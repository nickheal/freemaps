<template>
    <fieldset 
        class="nu-location-card"
    >
        <font-awesome-icon
            icon="map-marker"
            size="2x"
            color="white"
            class="nu-location-card__icon"
        />
        <google-geocode-input
            :value="value"
            @update="updateLatLng"
        />
        <Button
            class="nu-location-card__delete"
            icon="trash"
            type="secondary"
            @click="deleteMarker"
        />
    </fieldset>
</template>

<script>
import Button from '@/ui-components/Button';
import GoogleGeocodeInput from '@/components/GoogleGeocodeInput';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faMapMarker } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        Button,
        GoogleGeocodeInput,
        FontAwesomeIcon
    },
    props: {
        value: String|Number,
        default: ''
    },
    data() {
        return {
            noResults: false
        }
    },
    methods: {
        updateLatLng(params) {
            this.$emit('update', params);
        },
        deleteMarker() {

        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-location-card {
    position: relative;
    margin: 10px;
    padding: 10px;
    background: $pageBackground;
    border: solid 2px $pageBackground;
    border-radius: .5em;

    &__icon {
        display: block;
        margin: 0 auto 10px;
    }

    &__delete.nu-button {
        position: absolute;
        top: 5px;
        right: 10px;
    }
}
</style>
