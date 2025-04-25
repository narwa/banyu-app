<script setup lang="ts">
import { toast } from 'vue-sonner';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationMeterReadingDelete } from '~/composables/meter-reading/mutations/useMutationMeterReadingDelete';
import { useMutationGetMeterReadingDetail } from '~/composables/meter-reading/queries/useQueryMeterReadingDetail';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'meter-reading-detail',
});

useSeoMeta({
    title: 'Detil Pembacaan Meteran',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Pembacaan Meteran',
            to: { name: 'meter-reading' },
        })
        .setBreadcrumb({
            name: 'Pembacaan Meteran Detil',
        })
        .build(),
);

const id = computed(() => route.params.id.toString());
pageStore.setTitle('');

const { handleArchiveConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getMeterReadingDetail } = useMutationGetMeterReadingDetail();
const meterReadingDetail = await getMeterReadingDetail({ id: id.value });
queryClient.setQueryData(['meter-reading-detail'], meterReadingDetail);

const { mutate: deleteMeterReading } = useMutationMeterReadingDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Pembacaan meteran telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['meter-reading-list'],
        });
        navigateTo({ name: 'meter-reading' });
    },
    onMutate: () => {
        toast.info('Hapus pembacaan meteran dalam proses ...');
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteMeterReading(meterReadingDetail.id);
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
                    :to="{ name: 'meter-reading-edit', params: { id: route.params.id } }"
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
        <VCard title="Pembacaan Meteran Detil">
            <!-- <VGrid
                type="cols"
                sm="3"
                class="grid-cols-3"
            >
                <VDescription
                    title="Kode"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.code, '-') }}
                </VDescription>
                <VDescription
                    title="Tipe Data"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.dataType, '-') }}
                </VDescription>
                <VDescription
                    title="Nilai"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.value, '-') }}
                </VDescription>
            </VGrid> -->
        </VCard>
    </NuxtLayout>
</template>
