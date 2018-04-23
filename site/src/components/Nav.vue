<template>
    <div class="nu-nav">
        <router-link 
            class="nu-nav__title"
            to="/"
        >
            {{ $t('freemaps') }}
        </router-link>
        <router-link 
            class="nu-nav__link"
            to="/about"
        >
            {{ $t('about') }}
        </router-link>
        <router-link 
            class="nu-nav__link"
            to="/getting-started"
        >
            {{ $t('gettingStarted') }}
        </router-link>
        <router-link 
            class="nu-nav__link"
            to="/maps"
        >
            {{ $t('maps') }}
        </router-link>
        <router-link 
            class="nu-nav__link"
            to="/themes"
        >
            {{ $t('themes') }}
        </router-link>
        <router-link 
            class="nu-nav__link"
            to="/contact"
        >
            {{ $t('contact') }}
        </router-link>
        <div class="nu-nav__active-marker"></div>
    </div>
</template>

<script>
export default {
    watch: {
        $route(to) {
            console.log(to);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-nav {
    position: relative;
    display: flex;
    align-items: center;

    &__title {
        display: block;
        font-weight: 100;
        letter-spacing: -.025em;
        text-decoration: none;
        color: $textBlack;
        padding: 10px 20px 9px;
    }

    &__link {
        position: relative;
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

        &::after {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background-color: transparent;
            transform: scale(0);
            transform-origin: bottom center;
            transition: background-color 300ms, transform 300ms;
        }

        &.is-active {
            position: relative;
            color: $active;

            &::after {
                transform: scale(1);
                background-color: $active;
            }
        }
    }
}
</style>
