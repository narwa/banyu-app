<script lang="ts" setup>
import type { Nullable } from '~/types';
import * as yup from 'yup';

export type UploadFileResponse = {
    name: string;
    image: Nullable<File>;
};

const emits = defineEmits<{
    resolve: [value: UploadFileResponse];
}>();

const emptyResponse: UploadFileResponse = {
    name: '',
    image: null,
};

const state = reactive({
    name: '',
    image: null as Nullable<File>,
});

const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            name: yup
                .string()
                .required('Image name is required'),
        }),
    ),
});

const onSubmit = handleSubmit(() => {
    emits('resolve', {
        name: state.name,
        image: state.image,
    });
});
</script>

<template>
    <VDialog
        size="md"
        open
        hide-close
        @update:open="emits('resolve', emptyResponse)"
    >
        <div class="sm:max-w-lg w-full p-5 bg-white rounded-xl z-10">
            <VText
                as="h4"
                variant="h4"
            >
                File Upload
            </VText>
            <form
                class="mt-5 space-y-4"
                @submit.prevent="onSubmit"
            >
                <VInput
                    v-model="state.name"
                    name="name"
                    label="Name"
                    type="text"
                    size="md"
                    placeholder="Please Insert an image name"
                    label-class="text-sm"
                    required
                />
                <div class="grid grid-cols-1 space-y-2">
                    <VFormLabel
                        label-class="text-sm"
                        label="Attach Document"
                    />
                    <div class="flex items-center justify-center w-full">
                        <VDropImage
                            v-model="state.image"
                            name="Content-Image"
                            text-variant="sub-body"
                        />
                    </div>
                </div>
                <VFlex
                    direction="row"
                    justify="between"
                    items="center"
                    gap="4"
                    class="flex-col lg:flex-row"
                >
                    <VButton
                        type="button"
                        variant="secondary-inverted"
                        size="sm"
                        block
                        @click="emits('resolve', emptyResponse)"
                    >
                        Batal
                    </VButton>

                    <VButton
                        variant="primary"
                        type="submit"
                        size="sm"
                        block
                    >
                        <Icon name="lucide:file-up" />
                        Upload
                    </VButton>
                </VFlex>
            </form>
        </div>
    </VDialog>
</template>
