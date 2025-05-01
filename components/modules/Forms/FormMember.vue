<script setup lang="ts">
import type { MemberDetailResponse } from '~/models/Member';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useMutationMemberCreate } from '~/composables/member/mutations/useMutationMemberCreate';
import { useMutationMemberUpdate } from '~/composables/member/mutations/useMutationMemberUpdate';
import { MemberDto } from '~/models/dtos/MemberDto';
import { AreaPaginationSearchParams } from '~/models/params/AreaPaginationSearchParams';

const { data, action } = defineProps<{
    data?: MemberDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new MemberDto()
        .setAreaCode(stringOrEmpty(data?.areaCode))
        .setFullname(stringOrEmpty(data?.fullName))
        .setEmail(stringOrEmpty(data?.email))
        .setMobileNumber(stringOrEmpty(data?.mobileNumber)),
    id: stringOrEmpty(data?.id),
});

const params = reactive(new AreaPaginationSearchParams());
const searchCount = shallowRef<number>(0);
const { showNotification } = useNotification();
const { results: areaList, isLoading: isLoadingAreaList } = useQueryAreaList(params, searchCount);
const { mutate: createMember, isPending: isPendingCreateMember } = useMutationMemberCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Member berhasil dibuat - ${data.fullName}`,
        });
        navigateTo({ name: 'member' });
    },
    onMutate: () => {
        toast.info('Tambah konfigurasi umum dalam proses ...');
    },
});

const { mutate: updateMember, isPending: isPendingUpdateMember } = useMutationMemberUpdate(state.id, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Member berhasil diperbarui - ${data.fullName}`,
        });
        navigateTo({ name: 'member' });
    },

    onMutate: () => {
        toast.info('Ubah konfigurasi umum dalam proses ...');
    },
});

const schema = yup.object({
    codeArea: yup.string().required('Kode area harus diisi'),
    fullName: yup.string().required('Nama lengkap harus diisi'),
    email: yup.string().email('Format email tidak valid'),
    mobileNumber: yup.string(),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    const stateMember = () => {
        return new MemberDto()
            .setAreaCode(stringOrEmpty(state.codeArea))
            .setFullname(stringOrEmpty(state.fullName))
            .setEmail(stringOrEmpty(state.email))
            .setMobileNumber(stringOrEmpty(state.mobileNumber));
    };

    if (data) {
        updateMember(stateMember());
        return;
    }

    createMember(stateMember());
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
                <VSelect
                    v-model="state.codeArea"
                    name="codeArea"
                    label="Pilih Kode Area"
                    :options="areaList"
                    value-key="code"
                    label-key="code"
                    placeholder="Mohon pilih kode area"
                    size="lg"
                    required
                    clearable
                    :loading="isLoadingAreaList"
                    :disabled="action === 'update'"
                />
                <VInput
                    v-model="state.fullName"
                    placeholder="Masukan nama lengkap"
                    name="fullName"
                    label="Nama Lengkap"
                    required
                />
                <VInput
                    v-model="state.email"
                    placeholder="example@gmail.com"
                    name="email"
                    label="Email"
                    :required="false"
                    type="email"
                    :disabled="action === 'update'"
                />
                <VInput
                    v-model="state.mobileNumber"
                    placeholder="Masukan no handphone"
                    name="mobileNumber"
                    label="No HP"
                    :required="false"
                    :maska-options="{
                        mask: ['+62 ### #### ####'],
                    }"
                    :disabled="action === 'update'"
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'member' }"
                >
                    Batal
                </VLink>
                <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateMember || isPendingUpdateMember
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
