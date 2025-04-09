<script setup lang="ts">
import type { PaginationNextProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { PaginationActionVariants } from '.';
import { paginationActionVariants } from '.';

type Props = PaginationNextProps & {
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
    <VLibRadixPaginationNext
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
                <span>Next</span>
                <Icon name="mdi:arrow-right" />
            </button>
        </slot>
    </VLibRadixPaginationNext>
</template>
