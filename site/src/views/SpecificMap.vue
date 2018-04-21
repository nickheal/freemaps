<template>
    <main class="nu-map-page">
        <container>
            <router-link
                to="/maps"
            >
                <font-awesome-icon
                    class="back-icon"
                    icon="arrow-left"
                    color="#fd9500"
                    size="2x"
                />
            </router-link>
            <h1 class="nu-map-page__title">{{ $t('editMap') }}</h1>

            <label>{{ $t('title') }}</label>
            <Input
                :value="mapData.title"
                @input="updateTitle"
            />
        </container>
        
        <Map
            heightAspect="30%"
            :center="mapData.center"
            :zoom="mapData.zoom"
            :markers="mapData.markers"
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
                    :value="mapData.zoom"
                    @input="updateZoom"
                />

                <label>{{ $t('centerPoint') }}</label>
                <google-geocode-input
                    :value="mapData.center.name"
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
                        v-for="(location, index) in mapData.markers"
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
                                @click="addMarker"
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
    </main>
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
import { plusSquare, arrowLeft } from '@fortawesome/fontawesome-free-solid';

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
    created() {
        if (!this.$store.state.maps.find(map => map.id === this.$route.params.mapId)) {
            this.$store.dispatch('createNewMap').then(newMapId => {
                this.$router.replace({ params: { mapId: newMapId } });
            });
        }
    },
    data() {
        const preExistingMap = this.$store.state.maps.find(map => map.id === this.$route.params.mapId);
        const defaultMap = {
            id: '',
            title: '',
            center: { name: 'Uluru', lat: -25.363, lng: 131.044 },
            zoom: 1,
            markers: []
        }
        
        return {
            mapData: preExistingMap ? { ...preExistingMap } : defaultMap
        }
    },
    watch: {
        $route(to, from) {
            this.mapData = this.$store.state.maps.find(map => map.id === this.$route.params.mapId);
        }
    },
    methods: {
        updateTitle({ e, value }) {
            this.mapData.title = value;
            this.$store.dispatch('updateMapTitle', {
                id: this.mapData.id,
                title: value
            });
        },
        updateZoom({ e, value }) {
            this.mapData.zoom = parseFloat(value);
            this.$store.dispatch('updateMapZoom', {
                id: this.mapData.id,
                zoom: parseFloat(value)
            });
        },
        updateMapCenter(nameLatLng) {
            this.mapData.center = nameLatLng;
            this.$store.dispatch('updateMapCenter', {
                id: this.mapData.id,
                center: nameLatLng
            });
        },
        updateMarkerLocationData(id, { name, lat, lng }) {
            const point = this.mapData.markers.find(_ => _.id === id);
            if (point) {
                this.mapData.markers = this.mapData.markers.map(point => {
                    if (point.id === id) {
                        return { id, name, lat, lng };
                    } else {
                        return point;
                    }
                });
            } else {
                this.mapData.markers.push({ pointId, name, lat, lng });
            }
            this.$store.dispatch('updateMapMarkers', {
                id: this.mapData.id,
                markers: this.mapData.markers
            });
        },
        addMarker() {
            let newMarkerIdFound = false;
            let id;
            while (!newMarkerIdFound) {
                id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                if (!this.mapData.markers.find(marker => marker.id === id)) {
                    newMarkerIdFound = true;
                }
            }
            this.mapData.markers.push({ id });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-map-page {
    &__title {
        display: inline-block;
        padding: 16px 0;
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
        display: block;
        margin-bottom: 8px;
        font-weight: 100;
        letter-spacing: -.025em;
    }
}

.nu-add-marker {
    &__container {
        position: relative;
        margin: 10px;
        width: 100%;
        height: 100%;
        min-height: 102px;
    }

    &__item {
        position: relative;
        border: dashed 4px $pageBackground;
        border-radius: 1em;
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        cursor: pointer;
        box-shadow: 1px 1px 5px 0px rgba($black, .025);
        transition: transform 300ms, box-shadow 300ms;

        &:hover,
        &:focus {
            transform: scale(1.01);
            box-shadow: 1px 1px 10px 0px rgba($black, .1);
        }

        &:active {
            transform: scale(1);
            box-shadow: 1px 1px 5px 0px rgba($black, .025);
        }
    }

    &__icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>
