<template>
    <main class="nu-home">
        <Container>
            <Row>
                <Column>
                    <h1>Welcome!</h1>
                    <p>This is freemaps, a site designed to help with adding stylised Google maps to websited</p>
                </Column>
            </Row>
            <Row>
                <Column
                    :width="6"
                >
                    <router-link
                        class="nu-path-choice"
                        to="/maps"
                    >
                        <h2>Maps</h2>
                    </router-link>
                </Column>
                <Column
                    :width="6"
                >
                    <router-link
                        class="nu-path-choice"
                        to="/themes"
                    >
                        <h2>Themes</h2>
                    </router-link>
                </Column>
            </Row>
        </Container>
    </main>
</template>

<script>
import Container from '@/ui-components/Container';
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import MapPreview from '@/components/MapPreview';

export default {
    name: 'home',
    components: {
        Container,
        Row,
        Column,
        MapPreview
    }
};
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-home {
    background: $pageBackground;
}

.nu-path-choice {
    display: block;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
}
</style>
