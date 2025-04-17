<script setup lang="ts">
import type { UserListResponse } from '~/models/User';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VBadge from '~/components/base/VBadge/VBadge.vue';
import VLink from '~/components/base/VLink/VLink.vue';
import VText from '~/components/base/VText/VText.vue';
import { useQueryUserList } from '~/composables/user/queries/useQueryUserList';
import { USER_TYPE_VARIANTS } from '~/constants';
import { UserPaginationSearchParams } from '~/models/params/UserPaginationSearchParams';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'user',
});

useSeoMeta({
    title: 'User',
});

const pageStore = usePageStore();
pageStore.setTitle('');

pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'User',
        })
        .build(),
);

const params = reactive(new UserPaginationSearchParams());
const search = reactive({
    count: 0,
    fullName: '',
});

const { results, total, isLoading } = useQueryUserList(params, search.count);

const columns = computed(() =>
    new TableColumnBuilder<UserListResponse>()
        .setColumn({
            key: 'fullName',
            sortKey: 'fullName',
            name: 'User Name',
            render: row => h(VLink, {
                variant: 'unstyled',
                class: 'text-gold-500 hover:underline underline-offset-4 decoration-transparent hover:decoration-gold-500 transition-colors duration-300',
                to: { name: 'user-detail', params: { id: row.id } },
            }, () => truncateString(row.fullName, 20)),
        })
        .setColumn({
            key: 'username',
            sortKey: 'username',
            name: 'Username',
        })
        .setColumn({
            key: 'type',
            sortKey: 'type',
            name: 'Tipe User',
            render: row => h(VBadge, {
                variant: USER_TYPE_VARIANTS[row.type],
            }, () => row.type),
        })
        .setColumn({
            key: 'lastLogin',
            sortKey: 'lastLogin',
            name: 'Terakhir Login',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDateTime(row.lastLogin)),
        })
        .setColumn({
            key: 'createdAt',
            sortKey: 'createdAt',
            name: 'Tanggal Dibuat',
            render: row => h(VText, {
                as: 'p',
                variant: 'base',
            }, () => formatEpochToDateTime(row.createdAt)),
        })
        .build(),
);

const handleSearch = () => {
    params.setFullName(search.fullName)
        .setFirstPage();
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
                        id="userFullName"
                        v-model="search.fullName"
                        name="userFullName"
                        type="text"
                        size="md"
                        placeholder="Search user name ..."
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
                <VLink
                    variant="primary"
                    :to="{ name: 'user-create' }"
                >
                    Tambah User
                    <Icon name="lucide:circle-plus" />
                </VLink>
            </VFlex>
        </template>

        <VTable
            v-model:sort-key="params.sort"
            v-model:sort-direction="params.direction"
            v-model:page="params.page"
            v-model:per-page="params.size"
            title="User"
            :entries="results"
            :columns="columns"
            :total="total"
            :loading="isLoading"
        />
    </NuxtLayout>
</template>
