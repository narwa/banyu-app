<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import type { TextVariants } from '../VText';
import { toast } from 'vue-sonner';

type Props = {
    class?: HTMLAttributes['class'];
    label?: string;
    required?: boolean;
    description?: string;
    name: string;
    modelValue?: File | null;
    preview?: string;
    textVariant?: TextVariants['variant'];
};

const { textVariant = 'body', ...props } = defineProps<Props>();

const emit = defineEmits<{
    'update:modelValue': [value: File | null];
}>();

const inputRef = useTemplateRef<HTMLInputElement>('inputRef');
const blobUrl = ref<string | null>(null);

const previewUrl = computed(() => {
    return blobUrl.value || props.preview || null;
});

watch(
    () => props.modelValue,
    (newFile) => {
        if (blobUrl.value) {
            URL.revokeObjectURL(blobUrl.value);
            blobUrl.value = null;
        }

        if (newFile instanceof File) {
            blobUrl.value = URL.createObjectURL(newFile);
        }
    },
    { immediate: true },
);

const handleFileSelect = (file: File) => {
    if (!file)
        return;

    if (file.size / 1024 > 1024) {
        toast.error('File size exceeds the allowed limit. Please upload a smaller file.');
        return;
    }

    if (!file.type.startsWith('image/')) {
        toast.error('Please upload a valid image file.');
        return;
    }

    emit('update:modelValue', file);
};

const upload = (files: File[] | null) => {
    if (files && files.length > 0) {
        handleFileSelect(files[0]);
    }
};

const openFilePicker = () => {
    inputRef.value?.click();
};

const onFileInputChange = () => {
    const target = inputRef.value as HTMLInputElement;
    if (target.files?.length) {
        handleFileSelect(target.files[0]);
    }
};

const dropzoneRef = useTemplateRef<HTMLDivElement>('dropzoneRef');
useDropZone(dropzoneRef, {
    onDrop: upload,
});

const { errorMessage } = useField(toRef(props, 'name'), undefined, {
    initialValue: props.modelValue || null,
    validateOnMount: false,
    syncVModel: true,
});
</script>

<template>
    <VFlex
        direction="col"
        gap="2"
        class="mb-2"
    >
        <VFormLabel
            :label="label"
            :required="required"
        />
        <slot name="description">
            <VFormDescription
                v-if="description"
                :name="name"
            >
                {{ description }}
            </VFormDescription>
        </slot>
    </VFlex>
    <VFlex
        ref="dropzoneRef"
        direction="col"
        items="center"
        justify="center"
        gap-y="6"
        class="bg-muted-100 border border-muted-200 rounded-md min-h-52 text-center cursor-pointer max-w-full w-full"
        @click="openFilePicker"
    >
        <input
            id="file"
            ref="inputRef"
            type="file"
            name="file"
            accept="image/*"
            class="hidden"
            @change="onFileInputChange"
        >

        <template v-if="previewUrl">
            <img
                :src="previewUrl"
                alt="Preview"
                class="max-h-48 object-contain"
            >
        </template>
        <template v-else>
            <div>
                <VText
                    as="p"
                    :variant="textVariant"
                    weight="bold"
                >
                    Drag and drop images into this area to upload
                </VText>
                <VText
                    as="p"
                    :variant="textVariant"
                    weight="light"
                >
                    (GIF, JPEG, PNG, WEBP. Max filesize: 1MB)
                </VText>
            </div>

            <VFlex gap-x="2">
                <Icon name="lucide:image" />
                <VText
                    as="p"
                    variant="sub-body"
                    weight="medium"
                    class="text-yellow-500"
                >
                    Or choose images
                </VText>
            </VFlex>
        </template>
    </VFlex>
    <span
        v-if="errorMessage"
        class="block text-sm text-danger-600 dark:text-danger-300 animate-in slide-in-from-top-3"
    >
        {{ label }} is required
    </span>
</template>
