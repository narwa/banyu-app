<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Tambah Pengguna',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'user-create',
});

const pageStore = usePageStore();

pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pengguna',
            to: { name: 'user' },
        })
        .setBreadcrumb({
            name: 'Tambah Pengguna',
        })
        .build(),
);
</script>

<template>
    <FormUser action="create" />
</template>
