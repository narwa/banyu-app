<script setup lang="ts">
import type { MeterReadingListResponse } from '~/models/MeterReading';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VAccordion from '~/components/base/VAccordion/VAccordion.vue';
import VBadge from '~/components/base/VBadge/VBadge.vue';
import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import { useQueryMeterReadingList } from '~/composables/meter-reading/queries/useQueryMeterReadingList';
import { MeterReadingPaginationSearchParams } from '~/models/params/MeterReadingPaginationSearchParams';
import { METER_READING_STATUS, METER_READING_STATUS_VARIANTS, MONTH } from '../../constants/GeneralConstant';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'meter-reading',
});

useSeoMeta({
    title: 'Pembacaan Meteran',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pembacaan Meteran',
        })
        .build(),
);

const params = reactive(new MeterReadingPaginationSearchParams());
const search = reactive({
    count: 0,
    fullName: '',
});
const modal = reactive({
    calculate: false,
});

const { results, total, isLoading } = useQueryMeterReadingList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<MeterReadingListResponse>()
        .setColumn({
            key: 'meterNumber',
            sortKey: 'meterNumber',
            name: 'No Meter',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-gold-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'meter-reading-detail', params: { id: row.id } },
            }, () => truncateString(row.meterNumber, 20)),
        })
        .setColumn({
            key: 'areaCode',
            sortKey: 'areaCode',
            name: 'Kode Area',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.areaCode)),
        })
        .setColumn({
            key: 'memberFullName',
            sortKey: 'memberFullName',
            name: 'Nama Member',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.memberFullName)),
        })
        .setColumn({
            key: 'readingDate',
            sortKey: 'readingDate',
            name: 'Tanggal Pembacaan',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.readingDate)),
        })
        .setColumn({
            key: 'consumption',
            sortKey: 'consumption',
            name: 'Konsumsi',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatCurrency(row.consumption, { maximumFractionDigits: 0 })),
        })
        .setColumn({
            key: 'year',
            sortKey: 'year',
            name: 'Tahun',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => row.year),
        })
        .setColumn({
            key: 'month',
            sortKey: 'month',
            name: 'Bulan',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => MONTH[row.month - 1].label),
        })
        .setColumn({
            key: 'readingStatus',
            sortKey: 'readingStatus',
            name: 'Status',
            render: row => h(VBadge, {
                variant: METER_READING_STATUS_VARIANTS[row.readingStatus],
                class: 'w-max',
            }, () => METER_READING_STATUS[row.readingStatus]),
        })
        .setColumn({
            key: 'createdDate',
            sortKey: 'createdDate',
            name: 'Tanggal Dibuat',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.createdDate)),
        })
        .setColumn({
            key: 'lastModifiedDate',
            sortKey: 'lastModifiedDate',
            name: 'Tanggal Diubah',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDate(row.lastModifiedDate)),
        })
        .setColumn({
            key: 'version',
            sortKey: 'version',
            name: 'Versi',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.version.toString())),
        })
        .build(),
);

const handleCalculate = () => {
    modal.calculate = true;
};
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VFlex
                direction="row"
                gap="4"
            >
                <VLink
                    variant="primary"
                    :to="{ name: 'meter-reading-create' }"
                >
                    Tambah Pembacaan Meteran
                    <Icon name="lucide:circle-plus" />
                </VLink>
                <VButton
                    variant="info"
                    @click="handleCalculate"
                >
                    Kalkulasi
                    <Icon name="lucide:calculator" />
                </VButton>
            </VFlex>
        </template>

        <VAccordion>
            <VAccordionItem value="item-1">
                <template #title>
                    <p class="text-primary">
                        Filter
                    </p>
                </template>
                <template #default>
                    <FilterMeterReading
                        :params="params"
                    />
                </template>
            </VAccordionItem>
        </VAccordion>

        <VTable
            v-model:sort-key="params.sort"
            v-model:sort-direction="params.direction"
            v-model:page="params.page"
            v-model:per-page="params.size"
            title="Pembacaan Meteran"
            :entries="results"
            :columns="columns"
            :total="total"
            :loading="isLoading"
            class="mt-4"
        />

        <VDialog
            v-model:open="modal.calculate"
            title="Form Kalkukasi Pembacaan Meteran"
        >
            <FormCalculateMeterReading @submit="modal.calculate = false" />
        </VDialog>
    </NuxtLayout>
</template>
