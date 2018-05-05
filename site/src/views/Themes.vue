<template>
    <main class="nu-themes">
        <row>
            <column>
                <page-title class="nu-themes__title">{{ $t('pages.themes.title') }}</page-title>
            </column>
        </row>
    </main>
</template>

<script>
import Row from '@/ui-components/Row';
import Column from '@/ui-components/Column';
import PageTitle from '@/ui-components/PageTitle';

export default {
    name: 'themes',
    components: {
        Row,
        Column,
        PageTitle
    }
}
</script>

<style lang="scss" scoped>
@import "~@/css-config.scss";

.nu-themes {
    background: $pageBackground;

    &__title {
        margin-left: 10px;
    }
}
</style>
