<template>
    <div class="nu-nav">
        <router-link 
            class="nu-nav__title"
            to="/"
        >
            Freemaps
        </router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-nav {
    &__title {
        display: block;
        font-weight: 100;
        letter-spacing: -.025em;
        text-decoration: none;
        color: $textBlack;
        padding: 10px 20px 9px;
    }
}
</style>
