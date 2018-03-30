<template>
    <div 
        class="nu-column"
        :style="{
            width: colWidth    
        }"
    >
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: Number,
            default: 12
        }
    },
    computed: {
        colWidth() {
            return `${(this.width / 12) * 100}%`;
        }
    }
}
</script>

<style lang="scss" scoped>
.nu-column {

}
</style>
