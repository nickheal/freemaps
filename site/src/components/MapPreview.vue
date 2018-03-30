<template>
    <div class="nu-map-preview">
        <h2 class="nu-map-preview__title">{{ title }}</h2>
        <img class="nu-map-preview__map-placeholder" src="https://placebear.com/300/200">
        <div class="nu-map-preview__buttons">
            <Link
                :text="$t('edit')"
                :linkTarget="editRoute"
            />
            <Button
                :text="$t('delete')"
                type="secondary"
            />
        </div>
    </div>
</template>

<script>
import Link from '@/ui-components/Link';
import Button from '@/ui-components/Button';

export default {
    components: {
        Link,
        Button
    },
    props: {
        id: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    computed: {
        editRoute() {
            return `/maps/edit/${this.id}`;
        },
        deleteRoute() {
            return `/maps/delete/${this.id}`;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-map-preview {
    background: $white;
    margin: 10px;
    border-radius: .5em;

    &__title {
        display: block;
        width: 100%;
        padding: 20px;
    }

    &__map-placeholder {
        display: block;
        width: 100%;
    }

    &__buttons {
        display: flex;
        width: 100%;
        padding: 20px;

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
