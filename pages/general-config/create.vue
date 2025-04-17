<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Buat Pengguna',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'general-config-create',
});

const pageStore = usePageStore();

pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Konfigurasi Umum',
            to: { name: 'general-config' },
        })
        .setBreadcrumb({
            name: 'Buat Konfigurasi Umum',
        })
        .build(),
);
</script>

<template>
    <FormGeneralConfig action="create" />
</template>
