<template>
    <div id="app">
        <Nav/>
        <router-view/>
        <Footer/>
        <voice-recognition v-if="voiceMode" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import VoiceRecognition from '@/components/VoiceRecognition';

export default {
    components: {
        Nav,
        Footer,
        VoiceRecognition
    },
    computed: {
        ...mapGetters([
            'voiceMode'
        ])
    }
}
</script>

<style lang="scss">
@import "~@/css-config.scss";
</style>
