<template>
    <div class="nu-footer">
        <p class="nu-footer__text">Website developed by Nick Heal using the Google Maps API. Source code at <a href="https://github.com/nickheal/freemaps">github.com/nickheal/freemaps</a></p>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.nu-footer {
    display: block;
    width: 100%;

    &__text {
        display: block;
        padding: 12px;
        margin: 0 auto;
        font-size: .7em;
        font-weight: 100;
        letter-spacing: -.025em;
        text-align: center;
    }
}
</style>
