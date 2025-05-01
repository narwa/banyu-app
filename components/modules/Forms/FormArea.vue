<script setup lang="ts">
import type { AreaDetailResponse, Rate } from '~/models/Area';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { TableColumnBuilder } from '~/builders/TableColumnBuilder';
import VInput from '~/components/base/VInput/VInput.vue';
import { useMutationAreaCreate } from '~/composables/area/mutations/useMutationAreaCreate';
import { useMutationAreaUpdate } from '~/composables/area/mutations/useMutationAreaUpdate';
import { AreaDto } from '~/models/dtos/AreaDto';

const { data, action } = defineProps<{
    data?: AreaDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new AreaDto()
        .setCode(stringOrEmpty(data?.code))
        .setDescription(stringOrEmpty(data?.description))
        .setRates(isArrayEmpty(data?.rates)),
    code: stringOrEmpty(data?.code),
});

const { showNotification } = useNotification();
const { mutate: createArea, isPending: isPendingCreateArea } = useMutationAreaCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Area berhasil dibuat - ${data.code}`,
        });
        navigateTo({ name: 'area' });
    },
    onMutate: () => {
        toast.info('Tambah area dalam proses ...');
    },
});

const { mutate: updateArea, isPending: isPendingUpdateArea } = useMutationAreaUpdate(state.code, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Area berhasil diperbarui - ${data.code}`,
        });
        navigateTo({ name: 'area' });
    },

    onMutate: () => {
        toast.info('Ubah area dalam proses ...');
    },
});

const schema = yup.object({
    code: yup.string().required('Kode harus diisi'),
    description: yup.string().required('Deskripsi harus diisi'),
    rates: yup.array().of(yup.object({
        tierStart: yup.number().typeError('Tingkat awal harus angka').min(1, 'Tingkat awal tidak boleh kurang dari 1').required('Tingkat awal harus diisi'),
        tierEnd: yup.number().typeError('Tingkat akhir harus angka').min(1, 'Tingkat akhir tidak boleh kurang dari 1').required('Tingkat akhir harus diisi'),
        ratePerUnit: yup.number().typeError('Tarif per unit harus angka').min(1, 'Tarif per unit tidak boleh kurang dari 1').required('Tarif per unit harus diisi'),
    })).required('Tarif harus diisi'),
});

const columns = computed(() =>
    new TableColumnBuilder<Rate>()
        .setColumn({
            key: 'tierStart',
            sortKey: 'tierStart',
            name: 'Tingkat Awal',
            render: (row, index) => h(VInput, {
                modelValue: row.tierStart,
                type: 'number',
                name: `rates[${index}].tierStart`,
                onChange: (val) => {
                    state.rates[index].tierStart = Number.parseInt(val);
                },
            }),
        })
        .setColumn({
            key: 'tierEnd',
            sortKey: 'tierEnd',
            name: 'Tingkat Akhir',
            render: (row, index) => h(VInput, {
                modelValue: row.tierEnd,
                type: 'number',
                name: `rates[${index}].tierEnd`,
                onChange: (val) => {
                    state.rates[index].tierEnd = Number.parseInt(val);
                },
            }),
        })
        .setColumn({
            key: 'ratePerUnit',
            sortKey: 'ratePerUnit',
            name: 'Tarif per unit',
            render: (row, index) => h(VInput, {
                modelValue: row.ratePerUnit,
                type: 'number',
                name: `rates[${index}].ratePerUnit`,
                onChange: (val) => {
                    state.rates[index].ratePerUnit = Number.parseInt(val);
                },
            }),
        })
        .build(),
);

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const addRate = () => {
    state.rates.push({
        tierStart: 0,
        tierEnd: 0,
        ratePerUnit: 0,
    });
};

const onSubmit = handleSubmit(async () => {
    const stateArea = () => {
        return new AreaDto()
            .setCode(stringOrEmpty(state.code))
            .setDescription(stringOrEmpty(state.description))
            .setRates(isArrayEmpty(state.rates));
    };

    if (data) {
        updateArea(stateArea());
        return;
    }

    createArea(stateArea());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Area"
            class="h-full"
        >
            <VFlex
                direction="col"
                gap="4"
            >
                <VInput
                    v-model="state.code"
                    placeholder="Masukan Kode"
                    name="code"
                    label="Kode"
                    required
                    class="max-w-md"
                    :disabled="action === 'update'"
                />
                <VInput
                    v-model="state.description"
                    placeholder="Masukan Deskripsi"
                    name="description"
                    label="Deskripsi"
                    required
                    class="max-w-md"
                />
            </VFlex>
            <VTable
                :columns="columns"
                :entries="state.rates"
                :cardable="false"
                :hide-header="true"
                :hide-footer="true"
                :sortable="false"
                class="mt-8"
            >
                <template #headerExtra>
                    <VFlex
                        justify="end"
                        class="mb-2"
                    >
                        <VButton
                            variant="secondary"
                            type="button"
                            @click="addRate"
                        >
                            Tambah Tarif
                            <Icon name="lucide:circle-plus" />
                        </VButton>
                    </VFlex>
                </template>
            </VTable>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'area' }"
                >
                    Batal
                </VLink>
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateArea || isPendingUpdateArea
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
