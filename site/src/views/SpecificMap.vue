<template>
    <div class="nu-map-page">
        <h1 class="nu-map-page__title">{{ mapId }}</h1>
        
        <Map
            heightAspect="30%"
            :zoom="zoom"
            :markers="mapPoints"
        />

        <container class="nu-map-page__form-container">
            <form
                class="nu-map-page__form"
                @submit.prevent
            >
                <legend class="nu-map-page__legend">{{ $t('mapSettings') }}</legend>

                <label>{{ $t('zoomLevel') }}</label>
                <Input
                    type="number"
                    :min="0"
                    @input="updateZoom"
                />
            </form>
        </container>
        
        <container class="nu-map-page__form-container">
            <form
                class="nu-map-page__form"
                @submit.prevent
            >
                <legend class="nu-map-page__legend">{{ $t('markers') }}</legend>

                <Row>
                    <Column
                        v-for="(location, index) in mapPoints"
                        :key="index"
                        :width="3"
                    >
                        <location-card
                            :id="location.id"
                            @update="updateLocationData"
                        />
                    </Column>

                    <Column
                        :width="3"
                    >
                        <div>+</div>
                    </Column>
                </Row>
            </form>
        </container>
    </div>
</template>

<script>
import Container from '@/ui-components/Container';
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import Map from '@/ui-components/Map';
import LocationCard from '@/components/LocationCard';
import Input from '@/ui-components/Input';

export default {
    components: {
        Container,
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
                id: 'dgag',
                lat: 4,
                lng: 7
            }, {
                id: 'ooflof',
                lat: 3,
                lng: 12
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
        updateLocationData({id, lat, lng }) {
            const point = this.mapPoints.find(_ => _.id === id);

            if (point) {
                this.mapPoints = this.mapPoints.map(point => {
                    if (point.id === id) {
                        return { id, lat, lng };
                    } else {
                        return point;
                    }
                });
            } else {
                this.mapPoints.push({ pointId, lat, lng });
            }
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

    &__form-container {
        box-shadow: 0px 1px 5px 0px rgba($black, .025);
    }

    &__form {
        padding: 20px 0;
    }

    &__legend {
        font-size: 1.1em;
        letter-spacing: -0.025em;
        margin: 20px 0;
    }
    
    label {
        font-weight: 100;
        letter-spacing: -.025em;
    }
}
</style>
