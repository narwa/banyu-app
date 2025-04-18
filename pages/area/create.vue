<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Tambah Area',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'area-create',
});

const pageStore = usePageStore();

pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
            to: { name: 'area' },
        })
        .setBreadcrumb({
            name: 'Tambah Area',
        })
        .build(),
);
</script>

<template>
    <FormArea action="create" />
</template>
