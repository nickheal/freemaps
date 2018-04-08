<template>
    <div class="nu-map-page">
        <h1 class="nu-map-page__title">{{ title }}</h1>
        
        <Map
            heightAspect="30%"
            :center="center"
            :zoom="zoom"
            :markers="markers"
        />

        <container class="nu-map-page__form-container">
            <form
                class="nu-map-page__form"
                @submit.prevent
            >
                <legend class="nu-map-page__legend">{{ $t('mapSettings') }}</legend>

                <label>{{ $t('zoom') }}</label>
                <Input
                    type="number"
                    :min="0"
                    :value="zoom"
                    @input="updateZoom"
                />

                <label>{{ $t('centerPoint') }}</label>
                <google-geocode-input
                    :value="center.name"
                    @update="updateMapCenter"
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
                        v-for="(location, index) in markers"
                        :key="index"
                        :width="3"
                    >
                        <location-card
                            :id="location.id"
                            :value="location.name"
                            @update="updateMarkerLocationData(location.id, $event)"
                        />
                    </Column>

                    <Column
                        :width="3"
                    >
                        <div class="nu-add-marker__container">
                            <button
                                class="nu-add-marker__item"
                            >
                                <font-awesome-icon
                                    class="nu-add-marker__icon"
                                    icon="plus-square"
                                    color="#efefef"
                                    size="4x"
                                />
                            </button>
                        </div>
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
import GoogleGeocodeInput from '@/components/GoogleGeocodeInput';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { plusSquare } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        Container,
        Row,
        Column,
        Map,
        LocationCard,
        Input,
        GoogleGeocodeInput,
        FontAwesomeIcon
    },
    data() {
        return {
            id: '',
            title: '',
            center: {},
            zoom: 1,
            markers: [],
            ...this.$store.state.maps.find(map => map.id === this.$route.params.mapId)
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
        updateMapCenter(latLng) {
            this.center = latLng;
        },
        updateMarkerLocationData(id, { lat, lng }) {
            const point = this.markers.find(_ => _.id === id);
            if (point) {
                this.markers = this.markers.map(point => {
                    if (point.id === id) {
                        return { id, lat, lng };
                    } else {
                        return point;
                    }
                });
            } else {
                this.markers.push({ pointId, lat, lng });
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
        padding: 16px 20px;
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

.nu-add-marker {
    &__container {
        position: relative;
        margin: 10px;
        border: dashed 4px $pageBackground;
        border-radius: 1em;
        width: 100%;
        height: 100%;
    }

    &__item {

    }

    &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
