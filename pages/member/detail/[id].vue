<script setup lang="ts">
import { toast } from 'vue-sonner';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationMemberDelete } from '~/composables/member/mutations/useMutationMemberDelete';
import { useMutationGetMemberDetail } from '~/composables/member/queries/useQueryMemberDetail';
import { STATUS_VARIANTS } from '../../../constants/GeneralConstant';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'member-detail',
});

useSeoMeta({
    title: 'Detil member',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Member',
            to: { name: 'member' },
        })
        .setBreadcrumb({
            name: 'Member Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { handleArchiveConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getMemberDetail } = useMutationGetMemberDetail();
const memberDetail = await getMemberDetail(id.value);
queryClient.setQueryData(['member-detail'], memberDetail);

const { mutate: deleteMember } = useMutationMemberDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Member telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['member-list'],
        });
        navigateTo({ name: 'member' });
    },
    onMutate: () => {
        toast.info('Hapus member dalam proses ...');
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteMember(memberDetail.id);
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
                    :to="{ name: 'member-edit', params: { code: route.params.code } }"
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
        <VCard title="Member Detil">
            <VGrid
                type="cols"
                sm="3"
                gap="2"
                class="grid-cols-3"
            >
                <VDescription
                    title="No Meter"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.meterNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Deskripsi Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.areaDescription, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Lengkap"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.fullName, '-') }}
                </VDescription>
                <VDescription
                    title="Email"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.email, '-') }}
                </VDescription>
                <VDescription
                    title="No HP"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(memberDetail.mobileNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Tanggal Instalasi"
                    title-class="text-secondary"
                >
                    {{
                        formatEpochToDate(
                            memberDetail.meterInstallationDate,
                        )
                    }}
                </VDescription>
                <VDescription
                    title="Terakhir Diubah"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(memberDetail.lastModifiedDate) }}
                </VDescription>
                <VDescription
                    title="Status"
                    title-class="text-secondary"
                >
                    <VBadge
                        :variant="STATUS_VARIANTS[memberDetail.meterStatus]"
                        class="w-max"
                    >
                        {{ memberDetail.meterStatus }}
                    </VBadge>
                </VDescription>
            </VGrid>
        </VCard>
    </NuxtLayout>
</template>
