<template>
    <main class="nu-maps">
        <row>
            <column
                v-for="(map, index) in maps"
                :key="index"
                :width="3"
            >
                <map-preview
                    :id="map.id"
                    :title="map.title"
                    :center="map.center"
                    :zoom="map.zoom"
                    :markers="map.markers"
                />
            </column>
            <column
                :width="3"
            >
                <div class="nu-add-map__container">
                    <router-link
                        class="nu-add-map__item"
                        to="/maps/edit/new"
                    >
                        <font-awesome-icon
                            class="nu-add-map__icon"
                            icon="plus-square"
                            color="white"
                            size="6x"
                        />
                    </router-link>
                </div>
            </column>
        </row>
    </main>
</template>

<script>
import { mapGetters } from 'vuex';
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import MapPreview from '@/components/MapPreview';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { plusSquare } from '@fortawesome/fontawesome-free-solid';

export default {
    name: 'home',
    components: {
        Row,
        Column,
        MapPreview,
        FontAwesomeIcon
    },
    computed: {
        ...mapGetters([
            'maps'
        ])
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-maps {
    background: $pageBackground;
}

.nu-add-map {
    &__container {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 300px;
        padding: 11px 10px;
    }

    &__item {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        border: dashed 4px $white;
        border-radius: .5em;
        box-shadow: 1px 1px 5px 0px rgba($black, .025);
        transition: transform 300ms, box-shadow 300ms;

        &:hover {
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
