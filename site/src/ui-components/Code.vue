<template>
  <code class="code"><slot/></code>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.code {
    display: block;
    margin: 9px 0 11px;
    padding: 9px 18px;
    background: $pageBackground;
    font-family: "Lucida Console", Monaco, monospace;
    line-height: 1.65;
    font-size: .8em;
}
</style>
