<template>
    <div class="nu-input">
        <font-awesome-icon
            v-if="icon"
            :icon="icon"
            class="nu-input__icon"
        />
        <input
            :type="type"
            :min="type === 'number' ? min : null"
            :max="type === 'number' ? max : null"
            class="nu-input__input"
            :class="{ 'nu-input__input--invalid': invalid }"
            :style="{
                paddingLeft: icon ? '2em' : '1em'
            }"
            v-model="val"
            @input="onInput"
        />
    </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faMapMarker } from '@fortawesome/fontawesome-free-solid';

export default {
    components: {
        FontAwesomeIcon
    },
    props: {
        type: {
            type: String,
            default: null
        },
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        icon: {
            type: String,
            default: null
        },
        invalid: {
            type: Boolean,
            default: false
        },
        value: {
            type: String|Number,
            default: ''
        }
    },
    data() {
        return {
            val: this.value
        }
    },
    methods: {
        onInput(e) {
            this.$emit('input', {
                e: event,
                value: this.val
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-input {
    position: relative;
    display: block;
    width: 100%;
    margin-bottom: 21px;

    &__input {
        width: 100%;
        font-size: 1em;
        display: block;
        margin: 0;
        border: solid 1px $subtleBorder;
        border-radius: .5em;
        padding: .5em .75em;
        box-shadow: inset -2px -2px 5px 0px rgba($black, 0.025);

        &--invalid {
            border-color: red;
        }
    }

    &__icon {
        position: absolute;
        top: 50%;
        left: .75em;
        transform: translateY(-50%);
        color: $textBlack;
    }
}
</style>
