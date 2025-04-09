<script lang="ts" setup>
import type { Props } from '.';
import { buttonVariants } from '.';

const {
    as = 'button',
    type = 'button',
    ...props
} = defineProps<Props>();

const isLoading = computed(() => props.loading);
const variant = computed(() =>
    cn(
        buttonVariants({
            variant: props.variant,
            rounded: props.rounded,
            size: props.size,
            isLoading: props.loading,
            isBlock: props.block,
        }),
        props.class,
    ),
);
const buttonType = computed(() =>
    as === 'button'
        ? type
        : undefined,
);
const skeletonClass = computed(() =>
    cn(
        'h-4 w-12 bg-gradient-to-r from-black/[10%] from-[7%] via-black/[18%] via-[18%] to-black/[9%] to-[33%]',
    ),
);
</script>

<template>
    <component
        :is="as"
        :name="name"
        :type="buttonType"
        :disabled="disabled || isLoading"
        :class="variant"
    >
        <VSkeleton
            v-if="isLoading"
            :class="skeletonClass"
        />
        <slot v-else />
    </component>
</template>
