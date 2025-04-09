<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { AlertVariants } from '.';
import { alertVariants, iconVariant, textVariant, titleVariant } from '.';

type Props = {
    variant?: AlertVariants['variant'];
    rounded?: AlertVariants['rounded'];
    class?: HTMLAttributes['class'];
    titleClass?: HTMLAttributes['class'];
    textClass?: HTMLAttributes['class'];
    title?: string;
    text?: string;
    withIcon?: boolean;
};

const { rounded = 'md', withIcon = true, ...props } = defineProps<Props>();
</script>

<template>
    <div
        :class="
            cn(alertVariants({ variant, rounded }), !$slots.text && !text && 'items-center', props.class)
        "
    >
        <div
            v-if="withIcon"
            :class="cn(iconVariant({ variant }))"
        >
            <slot name="icon">
                <svg
                    v-if="variant === 'success'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :class="cn('w-6 h-6')"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    v-else-if="variant === 'warning'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :class="cn('w-6 h-6')"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    v-else-if="variant === 'danger'"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :class="cn('w-6 h-6')"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clip-rule="evenodd"
                    />
                </svg>
                <svg
                    v-else
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :class="cn('w-6 h-6')"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </slot>
        </div>
        <div :class="cn('w-full')">
            <h3
                v-if="$slots.title || title"
                :class="cn(titleVariant({ variant }), props.titleClass)"
            >
                <slot name="title">
                    {{ props.title }}
                </slot>
            </h3>

            <p
                v-if="$slots.text || text"
                :class="cn(textVariant({ variant }), { 'mt-0': !$slots.title && !title }, props.textClass)"
            >
                <slot name="text">
                    {{ props.text }}
                </slot>
            </p>
        </div>
    </div>
</template>
