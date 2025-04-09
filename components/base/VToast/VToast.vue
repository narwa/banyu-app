<script lang="ts" setup>
import type { ToasterProps } from 'vue-sonner';
import { Toaster } from 'vue-sonner';

const { position = 'bottom-right', ...props } = defineProps<ToasterProps>();
</script>

<template>
    <Toaster
        v-bind="props"
        class="toaster group"
        :position="position"
        :toast-options="{
            classes: {
                toast:
                    'font-sans group toast group-[.toaster]:bg-background group-[.toaster]:text-muted-800 group-[.toaster]:dark:text-muted-100 group-[.toaster]:shadow-lg',
                description: 'group-[.toast]:text-muted-500 group-[.toast]:dark:text-muted-400',
                error: 'toast-error',
                success: 'toast-success',
            },
        }"
    >
        <template #success-icon>
            <svg
                width="1.2em"
                height="1.2em"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-green-600"
            >
                <path d="m9 11 3 3 8-8" />
                <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
            </svg>
        </template>
        <template #error-icon>
            <svg
                width="1.2em"
                height="1.2em"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-danger-600"
            >
                <path d="M12 15v.01" />
                <path d="M12 9v2" />
                <path
                    d="M5 19h14a2 2 0 0 0 1.84-2.75L13.74 4a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 19"
                />
            </svg>
        </template>
    </Toaster>
</template>
