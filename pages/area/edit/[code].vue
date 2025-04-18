<script setup lang ="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetAreaDetail } from '~/composables/area/queries/useQueryAreaDetail';

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'area-edit',
});

useSeoMeta({
    title: 'Ubah Area',
});

const route = useRoute();
const code = computed(() => route.params.code.toString());

const { mutateAsync: getAreaDetail } = useMutationGetAreaDetail();
const areaDetail = await getAreaDetail(code.value);

const pageStore = usePageStore();
pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
            to: { name: 'area' },
        })
        .setBreadcrumb({
            name: 'Detail',
            to: {
                name: 'area-detail',
                params: {
                    code: code.value,
                },
            },
        })
        .setBreadcrumb({
            name: areaDetail.code,
        })
        .build(),
);
</script>

<template>
    <FormArea
        :data="areaDetail"
        action="update"
    />
</template>
