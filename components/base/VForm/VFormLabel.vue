<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    label?: string;
    labelFor?: string;
    labelClass?: HTMLAttributes['class'];
    required?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('flex items-center justify-between', props.class)">
        <label
            v-if="$slots.label || label"
            :for="labelFor"
            :class="cn('flex-1 leading-none font-bold text-muted-800 dark:text-muted-100', props.labelClass)"
        >
            <slot name="label">
                {{ label }}
                <span
                    v-if="required"
                    :class="cn(required && 'text-danger-600 dark:text-danger-300')"
                >
                    *
                </span>
            </slot>
        </label>
    </div>
</template>
