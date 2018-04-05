<template>
    <div class="nu-map-page">
        <h1 class="nu-map-page__title">{{ mapId }}</h1>
        
        <Map
            heightAspect="30%"
            :zoom="zoom"
        />

        <form @submit.prevent>
            <legend>{{ $t('mapSettings') }}</legend>

            <label>{{ $t('zoomLevel') }}</label>
            <Input
                type="number"
                :min="0"
                @input="updateZoom"
            />
        </form>

        <form @submit.prevent>
            <legend>{{ $t('markers') }}</legend>

            <Row>
                <Column
                    v-for="(location, index) in mapPoints"
                    :key="index"
                    :width="6"
                >
                    <location-card
                        :pointId="location.pointId"
                        :lat="location.lat"
                        :long="location.long"
                        @update="updateLocationData"
                    />
                </Column>
            </Row>
        </form>
    </div>
</template>

<script>
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import Map from '@/ui-components/Map';
import LocationCard from '@/components/LocationCard';
import Input from '@/ui-components/Input';

export default {
    components: {
        Row,
        Column,
        Map,
        LocationCard,
        Input
    },
    data() {
        return {
            zoom: 1,
            mapPoints: [{
                pointId: 'dgag',
                lat: 4,
                long: 7
            }, {
                pointId: 'dgad',
                lat: 3,
                long: 12
            }]
        }
    },
    computed: {
        mapId() {
            return this.$route.params.mapId;
        }
    },
    methods: {
        updateZoom({ e, value }) {
            this.zoom = parseFloat(value);
        },
        updateLocationData({pointId, lat, long }) {
            const point = this.mapPoints.find(_ => _.pointId === pointId);
            if (lat) point.lat = lat;
            if (long) point.long = long;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-map-page {
    &__title {
        display: block;
        padding: 20px;
        color: $textBlack;
    }

    &__map-placeholder {
        display: block;
        width: 100%;
        height: auto;
    }
}
</style>
