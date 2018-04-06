<template>
    <fieldset class="nu-location-card">
        <font-awesome-icon
            icon="map-marker"
            size="2x"
            color="white"
            class="nu-location-card__icon"
        />

        <Input
            name="location"
            @input="updateLatLng"
        />
    </fieldset>
</template>

<script>
import Input from '@/ui-components/Input';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faMapMarker } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        Input,
        FontAwesomeIcon
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    methods: {
        updateLatLng({ e, value }) {
            this.$store.state.googleMapsGeocoder.geocode({
                address: value
            }, (results, status) => {
                if (status === 'OK') {
                    this.$emit('update', {
                        id: this.id,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else {
                    throw new Error(`Geocode was not successful for the following reason: ${status}`);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-location-card {
    margin: 10px;
    padding: 10px;
    background: $pageBackground;
    border: 0;
    border-radius: 1em;

    &__icon {
        display: block;
        margin: 0 auto 10px;
    }
}
</style>
