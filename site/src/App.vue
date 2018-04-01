<template>
    <div id="app">
        <Nav/>
        <router-view/>
    </div>
</template>

<script>
import Nav from '@/components/Nav';

export default {
    components: {
        Nav
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica, Arial, sans-serif;
}
</style>
