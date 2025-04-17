<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    title?: string;
    text?: string;
};
const props = defineProps<Props>();

const title = computed(() => props.title ?? 'Tidak ada data');
const text = computed(() => props.text ?? 'Mulailah dengan membuat data baru');
</script>

<template>
    <div :class="cn('relative text-center w-full', props.class)">
        <slot name="icon">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="cn('w-7 h-7 mx-auto text-muted-500 dark:text-muted-400')"
            >
                <path d="m7.5 4.27 9 5.15" />
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5" />
                <path d="M12 22V12" />
            </svg>
        </slot>
        <h3 :class="cn('mt-2 text-sm font-normal text-muted-800 dark:text-muted-100')">
            <slot name="title">
                {{ title }}
            </slot>
        </h3>
        <p
            v-if="$slots.text || text"
            :class="cn('mt-0.5 text-sm text-muted-400')"
        >
            <slot name="text">
                {{ text }}
            </slot>
        </p>
    </div>
</template>
