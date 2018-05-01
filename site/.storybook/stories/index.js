import Vue from 'vue';

import { storiesOf } from '@storybook/vue';

import Button from '../../src/ui-components/Button.vue';

storiesOf('Button', module)
    .add('story as a template', () => '<Button>story as a function template</Button>')
    .add('story as a component', () => ({
        components: { Button },
        template: '<Button :rounded="true">rounded</Button>'
    }));