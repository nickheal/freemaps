<template>
    <ol class="nu-nav">
        <li>
            <router-link 
                class="nu-nav__title"
                to="/"
            >
                {{ $t('freemaps') }}
            </router-link>
        </li>
        <li>
            <router-link 
                class="nu-nav__link"
                to="/about"
            >
                {{ $t('about') }}
            </router-link>
        </li>
        <li>
            <router-link 
                class="nu-nav__link"
                to="/getting-started"
            >
                {{ $t('gettingStarted') }}
            </router-link>
        </li>
        <li>
            <router-link 
                class="nu-nav__link"
                to="/maps"
            >
                {{ $t('maps') }}
            </router-link>
        </li>
        <li>
            <router-link 
                class="nu-nav__link"
                to="/themes"
            >
                {{ $t('themes') }}
            </router-link>
        </li>
        <li>
            <router-link 
                class="nu-nav__link"
                to="/contact"
            >
                {{ $t('contact') }}
            </router-link>
        </li>
    </ol>
</template>

<script>
export default {
    mounted() {
        console.log(this.$route)
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-nav {
    display: flex;
    align-items: center;
    list-style-type: none;

    &__title {
        display: block;
        font-weight: 100;
        letter-spacing: -.025em;
        text-decoration: none;
        color: $textBlack;
        padding: 10px 20px 9px;
    }

    &__link {
        display: block;
        text-decoration: none;
        text-transform: uppercase;
        color: $textBlack;
        font-size: .8em;
        font-weight: 100;
        padding: 10px 10px 9px;

        &:hover,
        &:focus {
            color: $active;
        }
    }
}
</style>
