<script setup lang="ts">
import type { AreaListResponse } from '~/models/Area';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';

import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'area',
});

useSeoMeta({
    title: 'Area',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
        })
        .build(),
);

const params = reactive(new AreaPaginationSearchParams());
const search = reactive({
    count: 0,
    code: '',
});

const { results, total, isLoading } = useQueryAreaList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<AreaListResponse>()
        .setColumn({
            key: 'code',
            sortKey: 'code',
            name: 'Kode Area',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-gold-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'area-detail', params: { code: row.code } },
            }, () => truncateString(row.code, 20)),
        })
        .setColumn({
            key: 'description',
            sortKey: 'description',
            name: 'Deskripsi',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => row.description),
        })
        .build(),
);

const handleSearch = () => {
    params.setCode(search.code);
    params.setFirstPage();
    ++search.count;
};
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VFlex
                direction="row"
                items="center"
                gap="4"
                class="w-full max-w-lg"
            >
                <form
                    class="w-full max-w-xs"
                    @submit.prevent="handleSearch"
                >
                    <VInput
                        id="areaCode"
                        v-model="search.code"
                        name="areaCode"
                        type="text"
                        size="md"
                        placeholder="Cari kode area..."
                        input-class="border border-gray-700 placeholder:text-gray-700"
                    >
                        <template #prefixIcon>
                            <Icon
                                name="lucide:search"
                                class="text-gray-700"
                            />
                        </template>
                    </VInput>
                </form>

                <NuxtLink to="/area/create">
                    <VButton
                        variant="primary"
                        size="md"
                    >
                        Tambah Area
                        <Icon name="lucide:circle-plus" />
                    </VButton>
                </NuxtLink>
            </VFlex>
        </template>

        <VTable
            v-model:sort-key="params.sort"
            v-model:sort-direction="params.direction"
            v-model:page="params.page"
            v-model:per-page="params.size"
            title="Area"
            :entries="results"
            :columns="columns"
            :total="total"
            :loading="isLoading"
        />
    </NuxtLayout>
</template>
