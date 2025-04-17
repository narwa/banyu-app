<script setup lang="ts">
import type { UserType } from '~/types';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationUserDelete } from '~/composables/user/mutations/useMutationUserDelete';
import { useMutationGetUserDetail } from '~/composables/user/queries/useQueryUserDetail';
import { USER_TYPE_VARIANTS } from '~/constants';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'user-detail',
});

useSeoMeta({
    title: 'User Detail',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'User',
            to: { name: 'user' },
        })
        .setBreadcrumb({
            name: 'User Detail',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { handleArchiveConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getUserDetail } = useMutationGetUserDetail();
const userDetail = await getUserDetail({ userKey: id.value });
queryClient.setQueryData(['userDetail'], userDetail);

const { mutate: deleteUser } = useMutationUserDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Pengguna telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['user-list'],
        });
        navigateTo({ name: 'user' });
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteUser(userDetail.id);
});
</script>

<template>
    <NuxtLayout name="default">
        <template #header-actions>
            <VFlex
                direction="row"
                gap="4"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'user-edit', params: { id: route.params.id } }"
                >
                    Ubah
                    <Icon name="lucide:circle-plus" />
                </VLink>
                <VButton
                    variant="danger"
                    @click="handleDelete"
                >
                    Hapus
                    <Icon name="lucide:trash" />
                </VButton>
            </VFlex>
        </template>
        <VCard>
            <VFlex
                gap-x="2"
                class="border-b pb-4"
            >
                <VAvatar
                    :avatar-src="userDetail.photoProfile"
                    :avatar-fallback="getInitial(userDetail.fullName)"
                    :avatar-alt="`${userDetail.username} photo profile`"
                    root-class="!size-24"
                    fallback-class="!text-xl"
                />
                <VFlex direction="col">
                    <VText
                        as="h4"
                        variant="h4"
                        weight="bold"
                    >
                        {{ userDetail.fullName }}
                    </VText>
                    <VText
                        as="p"
                        variant="base"
                        weight="bold"
                        class="mb-auto"
                    >
                        {{ userDetail.username }}
                    </VText>
                    <VBadge
                        :variant="USER_TYPE_VARIANTS[userDetail.type as UserType]"
                        class="w-max"
                    >
                        {{ userDetail.type }}
                    </VBadge>
                </VFlex>
            </VFlex>
            <VGrid
                type="cols"
                md="2"
                sm="1"
                gap="4"
                class="md:grid-cols-2 sm:grid-cols-1 pt-4"
            >
                <div class="block">
                    <VFlex
                        items="center"
                        class="gap-x-2 mb-4 text-primary"
                    >
                        <Icon
                            name="mdi:clock-outline"
                            size="30"
                        />

                        <VText
                            as="h6"
                            variant="h5"
                            weight="bold"
                            class="text-primary"
                        >
                            Aktifitas
                        </VText>
                    </VFlex>
                    <VFlex
                        direction="col"
                        class="gap-y-2"
                    >
                        <VDescription
                            title="Terakhir Login"
                            title-class="text-secondary"
                        >
                            {{ formatEpochToDateTime(userDetail.lastLogin) }}
                        </VDescription>
                        <VDescription
                            title="Tanggal Dibuat"
                            title-class="text-secondary"
                        >
                            {{ formatEpochToDateTime(userDetail.createdAt) }}
                        </VDescription>
                        <VDescription
                            title="Tanggal Diubah"
                            title-class="text-secondary"
                        >
                            {{ formatEpochToDateTime(userDetail.updatedAt) }}
                        </VDescription>
                    </VFlex>
                </div>
                <div class="block">
                    <VFlex
                        items="center"
                        class="gap-x-2 mb-4 text-primary"
                    >
                        <Icon
                            name="mdi:map-outline"
                            size="30"
                        />

                        <VText
                            as="h6"
                            variant="h5"
                            weight="bold"
                            class="text-primary"
                        >
                            Area
                        </VText>
                    </VFlex>
                    <VFlex
                        direction="col"
                        class="gap-y-2"
                    >
                        <VDescription>
                            <VFlex
                                v-if="userDetail.areas.length > 0"
                                gap-x="2"
                            >
                                <VBadge
                                    v-for="area in userDetail.areas"
                                    :key="area"
                                >
                                    {{ area }}
                                </VBadge>
                            </VFlex>
                            <template v-else>
                                -
                            </template>
                        </VDescription>
                    </VFlex>
                </div>
            </VGrid>
        </VCard>
    </NuxtLayout>
</template>
