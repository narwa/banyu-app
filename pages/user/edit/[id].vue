<script setup lang ="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetUserDetail } from '~/composables/user/queries/useQueryUserDetail';

definePageMeta({
    middleware: ['auth', 'super-admin'],
    name: 'user-edit',
});

useSeoMeta({
    title: 'Update User',
});

const route = useRoute();
const id = computed(() => route.params.id.toString());

const { mutateAsync: getUserDetail } = useMutationGetUserDetail();
const userDetail = await getUserDetail({ userKey: id.value });

const pageStore = usePageStore();
pageStore.setTitle('');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'User',
            to: { name: 'user' },
        })
        .setBreadcrumb({
            name: 'Detail',
            to: {
                name: 'user-detail',
                params: {
                    id: id.value,
                },
            },
        })
        .setBreadcrumb({
            name: userDetail.fullName,
        })
        .build(),
);
</script>

<template>
    <FormUser
        :data="userDetail"
        action="update"
    />
</template>
