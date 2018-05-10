<template>
    <main class="nu-contact">
        <Container>
            <Row>
                <Column :width="3"></Column>
                <Column :width="6">
                    <page-title>{{ $t('pages.contact.title') }}</page-title>
                    <form
                        @submit.prevent="sendMessage"
                    >
                        <legend class="sr-only">Contact</legend>
                        <Input
                            :label="$t('pages.contact.name')"
                            v-model="name"
                        />
                        <Input
                            :label="$t('pages.contact.email')"
                            type="email"
                            v-model="email"
                        />
                        <Input
                            ref="message"
                            :label="$t('pages.contact.message')"
                            :value="message"
                            v-model="message"
                            required
                        />
                        <Button
                            class="nu-contact__button"
                            :text="$t('pages.contact.send')"
                            :loading="formSubmitting"
                        />
                    </form>
                </Column>
            </Row>
        </Container>
    </main>
</template>

<script>
import anime from 'animejs';
import Container from '@/ui-components/Container';
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import PageTitle from '@/ui-components/PageTitle';
import Input from '@/ui-components/Input';
import Button from '@/ui-components/Button';

export default {
    name: 'contact',
    components: {
        Container,
        Row,
        Column,
        PageTitle,
        Input,
        Button
    },
    props: {
        msg: {
            type: String,
            default: ''
        }
    },
    watch: {
        msg(newMsg) {
            this.message = newMsg;
        }
    },
    data() {
        return {
            formSubmitting: false,
            name: '',
            email: '',
            message: this.msg
        }
    },
    methods: {
        async sendMessage() {
            if (this.formSubmitting) return;
            this.formSubmitting = true;

            await this.hitServer();

            anime.timeline().add({
                targets: this.$refs.message.$el,
                translateX: 40,
                opacity: 0,
                duration: 500,
                easing: 'easeInQuad',
                complete: () => {
                    this.message = '';
                    this.formSubmitting = false;
                }
            }).add({
                targets: this.$refs.message.$el,
                translateX: -40,
                duration: 0
            }).add({
                targets: this.$refs.message.$el,
                translateX: 0,
                opacity: 1,
                duration: 600,
                easing: 'easeInOutBack'
            });
        },
        hitServer() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, 2000);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-contact {
    background: $pageBackground;

    &__button {
        margin-top: 6px;
        margin-bottom: 36px;
    }
}
</style>
