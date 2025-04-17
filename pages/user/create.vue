<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Create User',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'user-create',
});

const pageStore = usePageStore();

pageStore.setTitle('Buat User');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'User',
            to: { name: 'user' },
        })
        .setBreadcrumb({
            name: 'Buat User',
        })
        .build(),
);
</script>

<template>
    <FormUser action="create" />
</template>
