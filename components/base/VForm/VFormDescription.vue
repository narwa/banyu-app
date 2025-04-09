<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    as?: string;
    id?: string;
};

const { as = 'span', ...props } = defineProps<Props>();
const id = computed(() => props.id ? `${props.id}-form-description` : undefined);
</script>

<template>
    <component
        :is="as"
        :id="id"
        :class="cn('block text-xs text-muted-400 leading-relaxed', props.class)"
    >
        <slot />
    </component>
</template>
