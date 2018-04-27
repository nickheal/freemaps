<template>
    <h1><slot/></h1>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

h1 {
    font-weight: 100;
    letter-spacing: -.025em;
    margin: 17px 0 15px;
    color: $textBlack;
}
</style>
