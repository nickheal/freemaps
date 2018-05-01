<template>
    <main class="nu-home">
        <Container class="nu-home__header">
            <Row>
                <Column :width="3" />
                <Column :width="6">
                    <page-title class="nu-home__title">{{ $t('pages.home.title') }}</page-title>
                    <p class="nu-home__para">{{ $t('pages.home.content') }}</p>
                    <Link
                        class="nu-home__getting-started"
                        linkTarget="/getting-started"
                        :text="$t('gettingStarted')"
                    />
                </Column>
            </Row>
        </Container>
        <Container>
            <Row>
                <Column
                    :width="6"
                >
                    <router-link
                        class="nu-path-choice nu-path-choice--maps"
                        to="/maps"
                    >
                        <h2 class="nu-path-choice__title">{{ $t('maps') }}</h2>
                    </router-link>
                </Column>
                <Column
                    :width="6"
                >
                    <router-link
                        class="nu-path-choice nu-path-choice--themes"
                        to="/themes"
                    >
                        <h2 class="nu-path-choice__title">{{ $t('themes') }}</h2>
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
import PageTitle from '@/ui-components/PageTitle';
import Link from '@/ui-components/Link';

export default {
    name: 'home',
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

.nu-home {
    background: $midGrey;

    &__header {
        background: $pageBackground;
        text-align: center;
    }

    &__title {
        margin-bottom: 12px;
    }

    &__para {
        color: $textBlack;
        text-align: left;
        line-height: 1.5;
    }

    &__getting-started {
        display: inline-block;
        margin-top: 18px;
        margin-bottom: 20px;
    }
}

.nu-path-choice {
    position: relative;
    display: block;
    margin: 20px 5% 26px;
    width: 90%;
    height: 0;
    padding-bottom: 60%;
    border: solid 4px $interaction;
    border-radius: .5em;
    background-color: $white;
    box-shadow: 1px 1px 5px 0px rgba($black, .025);
    transition: transform 300ms, box-shadow 300ms;

    &:hover,
    &:focus {
        transform: scale(1.01);
        box-shadow: 1px 1px 10px 0px rgba($black, .1);
    }

    &:active {
        transform: scale(1);
        box-shadow: 1px 1px 5px 0px rgba($black, .025);
    }

    &--maps {
        background: url(../assets/map-tile.jpg);
        background-size: cover;
    }

    &--themes {
        background: url(../assets/theme-tile.png);
        background-size: cover;

        .nu-path-choice {
            &__title {
                color: $white;

                &:before {
                    background: rgba($textBlack, .85);
                }
            }
        }
    }

    &__title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: $textBlack;

        &:before {
            position: absolute;
            top: -2em;
            left: -2em;
            z-index: -1;
            content: "";
            display: block;
            border-radius: .25em;
            background: rgba($white, .85);
            filter: blur(16px);
            width: calc(100% + 4em);
            height: calc(100% + 4em);
        }
    }
}
</style>
