<script setup lang="ts">
import { toast } from 'vue-sonner';

import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationMeterReadingCalculateById } from '~/composables/meter-reading/mutations/useMutationMeterReadingCalculateById';
import { useMutationGetMeterReadingDetail } from '~/composables/meter-reading/queries/useQueryMeterReadingDetail';
import { METER_READING_STATUS, METER_READING_STATUS_VARIANTS, MONTH } from '~/constants';
import { MeterReadingDto } from '~/models/dtos/MeterReadingDto';

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

const { handleCustomConfirmation } = useDialog();
const { showNotification } = useNotification();
const queryClient = useQueryClient();
const { mutateAsync: getMeterReadingDetail } = useMutationGetMeterReadingDetail();
const meterReadingDetail = await getMeterReadingDetail({ id: id.value });
queryClient.setQueryData(['meter-reading-detail'], meterReadingDetail);

const { mutate: calculateMeterReading } = useMutationMeterReadingCalculateById(id, {
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Kalkulasi berhasil!',
            message: 'Kalkulasi telah dihapus',
        });
        queryClient.invalidateQueries({
            queryKey: ['meter-reading-detail'],
        });
        navigateTo({ name: 'meter-reading' });
    },
    onMutate: () => {
        toast.info('Kalkulasi pembecaan meteran dalam proses ...');
    },
});

const handleCalculate = handleCustomConfirmation({
    title: 'Kalkukasi item ini',
    message: 'Apakah Anda yakin ingin mengkalkulasi item ini?',
    confirmText: 'Ya Kalkulasi',
    icon: 'lucide:calculator',
    confirmVariant: 'primary',
    classHeadingIcon: 'bg-primary-100 text-primary-600 dark:text-primary-600',
}, async () => {
    calculateMeterReading(new MeterReadingDto().setVersion(meterReadingDetail.version + 1));
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
                    variant="info"
                    @click="handleCalculate"
                >
                    Kalkulasi
                    <Icon name="lucide:calculator" />
                </VButton>
            </VFlex>
        </template>
        <VCard title="Pembacaan Meteran Detil">
            <VGrid
                type="cols"
                md="3"
                sm="1"
                gap="4"
                class="md:grid-cols-3 sm:grid-cols-1"
            >
                <VDescription
                    title="No Meter"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.meterNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Kode Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.areaCode, '-') }}
                </VDescription>
                <VDescription
                    title="Deskripsi Area"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.areaDescription, '-') }}
                </VDescription>
                <VDescription
                    title="Nama Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.memberFullName, '-') }}
                </VDescription>
                <VDescription
                    title="Email Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.memberEmail, '-') }}
                </VDescription>
                <VDescription
                    title="No HP Member"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.memberMobileNumber, '-') }}
                </VDescription>
                <VDescription
                    title="Tanggal Pembacaan"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(meterReadingDetail.readingDate) }}
                </VDescription>
                <VDescription
                    title="Bacaan Sebelumnya"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(meterReadingDetail.previousReading, { maximumFractionDigits: 0 }) }}
                </VDescription>
                <VDescription
                    title="Bacaan Saat Ini"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(meterReadingDetail.currentReading, { maximumFractionDigits: 0 }) }}
                </VDescription>
                <VDescription
                    title="Konsumsi"
                    title-class="text-secondary"
                >
                    {{ formatCurrency(meterReadingDetail.consumption, { maximumFractionDigits: 0 }) }}
                </VDescription>
                <VDescription
                    title="Tahun"
                    title-class="text-secondary"
                >
                    {{ meterReadingDetail.year }}
                </VDescription>
                <VDescription
                    title="Bulan"
                    title-class="text-secondary"
                >
                    {{ MONTH[meterReadingDetail.month - 1].label }}
                </VDescription>
                <VDescription
                    title="Catatan"
                    title-class="text-secondary"
                >
                    {{ stringOrFallback(meterReadingDetail.notes, '-') }}
                </VDescription>
                <VDescription
                    title="Status"
                    title-class="text-secondary"
                >
                    <VBadge
                        :variant="
                            METER_READING_STATUS_VARIANTS[meterReadingDetail.status]
                        "
                    >
                        {{ METER_READING_STATUS[meterReadingDetail.status] }}
                    </VBadge>
                </VDescription>
                <VDescription
                    title="Tanggal Diubah"
                    title-class="text-secondary"
                >
                    {{ formatEpochToDate(meterReadingDetail.lastModifiedDate) }}
                </VDescription>
            </VGrid>
        </VCard>
    </NuxtLayout>
</template>
