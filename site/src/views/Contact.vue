<template>
    <main class="nu-contact">
        <Container>
            <Row>
                <Column :width="3"></Column>
                <Column :width="6">
                    <page-title>{{ $t('pages.contact.title') }}</page-title>
                    <form>
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
