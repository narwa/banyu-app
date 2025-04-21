<script setup lang="ts">
import type { Rate } from '~/models/Area';
import { toast } from 'vue-sonner';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import { useMutationAreaDelete } from '~/composables/area/mutations/useMutationAreaDelete';
import { useMutationGetAreaDetail } from '~/composables/area/queries/useQueryAreaDetail';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'area-detail',
});

useSeoMeta({
    title: 'Area Detil',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
            to: '/area',
        })
        .setBreadcrumb({
            name: 'Area Detil',
        })
        .build(),
);

const code = computed(() => route.params.code.toString());
pageStore.setTitle('');

const queryClient = useQueryClient();
const { mutateAsync: getAreaDetail } = useMutationGetAreaDetail();
const areaDetail = await getAreaDetail(code.value);
queryClient.setQueryData(['area-detail'], areaDetail);
const { handleArchiveConfirmation } = useDialog();
const { showNotification } = useNotification();

const columns = computed(() =>
    new TableColumnBuilder<Rate>()
        .setColumn({
            key: 'tierStart',
            sortKey: 'tierStart',
            name: 'Tingkat Awal',
        })
        .setColumn({
            key: 'tierEnd',
            sortKey: 'tierEnd',
            name: 'Tingkat Akhir',
        })
        .setColumn({
            key: 'ratePerUnit',
            sortKey: 'ratePerUnit',
            name: 'Tarif per unit',
        })
        .build(),
);

// Delete area mutation
const { mutateAsync: deleteArea } = useMutationAreaDelete({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Hapus berhasil!',
            message: 'Area telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['area-list'],
        });
        navigateTo({ name: 'area' });
    },
    onMutate: () => {
        toast.info('Hapus area dalam proses ...');
    },
});

const handleDelete = handleArchiveConfirmation(async () => {
    deleteArea(areaDetail.code);
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
                    :to="{ name: 'area-edit', params: { code: route.params.code } }"
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
        <VCard title="Area Detil">
            <VGrid
                type="cols"
                sm="3"
                class="grid-cols-3"
            >
                <VDescription
                    title="Kode"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(areaDetail.code, '-') }}
                </VDescription>
                <VDescription
                    title="Deskripsi"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(areaDetail.description, '-') }}
                </VDescription>
            </VGrid>
            <VTable
                :columns="columns"
                :entries="areaDetail.rates"
                :cardable="false"
                :hide-header="true"
                :hide-footer="true"
                :sortable="false"
                class="mt-8"
            />
        </VCard>
    </NuxtLayout>
</template>
