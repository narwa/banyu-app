<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import type { SkeletonVariants } from '.';
import { skeletonVariants } from '.';

type Props = {
    class?: HTMLAttributes['class'];
    rounded?: SkeletonVariants['rounded'];
};

const { rounded = 'base', ...props } = defineProps<Props>();
</script>

<template>
    <div :class="cn(skeletonVariants({ rounded }), props.class)" />
</template>
