<script setup lang="ts">
import { toast } from 'vue-sonner';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGeneralConfigDelete } from '~/composables/general-config/mutations/useMutationGeneralConfigDelete';
import { useMutationGetGeneralConfigDetail } from '~/composables/general-config/queries/useQueryGeneralConfigDetail';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'general-config-detail',
});

useSeoMeta({
    title: 'Detil Konfigurasi Umum',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Konfigurasi Umum',
            to: { name: 'general-config' },
        })
        .setBreadcrumb({
            name: 'Konfigurasi Umum Detil',
        })
        .build(),
);

const code = computed(() => route.params.code.toString());
pageStore.setTitle('');

const { handleArchiveConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getGeneralConfigDetail } = useMutationGetGeneralConfigDetail();
const generalConfigDetail = await getGeneralConfigDetail({ code: code.value });
queryClient.setQueryData(['general-config-detail'], generalConfigDetail);

const { mutate: deleteGeneralConfig } = useMutationGeneralConfigDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Konfigurasi umum telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['general-config-list'],
        });
        navigateTo({ name: 'general-config' });
    },
    onMutate: () => {
        toast.info('Hapus konfigurasi umum dalam proses ...');
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteGeneralConfig(generalConfigDetail.code);
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
                    :to="{ name: 'general-config-edit', params: { code: route.params.code } }"
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
        <VCard title="Konfigurasi Umum Detil">
            <VGrid
                type="cols"
                sm="3"
                class="grid-cols-3"
            >
                <VDescription
                    title="Kode"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(generalConfigDetail.code, '-') }}
                </VDescription>
                <VDescription
                    title="Tipe Data"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(generalConfigDetail.dataType, '-') }}
                </VDescription>
                <VDescription
                    title="Nilai"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(generalConfigDetail.value, '-') }}
                </VDescription>
            </VGrid>
        </VCard>
    </NuxtLayout>
</template>
