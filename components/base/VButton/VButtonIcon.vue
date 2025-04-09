<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { ButtonIconVariants } from '.';
import { buttonIconVariants } from '.';

type Props = {
    class?: HTMLAttributes['class'];
    rounded?: ButtonIconVariants['rounded'];
    bordered?: boolean;
    disabled?: boolean;
};
const props = defineProps<Props>();
</script>

<template>
    <button
        type="button"
        :disabled="disabled"
        :class="cn(
            props.class,
            buttonIconVariants({
                rounded: props.rounded,
                bordered: props.bordered,
            }),
        )"
    >
        <slot />
    </button>
</template>
