<template>
    <transition v-if="annyang" name="fade">
        <div class="nu-voice-recognition">
            <div class="nu-voice-recognition__content">
                <Button
                    icon="times"
                    @click="close"
                />
                <div class="nu-voice-recognition__icon-section">
                    <font-awesome-icon
                        class="nu-voice-recognition__icon"
                        icon="microphone"
                        color="#3d348b"
                        size="6x"
                    />
                </div>
                <p class="nu-voice-recognition__playback">{{ words }}</p>
                <div
                    ref="conversationContainer"
                    class="nu-voice-recognition__conversation-container"
                >
                    <p
                        v-for="(m, i) in conversationHistory"
                        :key="i"
                        :class="`nu-voice-recognition__conversation-message nu-voice-recognition__conversation-message--${m.speaker}`"
                    >{{ m.message }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import LoadingSpinner from '@/ui-components/LoadingSpinner';
import Button from '@/ui-components/Button';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { microphone } from '@fortawesome/fontawesome-free-solid';
import annyang from 'annyang';
import speaker from '@/components/speaker';
import router from '@/router';

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default {
    components: {
        LoadingSpinner,
        Button,
        FontAwesomeIcon
    },
    data() {
        return {
            annyang,
            words: '',
            conversationHistory: []
        }
    },
    watch: {
        conversationHistory() {
            this.$nextTick(() => {
                this.$refs.conversationContainer.scrollTop = this.$refs.conversationContainer.scrollHeight;
            });
        }
    },
    created() {
        if (annyang) {
            const commands = {
                '(*any) about (*any)': () => this.navigate('/about'),
                '(*any) how (*any)': () => this.navigate('/getting-started'),
                '(*any) map(s) (*any)': () => this.navigate('/maps'),
                '(*any) theme(s) (*any)': () => this.navigate('/themes'),
                '(*any) home (*any)': () => this.navigate('/'),
                '(*any)': (msg) => {
                    annyang.removeCommands();
                    this.speak(`I'm sorry, I don't understand. Would you like to contact support about it?`);
                    annyang.addCommands({
                        '(*any) yes (*any)': () => this.navigate(`/contact?msg=${capitaliseFirstLetter(msg)}`),
                        '(*any) no (*any)': () => {
                            annyang.removeCommands();
                            annyang.addCommands(commands);
                            this.speak('How can I help you?');
                        }
                    });
                }
            };

            annyang.addCommands(commands);

            annyang.addCallback('result', words => {
                const word = capitaliseFirstLetter(words[0].replace(/^\s+/g, ''));
                this.words = word;
                this.conversationHistory.push({
                    speaker: 'me',
                    message: word
                });
            });

            annyang.start();
        }
    },
    mounted() {
        if (annyang) {
            this.speak('Hello, how can I help you?');
        }
    },
    methods: {
        speak(message) {
            return new Promise(resolve => {
                annyang.pause();
                speaker.say(message).then(() => {
                    annyang.resume();
                    resolve();
                });
                this.conversationHistory.push({
                    speaker: 'you',
                    message
                });
            });
        },
        navigate(path) {
            router.push(path);
            this.close();
        },
        close(cb) {
            this.$store.dispatch('deactivateVoiceMode');
            typeof cb === 'function' && cb();
        }
    },
    destroyed() {
        if (annyang) {
            annyang.abort();
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}

.nu-voice-recognition {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($midGrey, .9);

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

    &__conversation-container {
        display: block;
        width: 320px;
        max-height: 320px;
        overflow-y: auto;
        margin: 0 auto;
    }

    &__conversation-message {
        position: relative;
        display: block;
        margin-bottom: 12px;
        padding: 9px 24px;
        border-radius: 1em;
        width: 90%;

        &::before {
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            width: 0;
            height: 0;
            border-style: solid;
        }

        &--me {
            background-color: rgba($pageBackground, .75);
            color: $textBlack;
            margin-right: auto;
            margin-left: 3px;
            border-bottom-left-radius: 0;

            &::before {
                border-width: 0 0 12px 3px;
                border-color: transparent transparent rgba($pageBackground, .75) transparent;
                right: 100%;
            }
        }

        &--you {
            background-color: rgba($active, .75);
            color: $white;
            margin-left: auto;
            margin-right: 3px;
            border-bottom-right-radius: 0;

            &::before {
                border-width: 12px 0 0 3px;
                border-color: transparent transparent transparent rgba($active, .75);
                left: 100%;
            }
        }
    }
}

@keyframes ping {
    0% { opacity: 0; transform: scale(1.25); }
    1% { opacity: 1; transform: scale(1.25); }
    20% { opacity: 0; transform: scale(1.5); }
}
</style>