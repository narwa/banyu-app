<script setup lang ="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetMeterReadingDetail } from '~/composables/meter-reading/queries/useQueryMeterReadingDetail';

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'meter-reading-edit',
});

useSeoMeta({
    title: 'Ubah Pembacaan Meteran',
});

const route = useRoute();
const id = computed(() => route.params.id.toString());

const { mutateAsync: getMeterReadingDetail } = useMutationGetMeterReadingDetail();
const meterReadingDetail = await getMeterReadingDetail({ id: id.value });

const pageStore = usePageStore();
pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pembacaan Meteran',
            to: { name: 'meter-reading' },
        })
        .setBreadcrumb({
            name: 'Detil',
            to: {
                name: 'meter-reading-detail',
                params: {
                    id: id.value,
                },
            },
        })
        .setBreadcrumb({
            name: meterReadingDetail.meterNumber,
        })
        .build(),
);
</script>

<template>
    <FormMeterReading
        :data="meterReadingDetail"
        action="update"
    />
</template>
