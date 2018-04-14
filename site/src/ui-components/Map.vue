<template>
    <div>
        <img
            v-if="!googleMaps"
            class="nu-map__placeholder" 
            src="@/assets/map-placeholder.jpg"
        />
        <div
            v-else
            class="nu-map__map-aspect-wrapper"
            :style="{
                paddingBottom: heightAspect
            }"
        >
            <div
                class="nu-map__map"
                ref="map"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        heightAspect: {
            type: String,
            default: '65.666%'
        },
        center: {
            type: Object,
            default: () => ({ lat: -25.363, lng: 131.044 })
        },
        markers: {
            type: Array,
            default: () => [] // [{ id: 'gagsfhwtgafvfshwtgafvfsgwsvavs', lat: -25.363, lng: 131.044 }]
        },
        zoom: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            mapCreated: false,
            googleMapsMap: null,
            googleMapsMarkers: []
        }
    },
    computed: {
        ...mapGetters([
            'googleMaps'
        ])
    },
    watch: {
        googleMaps() {
            if (this.googleMaps && !this.mapCreated) {
                this.$nextTick(() => {
                    this.createMap();
                    this.drawMarkers();
                });
            }
        },
        center() {
            if (this.googleMapsMap) {
                this.googleMapsMap.setCenter(this.center);
            }
        },
        zoom() {
            if (!this.googleMaps || !this.zoom || this.zoom < 0) return;
            this.googleMapsMap.setZoom(this.zoom);
        },
        markers() {
            if (!this.googleMaps) return;
            this.drawMarkers();
        }
    },
    mounted() {
        if (this.googleMaps && !this.mapCreated) {
            this.createMap();
            this.drawMarkers();
        }
    },
    methods: {
        createMap() {
            this.mapCreated = true;

            this.googleMapsMap = new this.googleMaps.Map(this.$refs.map, {
                zoom: this.zoom,
                center: this.center,
                draggable: false,
                disableDefaultUI: true
            });
        },
        drawMarkers() {
            this.googleMapsMarkers = this.markers.map(marker => {
                if (!marker.lat || !marker.lng) return;

                const alreadyExistingMarker = this.googleMapsMarkers && this.googleMapsMarkers.find(_ => _ && _.id === marker.id);

                if (alreadyExistingMarker) {
                    alreadyExistingMarker.marker.setPosition({ lat: marker.lat, lng: marker.lng });
                }

                return {
                    id: marker.id,
                    marker: alreadyExistingMarker ? alreadyExistingMarker.marker : new this.googleMaps.Marker({
                        position: { lat: marker.lat, lng: marker.lng },
                        map: this.googleMapsMap
                    })
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.nu-map {
    &__placeholder {
        display: block;
        width: 100%;
    }

    &__map-aspect-wrapper {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 65.666%;
    }

    &__map {
        position: absolute;
        width: 100%;
        height: 100%;
    }
}
</style>
