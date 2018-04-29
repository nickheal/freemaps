<template>
    <div class="nu-loading-spinner">
        <div class="nu-loading-spinner__dot-container">
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--1"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--2"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--3"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--4"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--5"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--6"></div>
            <div class="nu-loading-spinner__dot nu-loading-spinner__dot--7"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-loading-spinner {
    $points: 7;
    $segSize: (2 * pi()) / $points;
    $animationDuration: 500ms;

    position: relative;
    width: 100%;
    height: 100%;

    &__dot-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60%;
        height: 60%;
    }

    &__dot {
        position: absolute;
        width: 40%;
        height: 0;
        padding-bottom: 40%;
        border-radius: 999em;
        background: $white;
        transform: translate(-50%, -50%);
        animation: fadeOutIn $animationDuration infinite;
        
        @for $i from 1 through $points {
            &--#{$i} {
                top: 50% * cos($segSize * $i) + 50%;
                left: 50% * sin($segSize * $i) + 50%;
                animation-delay: -($i * ($animationDuration / $points));
            }
        }
    }
}

@keyframes fadeOutIn {
    0% { opacity: 1; }
    20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    60% { opacity: 0; transform: translate(-50%, -50%) scale(.5); }
    100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
}
</style>
