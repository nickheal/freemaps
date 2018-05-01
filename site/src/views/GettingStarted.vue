<template>
    <main class="nu-getting-started">
        <Container>
            <Row>
                <Column :width="3" />
                <Column :width="6">
                    <page-title>{{ $t('pages.gettingStarted.title') }}</page-title>
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

export default {
    name: 'getting-started',
    components: {
        Container,
        Row,
        Column,
        PageTitle
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-getting-started {
    background: $pageBackground;
}
</style>
