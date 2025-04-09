<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { IndicatorVariants } from '.';
import { indicatorVariant, pulseVariant } from '.';

type Props = {
    variant?: IndicatorVariants['variant'];
    class?: HTMLAttributes['class'];
    indicator?: boolean;
    pulse?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
    <span :class="cn('flex items-center text-sm text-muted-700 dark:text-muted-200', props.class)">
        <span
            v-if="pulse"
            :class="cn(pulseVariant({ variant }))"
        />
        <slot name="content">
            <span :class="cn(indicatorVariant({ variant }))" />
            <slot />
        </slot>
    </span>
</template>
