<script setup lang="ts">
import type { NuxtLink } from '#components';

type Props = {
    isActive?: boolean;
    as?: typeof NuxtLink;
};

defineProps<Props>();
</script>

<template>
    <VLink
        variant="unstyled"
        rounded="none"
        :class="cn('sidebar__link', isActive && 'sidebar__link--active')"
    >
        <div>
            <slot name="icon" />
        </div>
        <span class="px-2 text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap xl:hidden group-[.sidebar--collapsed.sidebar--hover]:xl:block">
            <slot />
        </span>
        <div class="ml-auto xl:hidden group-[.sidebar--collapsed.sidebar--hover]:xl:block">
            <Icon
                name="mdi:chevron-right"
            />
        </div>
    </VLink>
</template>

<style scoped lang="scss">
.sidebar__link {
    @apply w-full text-yellow-800 flex items-center justify-center !py-6 !px-3.5 transition-all duration-200;

    & svg {
        @apply text-secondary-500 fill-secondary-500;
    }

    &--active {
        @apply text-white bg-gradient-to-r from-secondary-500 to-secondary-500 shadow;

        & svg {
            @apply text-white fill-secondary-500;
        }
    }
}
</style>
