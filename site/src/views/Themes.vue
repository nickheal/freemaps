<template>
    <main class="nu-themes">
        <row>
            <column>
                <page-title class="nu-themes__title">{{ $t('pages.themes.title') }}</page-title>
            </column>
        </row>
        <row>
            <column
                v-for="(theme, index) in themes"
                :key="index"
                :width="3"
            >
                <map-preview
                    :id="theme.id"
                    :title="theme.title"
                    :center="{ lat: -25.363, lng: 131.044, name: 'Uluru' }"
                    :zoom="9"
                    :markers="[]"
                    :edit="`/themes/edit/${theme.id}`"
                    @delete="$store.dispatch('deleteTheme', theme.id);"
                />
            </column>
            <column
                :width="3"
            >
                <div class="nu-add-theme__container">
                    <router-link
                        class="nu-add-theme__item"
                        to="/themes/edit/new"
                    >
                        <font-awesome-icon
                            class="nu-add-theme__icon"
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
import PageTitle from '@/ui-components/PageTitle';
import MapPreview from '@/components/MapPreview';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
    name: 'themes',
    components: {
        Row,
        Column,
        PageTitle,
        MapPreview,
        FontAwesomeIcon
    },
    computed: {
        ...mapGetters([
            'themes'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-themes {
    background: $pageBackground;

    &__title {
        margin-left: 10px;
    }
}
</style>
