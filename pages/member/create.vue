<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Tambah Member',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'member-create',
});

const pageStore = usePageStore();

pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Member',
            to: { name: 'member' },
        })
        .setBreadcrumb({
            name: 'Tambah Member',
        })
        .build(),
);
</script>

<template>
    <FormMember action="create" />
</template>
