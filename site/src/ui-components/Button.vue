<template>
    <button
        class="nu-button"
        :class="buttonClass"
        :style="{
            boxShadow: `${-overlayOffsetFromCenter.x / 20}px ${-overlayOffsetFromCenter.y / 20}px ${overlayOpacity * 10}px 0px rgba(0, 0, 0, ${overlayOpacity})`,
            transform: `scale(${Math.max(1, 1 + overlayOpacity / 10)})`
        }"
        ref="button"
        @click="click"
    >
        <font-awesome-icon
            v-if="icon"
            :icon="icon"
        />
        <span
            class="nu-button__cursor-highlight"
            :style="{ 
                top: `${overlayPosition.y}px`,
                left: `${overlayPosition.x}px`,
                width: `${overlaySize}%`,
                paddingBottom: `${overlaySize}%`,
                opacity: overlayOpacity
            }"
        />
        {{ text }}
    </button>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { edit, trash } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        type: {
            validator: value => ['primary', 'secondary'].includes(value),
            default: "primary"
        },
        text: {
            type: String,
            default: ""
        },
        icon: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            overlayPosition: { x: 0, y: 0 },
            overlaySize: 0,
            overlayOpacity: 0,
            overlayOffsetFromCenter: { x: 0, y: 0 }
        }
    },
    mounted() {
        this.bindMouseEvents();
    },
    computed: {
        buttonClass() {
            return `nu-button--${this.type}`;
        }
    },
    methods: {
        bindMouseEvents() {
            const button = this.$refs.button;
            const maxOpacity = .5;

            const mouseMoveEvent = e => {
                const boundingRect = button.getBoundingClientRect();
                const xRelativeToButton = e.clientX - boundingRect.left;
                const yRelativeToButton = e.clientY - boundingRect.top;

                const xOffsetFromCenter = xRelativeToButton - (button.offsetWidth / 2);
                const yOffsetFromCenter = yRelativeToButton - (button.offsetHeight / 2);

                const xDistanceFromCenter = Math.abs(xOffsetFromCenter);
                const yDistanceFromCenter = Math.abs(yOffsetFromCenter);
                
                const xDistanceFromCenterAsPercentage = xDistanceFromCenter / button.offsetWidth;
                const yDistanceFromCenterAsPercentage = yDistanceFromCenter / button.offsetHeight;

                this.overlayPosition.x = xRelativeToButton;
                this.overlayPosition.y = yRelativeToButton;

                this.overlayOffsetFromCenter.x = xOffsetFromCenter;
                this.overlayOffsetFromCenter.y = yOffsetFromCenter;

                this.overlaySize = 50 - ((xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage) * 50);
                
                const ratio = .95;
                this.overlayOpacity = Math.pow(maxOpacity - (xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage), ratio);
            }

            const mouseDownEvent = () => {
                this.overlaySize += .1;
                this.overlayOpacity -= .1;
            }

            const mouseUpEvent = () => {
                this.overlaySize -= .1;
                this.overlayOpacity += .1;
            }

            document.addEventListener('mousemove', mouseMoveEvent);
            button.addEventListener('mousedown', mouseDownEvent);
            button.addEventListener('mouseup', mouseUpEvent);
        },
        click(e) {
            this.$emit('click', e);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-button {
    position: relative;
    font-size: 1rem;
    padding: .5em 1.5em;
    border: solid 1px transparent;
    border-radius: .5em;
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba($black, 0);

    &:focus {
        outline: none;
    }

    &--primary {
        background-color: $interaction;
        color: $white;
    }

    &--secondary {
        background-color: $white;
        border: solid 1px $interaction;
        color: $interaction;

        .nu-button__cursor-highlight {
            background: radial-gradient(ellipse at center, rgba($interaction, 1) 0%,rgba($interaction, 0) 100%);
        }
    }
}

.nu-button__cursor-highlight {
    position: absolute;
    width: 30%;
    height: 0;
    padding-bottom: 30%;
    border-radius: 999em;
    background: radial-gradient(ellipse at center, rgba($white, 1) 0%,rgba($white, 0) 100%);
    transform: translate(-50%, -50%);
    opacity: .5;
}
</style>
