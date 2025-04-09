<script setup lang="ts">
import type { MaskaDetail, MaskInputOptions } from 'maska';
import type { HTMLAttributes, InputTypeHTMLAttribute } from 'vue';
import type {
    InputColumnSpanVariants,
    InputColumnVariants,
    InputVariants,
} from '.';
import { vMaska } from 'maska/vue';
import {
    inputColumnSpanVariants,
    inputColumnVariants,
    inputPrefixVariant,
    inputSuffixVariant,
    inputVariants,
} from '.';

type Props = {
    class?: HTMLAttributes['class'];
    labelClass?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
    rounded?: InputVariants['rounded'];
    size?: InputVariants['size'];
    inlineCols?: InputColumnVariants['cols'];
    labelCols?: InputColumnSpanVariants['cols'];
    inputCols?: InputColumnSpanVariants['cols'];
    modelValue?: string | number;
    name: string;
    type?: InputTypeHTMLAttribute;
    label?: string;
    placeholder?: string;
    description?: string;
    disabled?: boolean;
    loading?: boolean;
    required?: boolean;
    layout?: 'horizontal' | 'vertical';
    maskaOptions?: MaskInputOptions;
};

defineOptions({
    directives: {
        maska: vMaska,
    },
});

const {
    layout = 'vertical',
    inlineCols = 12,
    labelCols = 4,
    inputCols = 8,
    ...props
} = defineProps<Props>();
const emits = defineEmits<{
    'change': [value: string];
    'input': [value: string];
    'maska': [value: MaskaDetail];
    'update:modelValue': [value: string | number];
}>();

const { value, errorMessage, handleBlur } = useField(toRef(props, 'name'), undefined, {
    initialValue: props.modelValue,
    validateOnMount: false,
    syncVModel: true,
});

const id = useId();
const type = shallowRef<string>(props.type ?? 'text');
const shouldShowPassword = shallowRef<boolean>(false);

function handleTextInput(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    emits('input', inputValue);
}

function handleTextChange(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    emits('change', inputValue);
}

function handleShowPassword() {
    shouldShowPassword.value = !shouldShowPassword.value;
    type.value = shouldShowPassword.value ? 'text' : 'password';
}
</script>

<template>
    <div :class="cn('form__group relative w-full flex flex-col space-y-1', props.class)">
        <div :class="cn(inputColumnVariants({ cols: layout === 'horizontal' && inlineCols ? inlineCols : undefined }), layout === 'horizontal' && 'gap-x-6 items-center')">
            <div
                v-if="label"
                :class="
                    cn(
                        inputColumnSpanVariants({
                            cols: layout === 'horizontal' && labelCols ? labelCols : undefined,
                        }),
                    )
                "
            >
                <VFlex
                    direction="col"
                    class="space-y-1.5 mb-2"
                    :class="cn(layout === 'horizontal' && 'lg:mb-0')"
                >
                    <VFormLabel
                        :label="label"
                        :label-for="id"
                        :required="required"
                        :label-class="cn(props.labelClass)"
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
                        {
                            flex: !!$slots.suffixAction || !!$slots.prefixAction,
                        },
                    )
                "
            >
                <slot name="prefixAction" />
                <div :class="cn('flex-1 relative', { 'input--invalid': !!errorMessage })">
                    <div
                        v-if="$slots.prefix || $slots.prefixIcon"
                        :class="cn('absolute h-full top-0 left-0 text-muted-300 dark:text-muted-500')"
                    >
                        <slot name="prefix">
                            <div
                                v-if="$slots.prefixIcon"
                                :class="cn(inputPrefixVariant({ size }))"
                            >
                                <slot name="prefixIcon" />
                            </div>
                        </slot>
                    </div>

                    <template v-if="maskaOptions">
                        <input
                            v-bind="$attrs"
                            :id="id"
                            v-model="value"
                            v-maska="maskaOptions"
                            :name="name"
                            :type="type"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :class="
                                cn(
                                    inputVariants({
                                        rounded,
                                        size,
                                        hasPrefix: $slots.prefixIcon ? size : 'no',
                                        hasPrefixAction: $slots.prefixAction ? 'yes' : 'no',
                                        hasSuffix: $slots.suffixIcon || type === 'password' ? size : 'no',
                                        hasSuffixAction: $slots.suffixAction ? 'yes' : 'no',
                                        isInvalid: errorMessage ? 'yes' : 'no',
                                    }),
                                    props.inputClass,
                                )
                            "
                            autocomplete="off"
                            @input="handleTextInput"
                            @change="handleTextChange"
                            @blur="handleBlur"
                            @maska="(event: CustomEvent<MaskaDetail>) => emits('maska', event.detail)"
                        >
                    </template>

                    <template v-else>
                        <input
                            v-bind="$attrs"
                            :id="id"
                            v-model="value"
                            :name="name"
                            :type="type"
                            :disabled="disabled"
                            :readonly="loading"
                            :placeholder="placeholder"
                            :class="
                                cn(
                                    inputVariants({
                                        rounded,
                                        size,
                                        hasPrefix: $slots.prefixIcon ? size : 'no',
                                        hasPrefixAction: $slots.prefixAction ? 'yes' : 'no',
                                        hasSuffix: $slots.suffixIcon || type === 'password' ? size : 'no',
                                        hasSuffixAction: $slots.suffixAction ? 'yes' : 'no',
                                        isInvalid: errorMessage ? 'yes' : 'no',
                                    }),
                                    props.inputClass,
                                )
                            "
                            autocomplete="off"
                            @input="handleTextInput"
                            @change="handleTextChange"
                        >
                    </template>

                    <div
                        v-if="$slots.suffix || $slots.suffixIcon || props.type === 'password'"
                        :class="cn('absolute h-full top-0 right-0 text-muted-300 dark:text-muted-500')"
                        @click="
                            () => {
                                if (props.type !== 'password') return;
                                handleShowPassword();
                            }
                        "
                    >
                        <slot name="suffix">
                            <div
                                v-if="$slots.suffixIcon || props.type === 'password'"
                                :class="cn(inputSuffixVariant({ size }))"
                            >
                                <slot name="suffixIcon">
                                    <Icon
                                        v-if="!shouldShowPassword"
                                        name="mdi:eye"
                                    />
                                    <Icon
                                        name="mdi:eye-off"
                                    />
                                </slot>
                            </div>
                        </slot>
                    </div>

                    <div
                        v-if="loading"
                        :class="
                            cn(
                                'absolute z-20 inset-[2px] bg-white px-4 flex items-center justify-start dark:bg-muted-700',
                            )
                        "
                    >
                        <VSkeleton :class="cn('w-full h-3 max-w-[75%]')" />
                    </div>
                </div>
                <slot name="suffixAction" />
            </div>
        </div>

        <VFormMessage
            :id="id"
            :name="name"
        />
    </div>
</template>

<style lang="scss">
.input--invalid {
    & svg {
        @apply text-red-300;
    }
}
</style>
