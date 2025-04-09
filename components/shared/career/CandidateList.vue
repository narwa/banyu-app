<script lang="ts" setup>
import type { SortDirection } from '~/components/base/VTable';
import type { CandidateListResponse } from '~/models/Candidate';
import { VBadge, VLink } from '#components';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import { APPLICATION_STATUS_VARIANTS } from '~/constants';

defineProps<{
    entries: CandidateListResponse[];
    total: number;
    loading: boolean;
}>();

const columns = computed(() =>
    new TableColumnBuilder<CandidateListResponse>()
        .setColumn({
            key: 'firstName',
            sortKey: 'firstName',
            name: 'Candidate Name',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-yellow-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-yellow-500 transition-colors duration-300 !text-xs',
                to: { name: 'candidate-detail', params: { id: row.id } },
            }, () => `${row.firstName} ${row.lastName}`),
        })
        .setColumn({
            key: 'email',
            sortKey: 'email',
            name: 'Email',
        })
        .setColumn({
            key: 'positionName',
            sortKey: 'positionName',
            name: 'Position',
        })
        .setColumn({
            key: 'status',
            sortKey: 'status',
            name: 'Status',
            render: row => h(
                VBadge,
                {
                    variant: APPLICATION_STATUS_VARIANTS[row.status],
                },
                () => row.status,
            ),
        })
        .setColumn({
            key: 'createdDate',
            sortKey: 'createdDate',
            name: 'Apply Date',
            render: row => h('span', formatEpochToDate(row.createdDate)),
        })
        .build(),
);

const page = defineModel<number>('page', { default: 1 });
const perPage = defineModel<number>('perPage', { default: 10 });
const sortBy = defineModel<string>('sortBy');
const sortDirection = defineModel<SortDirection>('sortDirection');
</script>

<template>
    <VTable
        v-model:sort-key="sortBy"
        v-model:sort-direction="sortDirection"
        v-model:page="page"
        v-model:per-page="perPage"
        title="Candidate List"
        :entries="entries"
        :columns="columns"
        :total="total"
        :loading="loading"
    />
</template>
