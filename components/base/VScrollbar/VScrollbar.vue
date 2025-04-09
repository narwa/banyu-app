<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

const props = defineProps<{
    class?: HTMLAttributes['class'];
    wrapperClass?: HTMLAttributes['class'];
}>();

const wrapperClass = computed(() =>
    cn(
        '[&_.ps\_\_rail-y]:!bg-transparent [&_.ps\_\_thumb-y]:bg-muted-400/30 [&_.ps\_\_thumb-y]:hover:[&_.ps\_\_rail-y]:!bg-muted-400/30 [&_.ps\_\_thumb-y]:hover:[&_.ps\_\_rail-y]:!w-1.5',
        props.wrapperClass,
    ),
);
</script>

<template>
    <div :class="wrapperClass">
        <PerfectScrollbar
            v-bind="$attrs"
            :class="cn('h-full', props.class)"
        >
            <slot />
        </PerfectScrollbar>
    </div>
</template>

<style src="vue3-perfect-scrollbar/style.css" />
