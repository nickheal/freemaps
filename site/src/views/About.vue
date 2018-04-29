<template>
    <main class="nu-about">
        <Container>
            <Row>
                <Column>
                    <page-title>{{ $t('pages.about.title') }}</page-title>
                    <p>{{ $t('pages.about.content') }}</p>
                    <Link
                        class="nu-about__getting-started"
                        linkTarget="/getting-started"
                        :text="$t('gettingStarted')"
                    />
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
import Link from '@/ui-components/Link';

export default {
    name: 'about',
    components: {
        Container,
        Row,
        Column,
        PageTitle,
        Link
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-about {
    background: $pageBackground;

    &__getting-started {
        display: inline-block;
        margin-top: 21px;
        margin-bottom: 20px;
    }
}
</style>
