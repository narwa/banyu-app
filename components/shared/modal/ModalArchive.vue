<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export type Props = {
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    reason?: boolean;
};

const props = defineProps<{ params: Props }>();
const emits = defineEmits<{
    reject: [value: boolean];
    resolve: [value: boolean | string];
}>();

const reason = shallowRef<string>('');
const reasonText = computed(() => 'Reason');

const confirmText = computed(() => props.params.confirmText ?? 'Ya, Hapus');
const cancelText = computed(() => props.params.cancelText ?? 'Tidak, Batal');

const validationSchema = computed(() =>
    yup.object({
        reason: yup.string()
            .max(5000, 'The maximum value for approval is a 17-digit number.')
            .required('Field is required'),
    }),
);

const { validate, meta } = useForm({ validationSchema: toTypedSchema(validationSchema.value) });

const isFormValid = computed(() => props.params.reason ? meta.value.valid : true);

const handleSubmit = async () => {
    if (!props.params.reason) {
        emits('resolve', true);
        return;
    }

    const isValid = await validate();
    if (isValid.valid)
        emits('resolve', reason.value);
};
</script>

<template>
    <VDialog
        size="md"
        open
        hide-close
        @update:open="emits('resolve', false)"
    >
        <VFlex class="flex items-start py-2 px-4 w-full">
            <div :class="cn('p-2 rounded-full bg-red-100 text-red-600 dark:text-red-600')">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    :class="cn('w-6 h-6')"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div :class="cn('ml-4 w-full')">
                <h5 :class="cn('text-base text-muted-800 font-medium mb-2 dark:text-muted-100')">
                    {{ params.title }}
                </h5>
                <span
                    v-if="params.message"
                    :class="cn('block text-muted-500 text-sm leading-normal dark:text-muted-300')"
                >
                    <slot>{{ params.message }}</slot>
                </span>

                <VTextarea
                    v-if="params.reason"
                    v-model="reason"
                    name="reason"
                    :placeholder="reasonText"
                    class="mt-2"
                />

                <VFlex
                    gap="4"
                    class="mt-4"
                >
                    <VButton
                        variant="secondary"
                        name="btn-cancel"
                        class="w-36"
                        data-testid="btn-cancel"
                        @click="$emit('resolve', false)"
                    >
                        {{ cancelText }}
                    </VButton>
                    <VButton
                        variant="danger"
                        name="btn-confirm"
                        data-testid="btn-confirm"
                        class="w-36"
                        :disabled="!isFormValid"
                        @click="handleSubmit"
                    >
                        {{ confirmText }} <Icon name="lucide:trash" />
                    </VButton>
                </VFlex>
            </div>
        </VFlex>
    </VDialog>
</template>
