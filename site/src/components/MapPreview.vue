<template>
    <div class="nu-map-preview">
        <h2 class="nu-map-preview__title">{{ title }}</h2>

        <Map
            heightAspect="65.666%"
            :center="center"
            :markers="markers"
            :zoom="zoom"
        />

        <div class="nu-map-preview__buttons">
            <Link
                icon="edit"
                :linkTarget="editRoute"
            />
            <Button
                icon="trash"
                type="secondary"
                @click="deleteMap"
            />
        </div>
    </div>
</template>

<script>
import Link from '@/ui-components/Link';
import Button from '@/ui-components/Button';
import Map from '@/ui-components/Map';

export default {
    components: {
        Link,
        Button,
        Map
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        center: {
            type: Object,
            required: true
        },
        zoom: {
            type: Number,
            required: true
        },
        markers: {
            type: Array,
            required: true
        }
    },
    computed: {
        editRoute() {
            return `/maps/edit/${this.id}`;
        }
    },
    methods: {
        deleteMap() {
            this.$store.dispatch('deleteMap', this.id);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-map-preview {
    background: $white;
    margin: 12px 10px;
    border-radius: .5em;
    box-shadow: 1px 1px 5px 0px rgba($black, .025);

    &__title {
        display: block;
        width: 100%;
        padding: 14px 20px 7px;
        font-weight: 400;
        letter-spacing: -.025em;
        color: $textBlack;

        &:empty {
            &::before {
                content: " ";
                display: inline-block;
            }
        }
    }

    &__buttons {
        display: flex;
        width: 100%;
        padding: 10px 20px;

        a,
        button {
            width: 48%;

            &:first-child {
                margin-right: 4%;
            }
        }
    }
}
</style>
