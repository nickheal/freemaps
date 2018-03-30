<template>
    <div class="nu-input">
        <input
            :type="type"
            class="nu-input__input"
            v-model="val"
            @input="onInput"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            val: null
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
    display: block;
    width: 100%;

    &__input {
        width: 100%;
        font-size: 1em;
        display: block;
        margin: 0;
        border: solid 1px $subtleBorder;
        border-radius: .5em;
        padding: .5em .75em;
        box-shadow: inset -2px -2px 5px 0px rgba($black, 0.025);
    }
}
</style>
