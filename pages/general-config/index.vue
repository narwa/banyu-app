<script setup lang="ts">
import type { GeneralConfigListResponse } from '~/models/GeneralConfig';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VLink from '~/components/base/VLink/VLink.vue';
import { useQueryGeneralConfigList } from '~/composables/general-config/queries/useQueryGeneralConfigList';
import { PaginationSearchParam } from '~/models/params/PaginationSearchParam';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'general-config',
});

useSeoMeta({
    title: 'Konfigurasi Umum',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Konfigurasi Umum',
        })
        .build(),
);

const params = reactive(new PaginationSearchParam());
const search = reactive({
    count: 0,
    fullName: '',
});

const { results, total, isLoading } = useQueryGeneralConfigList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<GeneralConfigListResponse>()
        .setColumn({
            key: 'code',
            sortKey: 'code',
            name: 'Kode',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-gold-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'general-config-detail', params: { code: row.code } },
            }, () => truncateString(row.code, 20)),
        })
        .setColumn({
            key: 'dataType',
            sortKey: 'dataType',
            name: 'Tipe Data',
        })
        .setColumn({
            key: 'value',
            sortKey: 'value',
            name: 'Nilai',
        })
        .build(),
);
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VLink
                variant="primary"
                :to="{ name: 'general-config-create' }"
            >
                Tambah Konfigurasi Umum
                <Icon name="lucide:circle-plus" />
            </VLink>
        </template>

        <VTable
            v-model:sort-key="params.sort"
            v-model:sort-direction="params.direction"
            v-model:page="params.page"
            v-model:per-page="params.size"
            title="Konfigurasi Umum"
            :entries="results"
            :columns="columns"
            :total="total"
            :loading="isLoading"
        />
    </NuxtLayout>
</template>
