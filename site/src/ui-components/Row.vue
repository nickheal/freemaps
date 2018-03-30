<template>
    <div 
        class="nu-row"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: Number,
            default: 12
        }
    }
}
</script>

<style lang="scss" scoped>
.nu-row {
    display: flex;
    flex-wrap: wrap;
}
</style>
