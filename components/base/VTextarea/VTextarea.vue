<script setup lang="ts">
import type { HTMLAttributes, TextareaHTMLAttributes } from 'vue';
import type { TextareaVariants } from '.';
import type { InputColumnSpanVariants, InputColumnVariants } from '../VInput';
import { useField } from 'vee-validate';
import { toRef } from 'vue';
import { textareaVariants } from '.';
import { inputColumnSpanVariants, inputColumnVariants } from '../VInput';

type Props = {
    class?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
    rounded?: TextareaVariants['rounded'];
    size?: TextareaVariants['size'];
    inlineCols?: InputColumnVariants['cols'];
    labelCols?: InputColumnSpanVariants['cols'];
    inputCols?: InputColumnSpanVariants['cols'];
    modelValue?: string;
    name: string;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    layout?: 'horizontal' | 'vertical';
    loading?: boolean;
    required?: boolean;
    rows?: TextareaHTMLAttributes['rows'];
};

const {
    layout = 'vertical',
    inlineCols = 12,
    labelCols = 4,
    inputCols = 8,
    rows = 3,
    ...props
} = defineProps<Props>();
const emits = defineEmits<{
    'change': [value: string];
    'input': [value: string];
    'update:modelValue': [value: string];
}>();

const id = useId();

const { value, errorMessage, handleBlur } = useField(toRef(props, 'name'), undefined, {
    initialValue: props.modelValue,
    validateOnMount: false,
    syncVModel: true,
});

function handleTextareaInput(event: Event) {
    const textareaValue = (event.target as HTMLInputElement).value;
    emits('input', textareaValue);
}

function handleTextareaChange(event: Event) {
    const textareaValue = (event.target as HTMLInputElement).value;
    emits('change', textareaValue);
}
</script>

<template>
    <div :class="cn('form__group relative w-full flex flex-col space-y-1', props.class)">
        <div
            :class="cn(inputColumnVariants({ cols: layout === 'horizontal' && inlineCols ? inlineCols : undefined }), layout === 'horizontal' && 'gap-x-6 items-center')"
        >
            <div
                v-if="label"
                :class="
                    cn(
                        inputColumnSpanVariants({
                            cols: layout === 'horizontal' && labelCols ? labelCols : undefined,
                        }),
                        'mb-2',
                    )
                "
            >
                <VFlex
                    direction="col"
                    class="space-y-1.5"
                    :class="cn(layout === 'horizontal' && 'lg:mb-0')"
                >
                    <VFormLabel
                        :label="label"
                        :label-for="id"
                        :required="required"
                    />

                    <slot name="description">
                        <VFormDescription
                            v-if="description"
                            :id="id"
                            :name="name"
                        >
                            {{ description }}
                        </VFormDescription>
                    </slot>
                </VFlex>
            </div>
            <div
                :class="
                    cn(
                        inputColumnSpanVariants({
                            cols: layout === 'horizontal' && inputCols ? inputCols : undefined,
                        }),
                    )
                "
            >
                <textarea
                    v-bind="$attrs"
                    :id="id"
                    v-model="value"
                    :name="name"
                    :rows="loading ? 3 : rows"
                    :disabled="disabled"
                    :readonly="loading"
                    :placeholder="placeholder"
                    :class="
                        cn(
                            textareaVariants({
                                rounded,
                                size,
                                isInvalid: errorMessage ? 'yes' : 'no',
                                isLoading: loading ? 'yes' : 'no',
                            }),
                            props.inputClass,
                        )
                    "
                    autocomplete="off"
                    @input="handleTextareaInput"
                    @change="handleTextareaChange"
                    @blur="handleBlur"
                />

                <div
                    v-if="loading"
                    :class="
                        cn(
                            'absolute z-20 inset-[2px] bg-white px-3 py-2.5 flex flex-col gap-2 dark:bg-muted-700',
                        )
                    "
                >
                    <VSkeleton :class="cn('w-full h-3 max-w-[75%]')" />
                    <VSkeleton :class="cn('w-full h-3 max-w-[50%]')" />
                    <VSkeleton :class="cn('w-full h-3 max-w-[25%]')" />
                </div>
            </div>
        </div>

        <VFormMessage
            :id="id"
            :name="name"
        />
    </div>
</template>
