<script setup lang="ts">
import type { GeneralConfigDetail } from '~/models/GeneralConfig';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { useMutationGeneralConfigCreate } from '~/composables/general-config/mutations/useMutationGeneralConfigCreate';
import { useMutationGeneralConfigUpdate } from '~/composables/general-config/mutations/useMutationGeneralConfigUpdate';
import { GeneralConfigDto } from '~/models/dtos/GeneralConfigDto';

const { data, action } = defineProps<{
    data?: GeneralConfigDetail;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new GeneralConfigDto()
        .setCode(stringOrEmpty(data?.code))
        .setDataType(stringOrEmpty(data?.dataType))
        .setValue(stringOrEmpty(data?.value)),
    code: stringOrEmpty(data?.code),
});

const { showNotification } = useNotification();
const { mutate: createGeneralConfig, isPending: isPendingCreateGeneralConfig } = useMutationGeneralConfigCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Konfigurasi umum berhasil dibuat - ${data.code}`,
        });
        navigateTo({ name: 'general-config' });
    },
    onMutate: () => {
        toast.info('Buat konfigurasi umum dalam proses ...');
    },
});

const { mutate: updateGeneralConfig, isPending: isPendingUpdateGeneralConfig } = useMutationGeneralConfigUpdate(state.code, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Konfigurasi umum berhasil diperbarui - ${data.code}`,
        });
        navigateTo({ name: 'general-config' });
    },

    onMutate: () => {
        toast.info('Ubah konfigurasi umum dalam proses ...');
    },
});

const schema = yup.object({
    code: yup.string().required('Kode harus diisi'),
    dataType: yup.string().required('Tipe data harus diisi'),
    value: yup.string().required('Nilai harus diisi'),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    const stateGeneralConfig = () => {
        return new GeneralConfigDto()
            .setCode(stringOrEmpty(state.code))
            .setDataType(stringOrEmpty(state.dataType))
            .setValue(stringOrEmpty(state.value));
    };

    if (data) {
        updateGeneralConfig(stateGeneralConfig());
        return;
    }

    await createGeneralConfig(stateGeneralConfig());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Konfigurasi Umum"
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
                    :disabled="action === 'update'"
                />
                <VInput
                    v-model="state.dataType"
                    placeholder="Masukan Tipe data"
                    name="dataType"
                    label="Tipe Data"
                    required
                />
                <VInput
                    v-model="state.value"
                    placeholder="Masukan Nilai"
                    name="value"
                    label="Nilai"
                    required
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateGeneralConfig || isPendingUpdateGeneralConfig
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
                <VLink
                    variant="secondary"
                    class="w-36"
                    :to="{ name: 'general-config' }"
                >
                    Cancel
                </VLink>
            </VFlex>
        </VCard>
    </form>
</template>
