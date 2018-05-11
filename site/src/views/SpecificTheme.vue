<template>
    <main class="nu-theme-page">
        <Map
            class="nu-theme-page__map"
            heightAspect="100vh"
            :center="{ lat: -25.363, lng: 131.044, name: 'Uluru' }"
            :zoom="9"
            :markers="[]"
        />

        <container>
            <router-link
                to="/themes"
            >
                <font-awesome-icon
                    class="back-icon"
                    icon="arrow-left"
                    color="#fd9500"
                    size="2x"
                />
            </router-link>
            <h1 class="nu-theme-page__title">{{ $t('pages.specificTheme.title') }}</h1>

            <Input
                :label="$t('title')"
                :value="themeData.title"
                @input="updateTitle"
            />
        </container>

        <container class="nu-theme-page__form-container">
            <form
                class="nu-theme-page__form"
                @submit.prevent
            >
                <legend class="nu-theme-page__legend">{{ $t('pages.specificTheme.themeSettings') }}</legend>

                <!-- <Input
                    :label="$t('zoom')"
                    type="number"
                    :min="0"
                    :value="mapData.zoom"
                    @input="updateZoom"
                /> -->
            </form>
        </container>
    </main>
</template>

<script>
import Container from '@/ui-components/Container';
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import Map from '@/ui-components/Map';
import Input from '@/ui-components/Input';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { arrowLeft } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        Container,
        Row,
        Column,
        Map,
        Input,
        FontAwesomeIcon
    },
    created() {
        if (!this.$store.state.themes.find(theme => theme.id === this.$route.params.themeId)) {
            this.$store.dispatch('createNewTheme').then(newThemeId => {
                this.$router.replace({ params: { themeId: newThemeId } });
            });
        }
    },
    data() {
        const preExistingMap = this.$store.state.themes.find(theme => theme.id === this.$route.params.themeId);
        const defaultTheme = {
            id: '',
            title: ''
        }
        
        return {
            themeData: preExistingMap ? { ...preExistingMap } : defaultTheme
        }
    },
    watch: {
        $route(to, from) {
            this.themeData = this.$store.state.themes.find(theme => theme.id === this.$route.params.themeId);
        }
    },
    methods: {
        updateTitle(value) {
            // this.mapData.title = value;
            // this.$store.dispatch('updateMapTitle', {
            //     id: this.mapData.id,
            //     title: value
            // });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-theme-page {
    margin-left: calc(35% + 12px);

    &__title {
        display: inline-block;
        padding: 16px 0;
        color: $textBlack;
    }

    &__map {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 35%;
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
}
</style>
