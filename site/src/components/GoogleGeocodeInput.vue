<template>
    <Input
        name="location"
        class="input"
        :label="label"
        :invalid="noResults"
        :value="value"
        @input="updateLatLng"
    />
</template>

<script>
import Input from '@/ui-components/Input';

export default {
    components: {
        Input
    },
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: Number|String,
            default: ''
        }
    },
    data() {
        return {
            noResults: false
        }
    },
    methods: {
        updateLatLng({ e, value }) {
            this.$store.state.googleMapsGeocoder.geocode({
                address: value
            }, (results, status) => {
                if (status === 'OK') {
                    this.noResults = false;

                    this.$emit('update', {
                        name: value,
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                } else if (status === 'OVER_QUERY_LIMIT') {
                    console.warn(`Google maps is over its usage limit for geocode queries on the current API key.`);
                } else if (status === 'ZERO_RESULTS') {
                    this.noResults = true;
                } else {
                    throw new Error(`Geocode was not successful for the following reason: ${status}.`);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.input {
    margin-bottom: 0;
}
</style>
