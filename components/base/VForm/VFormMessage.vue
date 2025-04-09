<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    as?: string;
    id?: string;
    name: string;
};

const { as = 'span', ...props } = defineProps<Props>();
const id = computed(() => props.id ? `${props.id}-form-message` : undefined);
</script>

<template>
    <VLibFormErrorMessage
        :id="id"
        :as="as"
        :name="name"
        :class="cn('block text-sm text-danger-600 dark:text-danger-300 animate-in slide-in-from-top-3', props.class)"
        :data-testid="`error[${name}]`"
    />
</template>
