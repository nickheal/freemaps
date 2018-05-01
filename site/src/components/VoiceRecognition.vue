<template>
    <div class="nu-voice-recognition">
        <div class="nu-voice-recognition__content">
            <div class="nu-voice-recognition__icon-section">
                <font-awesome-icon
                    class="nu-voice-recognition__icon"
                    icon="microphone"
                    color="#3d348b"
                    size="6x"
                />
            </div>
            <p class="nu-voice-recognition__playback">{{ words }}</p>
        </div>
    </div>
</template>

<script>
import LoadingSpinner from '@/ui-components/LoadingSpinner';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { microphone } from '@fortawesome/fontawesome-free-solid';
import annyang from 'annyang';
import router from '@/router';

export default {
    components: {
        LoadingSpinner,
        FontAwesomeIcon
    },
    data() {
        return {
            words: ''
        }
    },
    created() {
        if (annyang) {
            const commands = {
                '(*any) about (*any)': () => router.push('/about'),
                '(*any) how (*any)': () => router.push('/getting-started'),
                '(*any) map(s) (*any)': () => router.push('/maps'),
                '(*any) theme(s) (*any)': () => router.push('/themes'),
                '(*any) home (*any)': () => router.push('/')
            };

            annyang.addCommands(commands);

            annyang.addCallback('result', words => this.words = words[0]);

            annyang.start();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-voice-recognition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($midGrey, .8);

    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    &__icon-section {
        position: relative;
        display: block;
        width: 96px;
        margin: 0 auto 64px;

        &::before {
            content: "";
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background-color: $pageBackground;
            border-radius: 999em;
            opacity: 0;
            animation: ping 5000ms infinite;
        }
    }

    &__icon {
        display: block;
        margin: 0 auto;
    }

    &__playback {
        display: block;
        margin-bottom: 64px;
        font-size: 3em;
        font-weight: 100;
        letter-spacing: -.04em;
        text-align: center;
        color: $textBlack;
    }
}

@keyframes ping {
    0% { opacity: 0; transform: scale(1.25); }
    1% { opacity: 1; transform: scale(1.25); }
    20% { opacity: 0; transform: scale(1.5); }
}
</style>