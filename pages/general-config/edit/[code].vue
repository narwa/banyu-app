<script setup lang ="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetGeneralConfigDetail } from '~/composables/general-config/queries/useQueryGeneralConfigDetail';

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'general-config-edit',
});

useSeoMeta({
    title: 'Ubah Konfigurasi Umum',
});

const route = useRoute();
const code = computed(() => route.params.code.toString());

const { mutateAsync: getGeneralConfigDetail } = useMutationGetGeneralConfigDetail();
const generalConfigDetail = await getGeneralConfigDetail({ code: code.value });

const pageStore = usePageStore();
pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Konfigurasi Umum',
            to: { name: 'general-config' },
        })
        .setBreadcrumb({
            name: 'Detil',
            to: {
                name: 'general-config-detail',
                params: {
                    code: code.value,
                },
            },
        })
        .setBreadcrumb({
            name: generalConfigDetail.code,
        })
        .build(),
);
</script>

<template>
    <FormGeneralConfig
        :data="generalConfigDetail"
        action="update"
    />
</template>
