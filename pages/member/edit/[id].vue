<script setup lang ="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetMemberDetail } from '~/composables/member/queries/useQueryMemberDetail';

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'member-edit',
});

useSeoMeta({
    title: 'Ubah Member',
});

const route = useRoute();
const id = computed(() => route.params.id.toString());

const { mutateAsync: getMemberDetail } = useMutationGetMemberDetail();
const memberDetail = await getMemberDetail(id.value);

const pageStore = usePageStore();
pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Member',
            to: { name: 'member' },
        })
        .setBreadcrumb({
            name: 'Detil',
            to: {
                name: 'member-detail',
                params: {
                    id: id.value,
                },
            },
        })
        .setBreadcrumb({
            name: memberDetail.fullName,
        })
        .build(),
);
</script>

<template>
    <FormMember
        :data="memberDetail"
        action="update"
    />
</template>
