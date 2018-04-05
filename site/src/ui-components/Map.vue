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
            default: () => [{ lat: -25.363, lng: 131.044 }]
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
            googleMapsMarkers: null
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
                });
            }
        },
        zoom() {
            if (!this.zoom || this.zoom < 0) return;
            this.googleMapsMap.setZoom(this.zoom);
        }
    },
    mounted() {
        if (this.googleMaps && !this.mapCreated) {
            this.createMap();
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

            this.googleMapsMarkers = this.markers.map(marker => {
                return new this.googleMaps.Marker({
                    position: marker,
                    map: this.googleMapsMap
                });
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
