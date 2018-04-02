<template>
    <fieldset class="nu-location-card">
        <Input
            name="location"
            icon="map-marker"
            @input="updateLat"
        />

        {{ lat }} - {{ long }}
    </fieldset>
</template>

<script>
import Input from '@/ui-components/Input';

export default {
    components: {
        Input
    },
    props: {
        pointId: {
            type: String,
            required: true
        },
        lat: {
            type: Number,
            default: 0
        },
        long: {
            type: Number,
            default: 0
        }
    },
    methods: {
        updateLat(e) {
            this.$emit('update', {
                pointId: this.pointId,
                lat: parseFloat(e.value)
            });
        },
        updateLong(e) {
            this.$emit('update', {
                pointId: this.pointId,
                long: parseFloat(e.value)
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.nu-location-card {
    padding: 10px;
    border: 0;
}
</style>
