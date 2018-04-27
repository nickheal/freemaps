<template>
    <main class="nu-contact">
        <Container>
            <Row>
                <Column :width="3"></Column>
                <Column :width="6">
                    <page-title>{{ $t('pages.contact.title') }}</page-title>
                    <form
                        ref="form"
                        @submit.prevent="sendMessage"
                    >
                        <legend class="sr-only">Contact</legend>
                        <Input
                            :label="$t('pages.contact.name')"
                        />
                        <Input
                            :label="$t('pages.contact.email')"
                            type="email"
                        />
                        <Input
                            :label="$t('pages.contact.message')"
                        />
                        <Button
                            class="nu-contact__button"
                            :text="$t('pages.contact.send')"
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
    methods: {
        sendMessage() {
            const refreshForm = anime.timeline();
            refreshForm.add({
                targets: this.$refs.form,
                translateX: 40,
                opacity: 0,
                duration: 500,
                easing: 'easeInQuad',
                complete: () => this.$refs.form.reset()
            }).add({
                targets: this.$refs.form,
                translateX: -40,
                duration: 0
            }).add({
                targets: this.$refs.form,
                translateX: 0,
                opacity: 1,
                duration: 600,
                easing: 'easeInOutBack'
            });
        },
        resetForm() {

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
