<script setup lang="ts">
import type { MemberListResponse } from '~/models/Member';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';

import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import { useQueryMemberList } from '~/composables/member/queries/useQueryMemberList';
import { PaginationSearchParam } from '~/models/params/PaginationSearchParam';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'member',
});

useSeoMeta({
    title: 'Member',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Member',
        })
        .build(),
);

const params = reactive(new PaginationSearchParam());
const search = reactive({
    count: 0,
    fullName: '',
});

const { results, total, isLoading } = useQueryMemberList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<MemberListResponse>()
        .setColumn({
            key: 'areaCode',
            sortKey: 'areaCode',
            name: 'Kode Area',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-gold-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'member-detail', params: { id: row.id } },
            }, () => truncateString(row.areaCode, 20)),
        })
        .setColumn({
            key: 'meterNumber',
            sortKey: 'meterNumber',
            name: 'No Meter',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.meterNumber, '-')),
        })
        .setColumn({
            key: 'areaDescription',
            sortKey: 'areaDescription',
            name: 'Deskripsi Area',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.areaDescription, '-')),
        })
        .setColumn({
            key: 'fullName',
            sortKey: 'fullName',
            name: 'Nama Lengkap',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.fullName, '-')),
        })
        .setColumn({
            key: 'email',
            sortKey: 'email',
            name: 'Email',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.email, '-')),
        })
        .setColumn({
            key: 'mobileNumber',
            sortKey: 'mobileNumber',
            name: 'No HP',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => stringOrFallback(row.mobileNumber, '-')),
        })
        .build(),
);

const handleSearch = () => {
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
                        id="fullName"
                        v-model="search.fullName"
                        name="fullName"
                        type="text"
                        size="md"
                        placeholder="Cari nama lengkap..."
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

                <NuxtLink to="/member/create">
                    <VButton
                        variant="primary"
                        size="md"
                    >
                        Tambah Member
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
            title="Member"
            :entries="results"
            :columns="columns"
            :total="total"
            :loading="isLoading"
        />
    </NuxtLayout>
</template>
