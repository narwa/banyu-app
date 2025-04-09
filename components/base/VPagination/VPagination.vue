<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    paginationItemClass?: HTMLAttributes['class'];
    total?: number;
    perPage?: number;
    siblingCount?: number;
    hideBorder?: boolean;
};

type Emits = {
    change: [value: number];
};

const { total = 0, perPage = 10, siblingCount = 1, ...props } = defineProps<Props>();
const emits = defineEmits<Emits>();
const currentPage = defineModel('page', { default: 1, type: Number });
</script>

<template>
    <VLibRadixPaginationRoot
        v-model:page="currentPage"
        :total="total"
        :items-per-page="perPage"
        :sibling-count="siblingCount"
        show-edges
        @update:page="(value) => emits('change', value)"
    >
        <VLibRadixPaginationList
            v-slot="{ items }"
            :class="cn(
                'flex items-center gap-1 pt-4 dark:border-muted-700', {
                    'border-t border-muted-200': !hideBorder,
                },
                props.class,
            )"
        >
            <VPaginationPrev />

            <div :class="cn('flex flex-1 items-center justify-center', paginationItemClass)">
                <template v-for="(page, index) in items">
                    <VPaginationListItem
                        v-if="page.type === 'page'"
                        :key="index"
                        :value="page.value"
                    >
                        {{ page.value }}
                    </VPaginationListItem>
                    <VLibRadixPaginationEllipsis
                        v-else
                        :key="page.type"
                        :index="index"
                        :class="cn('w-9 h-9 flex items-center justify-center')"
                    />
                </template>
            </div>

            <VPaginationNext />
        </VLibRadixPaginationList>
    </VLibRadixPaginationRoot>
</template>
