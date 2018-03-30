<template>
    <div>
        <h2>{{ title }}</h2>
        <Button
            :text="$t('edit')"
        />
        <Button
            :text="$t('delete')"
            type="secondary"
        />
    </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
    components: {
        Button
    },
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
    div {
        background: white;
        padding: 20px;
        margin: 10px;
    }
</style>
