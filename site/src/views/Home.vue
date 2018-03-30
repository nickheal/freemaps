<template>
    <main class="home">
        <row>
            <column
                v-for="(map, index) in maps"
                :key="index"
                :width="3"
            >
                <map-preview
                    :id="map.id"
                    :title="map.title"
                />
            </column>
        </row>
    </main>
</template>

<script>
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import MapPreview from '@/components/MapPreview';

export default {
    name: 'home',
    components: {
        Row,
        Column,
        MapPreview
    },
    data() {
        return {
            maps: [{
                id: 'fgsgsf',
                title: 'Map 1'
            }, {
                id: 'sdg',
                title: 'Map 2'
            }, {
                id: 'gfva',
                title: 'Map 3'
            }, {
                id: 'vrdv',
                title: 'Map 4'
            }, {
                id: 'bradf',
                title: 'Map 5'
            }]
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.home {
    background: $pageBackground;
}
</style>
