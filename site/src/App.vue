<template>
    <div id="app">
        <Nav/>
        <router-view/>
        <Footer/>
        <voice-recognition/>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import VoiceRecognition from '@/components/VoiceRecognition';

export default {
    components: {
        Nav,
        Footer,
        VoiceRecognition
    }
}
</script>

<style lang="scss">
@import "~@/css-config.scss";
</style>
