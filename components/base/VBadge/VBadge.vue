<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { BadgeVariants } from '.';
import { badgeVariants, indicatorVariant, pulseVariant } from '.';

type Props = {
    class?: HTMLAttributes['class'];
    variant?: BadgeVariants['variant'];
    rounded?: BadgeVariants['rounded'];
    indicator?: boolean;
    pulse?: boolean;
    as?: 'span' | 'button';
};

const { as = 'span', ...props } = defineProps<Props>();
</script>

<template>
    <component
        :is="as"
        :class="cn(badgeVariants({ variant, rounded }), [indicator && 'pl-6'], props.class)"
    >
        <span
            v-if="indicator && pulse"
            :class="cn(pulseVariant({ variant }))"
        />
        <span
            v-if="indicator"
            :class="cn(indicatorVariant({ variant }))"
        />
        <slot />
    </component>
</template>
