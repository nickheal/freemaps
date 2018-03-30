<template>
    <button
        :class="type"
        :style="{
            boxShadow: `0px 1px ${overlayOpacity * 10}px 0px rgba(0, 0, 0, ${overlayOpacity})`,
            transform: `scale(${Math.max(1, 1 + overlayOpacity / 10)})`
        }"
        ref="button"
    >
        <span
            class="cursor-highlight"
            :style="{ 
                top: `${overlayPosition.y}px`,
                left: `${overlayPosition.x}px`,
                width: `${this.overlaySize}%`,
                paddingBottom: `${this.overlaySize}%`,
                opacity: overlayOpacity
            }"
        />
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        type: {
            validator: value => ['primary', 'secondary'].includes(value),
            default: "primary"
        },
        text: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            overlayPosition: { x: 0, y: 0 },
            overlaySize: 0,
            overlayOpacity: 0
        }
    },
    mounted() {
        this.bindMouseEvents();
    },
    methods: {
        bindMouseEvents() {
            const self = this;
            const button = this.$refs.button;
            const maxOpacity = .5;

            function mouseMoveEvent(e) {
                const xRelativeToButton = e.pageX - button.offsetLeft;
                const yRelativeToButton = e.pageY - button.offsetTop;
                const xDistanceFromCenter = Math.abs(xRelativeToButton - (button.offsetWidth / 2));
                const yDistanceFromCenter = Math.abs(yRelativeToButton - (button.offsetHeight / 2));
                const xDistanceFromCenterAsPercentage = xDistanceFromCenter / button.offsetWidth;
                const yDistanceFromCenterAsPercentage = yDistanceFromCenter / button.offsetHeight;

                self.overlayPosition.x = xRelativeToButton;
                self.overlayPosition.y = yRelativeToButton;

                self.overlaySize = 50 - ((xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage) * 50);
                
                const ratio = .95;
                self.overlayOpacity = Math.pow(maxOpacity - (xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage), ratio);
            }

            document.addEventListener('mousemove', mouseMoveEvent);
        }
    }
}
</script>

<style lang="scss" scoped>
$primary: #fd9500;
$white: #fff;

button {
    position: relative;
    font-size: 1rem;
    padding: .5em 1.5em;
    border: solid 1px transparent;
    border-radius: .5em;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0);

    &:focus {
        outline: none;
    }

    &.primary {
        background-color: $primary;
        color: $white;
    }

    &.secondary {
        background-color: transparent;
        border: solid 1px $primary;
        color: $primary;
    }
}

.cursor-highlight {
    position: absolute;
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    border-radius: 999em;
    background: radial-gradient(ellipse at center, rgba($white, 1) 0%,rgba($white, 0) 100%);
    transform: translate(-50%, -50%);
    opacity: .5;
}

.secondary {
    .cursor-highlight {
        background: radial-gradient(ellipse at center, rgba($primary, 1) 0%,rgba($primary, 0) 100%);
    }
}
</style>
