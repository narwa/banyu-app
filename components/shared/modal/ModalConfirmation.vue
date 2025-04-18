<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';

export type Props = {
    action: 'approve' | 'reject';
    title: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    reason?: boolean;
    icon: string;
    label?: string;
};

const props = defineProps<{ params: Props }>();
const emits = defineEmits<{
    reject: [value: boolean];
    resolve: [value: boolean | string];
}>();

const reason = shallowRef<string>('');
const reasonText = computed(() => '...');

const confirmText = computed(() => props.params.confirmText ?? 'Continue');
const cancelText = computed(() => props.params.cancelText ?? 'No, Batal');

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
        <VFlex class="py-2 px-4 w-full">
            <div :class="cn('flex flex-col gap-y-2')">
                <div :class="cn(params.action === 'approve' ? 'bg-green-500' : 'bg-red-500', 'p-3 rounded-full text-white w-12 h-12')">
                    <Icon
                        :name="params.icon"
                        class="ml-[0.2rem]"
                    />
                </div>
                <h5 :class="cn('text-base text-muted-800 font-bold mb-2 dark:text-muted-100')">
                    {{ params.title }}
                </h5>
                <span
                    v-if="params.message"
                    :class="cn('block text-muted-500 text-sm leading-normal dark:text-muted-300')"
                >
                    <slot>{{ params.message }}</slot>
                </span>
                <span class="border-b border-muted-100" />
                <VTextarea
                    v-if="params.reason"
                    v-model="reason"
                    name="reason"
                    :label="params.label"
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
                        class="w-full"
                        data-testid="btn-cancel"
                        @click="$emit('resolve', false)"
                    >
                        {{ cancelText }}
                    </VButton>
                    <VButton
                        :variant="params.action === 'approve' ? 'primary' : 'danger'"
                        name="btn-confirm"
                        data-testid="btn-confirm"
                        class="w-full"
                        :disabled="!isFormValid"
                        @click="handleSubmit"
                    >
                        {{ confirmText }} <Icon :name="params.icon" />
                    </VButton>
                </VFlex>
            </div>
        </VFlex>
    </VDialog>
</template>
