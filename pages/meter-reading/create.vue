<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Tambah Pembacaan Meteran',
});

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'meter-reading-create',
});

const pageStore = usePageStore();

pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pembacaan Meteran',
            to: { name: 'meter-reading' },
        })
        .setBreadcrumb({
            name: 'Tambah Pembacaan Meteran',
        })
        .build(),
);
</script>

<template>
    <FormMeterReading action="create" />
</template>
