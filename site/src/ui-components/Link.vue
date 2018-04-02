<template>
    <router-link
        class="nu-link"
        :class="linkClass"
        :style="{
            boxShadow: `${-overlayOffsetFromCenter.x / 20}px ${-overlayOffsetFromCenter.y / 20}px ${overlayOpacity * 10}px 0px rgba(0, 0, 0, ${overlayOpacity})`,
            transform: `scale(${Math.max(1, 1 + overlayOpacity / 10)})`
        }"
        ref="link"
        :to="linkTarget"
    >
        <font-awesome-icon
            v-if="icon"
            :icon="icon"
        />
        <span
            class="nu-link__cursor-highlight"
            :style="{ 
                top: `${overlayPosition.y}px`,
                left: `${overlayPosition.x}px`,
                width: `${overlaySize}%`,
                paddingBottom: `${overlaySize}%`,
                opacity: overlayOpacity
            }"
        />
        {{ text }}
    </router-link>
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
        },
        linkTarget: {
            type: String,
            required: true
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
        linkClass() {
            return `nu-link--${this.type}`;
        }
    },
    methods: {
        bindMouseEvents() {
            const self = this;
            const link = this.$refs.link.$el;
            const maxOpacity = .5;

            function mouseMoveEvent(e) {
                const xRelativeToButton = e.pageX - link.offsetLeft;
                const yRelativeToButton = e.pageY - link.offsetTop;

                const xOffsetFromCenter = xRelativeToButton - (link.offsetWidth / 2);
                const yOffsetFromCenter = yRelativeToButton - (link.offsetHeight / 2);

                const xDistanceFromCenter = Math.abs(xOffsetFromCenter);
                const yDistanceFromCenter = Math.abs(yOffsetFromCenter);
                
                const xDistanceFromCenterAsPercentage = xDistanceFromCenter / link.offsetWidth;
                const yDistanceFromCenterAsPercentage = yDistanceFromCenter / link.offsetHeight;

                self.overlayPosition.x = xRelativeToButton;
                self.overlayPosition.y = yRelativeToButton;

                self.overlayOffsetFromCenter.x = xOffsetFromCenter;
                self.overlayOffsetFromCenter.y = yOffsetFromCenter;

                self.overlaySize = 50 - ((xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage) * 50);
                
                const ratio = .95;
                self.overlayOpacity = Math.pow(maxOpacity - (xDistanceFromCenterAsPercentage + yDistanceFromCenterAsPercentage), ratio);
            }

            function mouseDownEvent() {
                self.overlaySize += .1;
                self.overlayOpacity -= .1;
            }

            function mouseUpEvent() {
                self.overlaySize -= .1;
                self.overlayOpacity += .1;
            }

            document.addEventListener('mousemove', mouseMoveEvent);
            link.addEventListener('mousedown', mouseDownEvent);
            link.addEventListener('mouseup', mouseUpEvent);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-link {
    display: block;
    position: relative;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
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
        background-color: $primary;
        color: $white;
    }

    &--secondary {
        background-color: $white;
        border: solid 1px $primary;
        color: $primary;

        .nu-link__cursor-highlight {
            background: radial-gradient(ellipse at center, rgba($primary, 1) 0%,rgba($primary, 0) 100%);
        }
    }
}

.nu-link__cursor-highlight {
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
