<script setup lang="ts">
import type { PaginationPrevProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { PaginationActionVariants } from '.';
import { paginationActionVariants } from '.';

type Props = PaginationPrevProps & {
    class?: HTMLAttributes['class'];
    rounded?: PaginationActionVariants['rounded'];
    size?: PaginationActionVariants['size'];
};

const { asChild = true, ...props } = defineProps<Props>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});
</script>

<template>
    <VLibRadixPaginationPrev
        v-bind="delegatedProps"
        :as-child="asChild"
    >
        <slot>
            <button
                name="btn-pagination-prev"
                type="button"
                aria-label="Go to previous page"
                data-testid="btn-pagination-prev"
                :class="
                    cn(paginationActionVariants({ rounded, size }))
                "
            >
                <Icon name="mdi:arrow-left" />
                <span>Previous</span>
            </button>
        </slot>
    </VLibRadixPaginationPrev>
</template>
