<template>
    <div class="nu-map-page">
        <h1 class="nu-map-page__title">{{ mapId }}</h1>
        <img class="nu-map-page__map-placeholder" src="https://placebear.com/1600/400">

        <form @submit.prevent>
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
import LocationCard from '@/components/LocationCard';

export default {
    components: {
        Row,
        Column,
        LocationCard
    },
    data() {
        return {
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
