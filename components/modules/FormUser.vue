<script setup lang="ts">
import type { UserDetailResponse } from '~/models/User';
import { useForm } from 'vee-validate';
import { toast } from 'vue-sonner';
import * as yup from 'yup';
import { useQueryAreaList } from '~/composables/area/queries/useQueryAreaList';
import { useMutationUserCreate } from '~/composables/user/mutations/useMutationUserCreate';
import { useMutationUserUpdate } from '~/composables/user/mutations/useMutationUserUpdate';
import { USER_TYPE } from '~/constants';
import { UserDto } from '~/models/dtos/UserDto';
import { PaginationSearchParam } from '~/models/params/PaginationSearchParam';

const { data, action } = defineProps<{
    data?: UserDetailResponse;
    action?: 'create' | 'update';
}>();

const state = reactive({
    ...new UserDto()
        .setUsername(stringOrEmpty(data?.username))
        .setFullName(stringOrEmpty(data?.fullName))
        .setUserType(valueOrFallback(USER_TYPE.GUEST, data?.type))
        .setAreas(isArrayEmpty(data?.areas)),
    id: stringOrEmpty(data?.id),
});

const { showNotification } = useNotification();
const { mutate: createUser, isPending: isPendingCreateUser } = useMutationUserCreate({
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Dibuat',
            message: `Pengguna berhasil dibuat - ${data.username}`,
        });
        navigateTo({ name: 'user' });
    },
    onMutate: () => {
        toast.info('Tambah pengguna dalam proses ...');
    },
});

const { mutate: updateUser, isPending: isPendingUpdateUser } = useMutationUserUpdate(state.id, {
    onSuccess: (data) => {
        showNotification({
            type: 'success',
            title: 'Sukses Diperbarui',
            message: `Pengguna berhasi diperbarui - ${data.username}`,
        });
        navigateTo({ name: 'user' });
    },

    onMutate: () => {
        toast.info('Ubah pengguna dalam proses ...');
    },
});

const params = reactive(new PaginationSearchParam());
const searchCount = shallowRef<number>(0);
const { values: areaList } = useQueryAreaList(params, searchCount);
const userTypeList = Object.values(USER_TYPE);

const schema = yup.object({
    username: yup.string().email('Format email tidak valid').required('Username harus diisi'),
    fullName: yup.string().required('Nama lengkap harus diisi'),
    type: yup.string()
        .oneOf([
            USER_TYPE.SUPER_ADMIN,
            USER_TYPE.ADMIN,
            USER_TYPE.MEMBER,
            USER_TYPE.GUEST,
        ])
        .required('Tipe pengguna harus diisi'),
    areas: yup
        .array()
        .of(yup.string())
        .required('Area wajib diisi')
        .min(1, 'Area harus minimal 1 kode'),
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(schema),
});

const onSubmit = handleSubmit(async () => {
    const stateUser = () => {
        return new UserDto()
            .setUsername(stringOrEmpty(state.username))
            .setFullName(stringOrEmpty(state.fullName))
            .setUserType(valueOrFallback(USER_TYPE.GUEST, state.userType))
            .setAreas(isArrayEmpty(state.areas));
    };

    if (data) {
        updateUser(stateUser());
        return;
    }

    createUser(stateUser());
});
</script>

<template>
    <form @submit.prevent="onSubmit">
        <VCard
            title="Form Pengguna"
            class="h-full"
        >
            <VFlex
                direction="col"
                gap="4"
            >
                <VInput
                    v-model="state.username"
                    placeholder="example@gmail.com"
                    name="username"
                    label="Username"
                    required
                    :disabled="action === 'update'"
                />
                <VInput
                    v-model="state.fullName"
                    placeholder="John Doe"
                    name="fullName"
                    label="Nama Lengkap"
                    required
                />
                <VSelect
                    v-model="state.userType"
                    name="type"
                    label="Pilih Tipe Pengguna"
                    :options="userTypeList"
                    placeholder="Mohon pilih tipe pengguna"
                    size="lg"
                    required
                    clearable
                    :disabled="action === 'update'"
                />
                <VMultiSelect
                    v-model="state.areas"
                    name="areas"
                    label="Pilih Area"
                    :options="areaList"
                    placeholder="Mohon pilih area"
                    size="lg"
                    required
                    clearable
                />
            </VFlex>
            <VFlex
                gap="4"
                class="mt-12"
                direction="row"
            >
                <VLink
                    variant="secondary"
                    :to="{ name: 'user' }"
                >
                    Batal
                </VLink> <VButton
                    variant="primary"
                    type="submit"
                    :loading="
                        isPendingCreateUser || isPendingUpdateUser
                    "
                >
                    Simpan
                    <Icon name="lucide:circle-plus" />
                </VButton>
            </VFlex>
        </VCard>
    </form>
</template>
