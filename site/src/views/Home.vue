<template>
    <div class="home">
        <ol>
            <li
                v-for="(map, index) in maps"
                :key="index"
            >
                <map-preview
                    :title="map.title"
                />
            </li>
        </ol>
    </div>
</template>

<script>
import MapPreview from '@/components/MapPreview.vue';

export default {
    name: 'home',
    components: {
        MapPreview
    },
    data() {
        return {
            maps: [{
                title: 'map1'
            }, {
                title: 'map2'
            }, {
                title: 'map3'
            }]
        }
    }
};
</script>

<style lang="scss" scoped>
.home {
    background: grey;
}
</style>
