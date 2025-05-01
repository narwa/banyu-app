<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useMutationMeterReadingCalculate } from '~/composables/meter-reading/mutations/useMutationMeterReadingCalculate';
import { MONTH } from '~/constants';
import { MeterReadingCalculateDto } from '~/models/dtos/MeterReadingCalculateDto';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';

const emits = defineEmits<{
    submit: [];
}>();

const state = reactive({
    ...new MeterReadingCalculateDto()
        .setAreaCode('')
        .setMonth(new Date().getMonth())
        .setYear(new Date().getFullYear()),
});

const { showNotification } = useNotification();
const params = reactive(new AreaPaginationSearchParams());
const searchCount = shallowRef<number>(0);
const { results: areaList, isLoading: isLoadingAreaList } = useQueryAreaList(params, searchCount);

const { mutate: calculateMeterReading, isPending: isPendingCalculateMeterReading } = useMutationMeterReadingCalculate({
    onSuccess: () => {
        showNotification({
            type: 'success',
            title: 'Kalkulasi pembacaan meteran selesai',
            message: `Kalkulasi pembacaan meteran berhasil diperbarui`,
        });
        emits('submit');
    },

    onMutate: () => {
        toast.info('Ubah pembacaan meteran dalam proses ...');
    },
});

const schema = yup.object({
    areaCode: yup.string().required('Kode area harus diisi'),
    month: yup.number().typeError('Bulan harus angka').required('Bulan harus diisi'),
    year: yup.number().typeError('Tahun harus angka').required('Tahun harus diisi'),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    calculateMeterReading(new MeterReadingCalculateDto().setAreaCode(state.areaCode).setYear(state.year).setMonth(state.month));
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VFlex
            direction="col"
            gap="4"
        >
            <VSelect
                v-model="state.areaCode"
                name="areaCode"
                label="Pilih Kode Area"
                :options="areaList"
                value-key="code"
                label-key="code"
                placeholder="Mohon pilih kode area"
                size="lg"
                required
                clearable
                :loading="isLoadingAreaList"
            />
            <VSelect
                v-model:model-value="state.year"
                name="year"
                label="Pilih Tahun"
                :options="generateYears()"
                placeholder="Mohon pilih tahun"
                value-key="value"
                label-key="label"
                size="lg"
                clearable
                required
            />
            <VSelect
                v-model:model-value="state.month"
                name="month"
                label="Pilih Bulan"
                :options="MONTH"
                placeholder="Mohon pilih bulan"
                value-key="value"
                label-key="label"
                size="lg"
                clearable
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
                :loading="isPendingCalculateMeterReading"
                :disabled="isPendingCalculateMeterReading"
            >
                Simpan
                <Icon name="lucide:save" />
            </VButton>
        </VFlex>
    </form>
</template>
