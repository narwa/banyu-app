<script setup lang="ts">
import type { MeterReadingDetailResponse } from '~/models/MeterReading';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { useMutationMeterReadingCreate } from '~/composables/meter-reading/mutations/useMutationMeterReadingCreate';
import { useMutationMeterReadingUpdate } from '~/composables/meter-reading/mutations/useMutationMeterReadingUpdate';
import { MeterReadingDto } from '~/models/dtos/MeterReadingDto';

const { data, action } = defineProps<{
    data?: MeterReadingDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new MeterReadingDto()
        .setMeterNumber(stringOrEmpty(data?.meterNumber))
        .setReadingDate(numberOrZero(data?.readingDate))
        .setPreviousReading(numberOrZero(data?.previousReading))
        .setCurrentReading(numberOrZero(data?.currentReading))
        .setNotes(stringOrEmpty(data?.notes))
        .setVersion(numberOrZero(data?.version)),
    id: stringOrEmpty(data?.id),
});

const { showNotification } = useNotification();
const { mutate: createMeterReading, isPending: isPendingCreateMeterReading } = useMutationMeterReadingCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Pembacaan meteran berhasil dibuat - ${data.meterNumber}`,
        });
        navigateTo({ name: 'meter-reading' });
    },
    onMutate: () => {
        toast.info('Tambah pembacaan meteran dalam proses ...');
    },
});

const { mutate: updateMeterReading, isPending: isPendingUpdateMeterReading } = useMutationMeterReadingUpdate(state.id, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Pembacaan meteran berhasil diperbarui - ${data.meterNumber}`,
        });
        navigateTo({ name: 'meter-reading' });
    },

    onMutate: () => {
        toast.info('Ubah pembacaan meteran dalam proses ...');
    },
});

const schema = yup.object({
    meterNumber: yup.string().required('Kode harus diisi'),
    readingDate: yup.date().required('Tanggal pembacaan harus diisi'),
    previousReading: yup.number().typeError('Bacaan sebelum harus angka').required('Bacaan sebelum harus diisi'),
    currentReading: yup.number().typeError('Bacaan saat ini harus angka').required('Bacaan saat ini harus diisi'),
    notes: yup.string(),
    version: yup.string(),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    const stateMeterReading = () => {
        return new MeterReadingDto()
            .setMeterNumber(stringOrEmpty(state.meterNumber))
            .setReadingDate(numberOrZero(formatDateToEpoch(state.readingDate)))
            .setPreviousReading(numberOrZero(state.previousReading))
            .setCurrentReading(numberOrZero(state.currentReading))
            .setNotes(stringOrEmpty(state.notes))
            .setVersion(numberOrZero(state.version));
    };

    if (data) {
        updateMeterReading(stateMeterReading());
        return;
    }

    createMeterReading(stateMeterReading());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Pembacaan Meteran"
            class="h-full"
        >
            <VFlex
                direction="col"
                gap="4"
            >
                <VInput
                    v-model="state.meterNumber"
                    placeholder="Masukan No Meter"
                    name="meterNumber"
                    label="No Meter"
                    required
                    :disabled="action === 'update'"
                />
                <VInputDate
                    v-model="state.readingDate"
                    placeholder="Masukan Tanggal Pembacaan"
                    name="readingDate"
                    label="Tanggal Pembacaan"
                    required
                />
                <VInput
                    v-model="state.previousReading"
                    placeholder="Masukan Bacaan Sebelum"
                    name="previousReading"
                    label="Bacaan Sebelum"
                    type="number"
                    min="0"
                    required
                />
                <VInput
                    v-model="state.currentReading"
                    placeholder="Masukan Bacaan Saat Ini"
                    name="currentReading"
                    label="Bacaan Saat Ini"
                    type="number"
                    min="0"
                    required
                />
                <VTextarea
                    v-model="state.notes"
                    placeholder="Masukan Catatan"
                    name="notes"
                    label="Catatan"
                />
                <VInput
                    v-if="action === 'update'"
                    v-model="state.version"
                    placeholder="Masukan Versi"
                    name="version"
                    label="Versi"
                    type="number"
                    required
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'meter-reading' }"
                >
                    Batal
                </VLink>
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateMeterReading || isPendingUpdateMeterReading
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
