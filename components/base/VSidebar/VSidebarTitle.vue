<script setup lang="ts">
type Props = {
    collapsed?: boolean;
};
defineProps<Props>();
</script>

<template>
    <span
        v-bind="$attrs"
        :class="cn('px-3.5 relative block mb-3 h-5 text-xs uppercase transition-colors duration-100 text-muted-400 tracking-wider', collapsed && 'title--collapsed')"
    >
        <slot />
    </span>
</template>

<style lang="scss" scoped>
.title--collapsed {
    @apply text-transparent before:content-['...'] before:absolute before:left-0 before:right-0 before:text-muted-500 before:transition-opacity before:duration-100 before:text-center before:tracking-normal;
}
</style>
