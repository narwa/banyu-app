<script setup lang="ts" generic="TData extends string | number">
import type { HTMLAttributes } from 'vue';
import type { SelectButtonVariants } from '../VCombobox';
import type { InputColumnSpanVariants, InputColumnVariants } from '../VInput';
import { selectButtonVariants, selectLoadingVariants } from '../VCombobox';
import { inputColumnSpanVariants, inputColumnVariants } from '../VInput';

type Props = {
    class?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
    size?: SelectButtonVariants['size'];
    rounded?: SelectButtonVariants['rounded'];
    inlineCols?: InputColumnVariants['cols'];
    inputCols?: InputColumnSpanVariants['cols'];
    labelCols?: InputColumnSpanVariants['cols'];
    layout?: 'horizontal' | 'vertical';
    name: string;
    options: TData[];
    label?: string;
    placeholder?: string;
    asAsync?: boolean;
    loading?: boolean;
    asyncLoading?: boolean;
    required?: boolean;
    disabled?: boolean;
    clearable?: boolean;
    description?: string;
    searchable?: boolean;
};

const {
    layout = 'vertical',
    inputCols = 8,
    labelCols = 4,
    inlineCols = 12,
    searchable = true,
    asAsync = false,
    ...props
} = defineProps<Props>();

const emits = defineEmits<{
    change: [value: TData[]];
    searchChange: [value?: string];
}>();

const id = useId();

const state = defineModel<TData[]>({ default: [] });
const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef');
const shouldShowSelect = ref(false);

const { errorMessage, setValue: setSelectValue } = useField<TData[]>(
    toRef(props, 'name'),
    undefined,
    {
        initialValue: state.value,
        validateOnMount: false,
    },
);

watch(state, value => setSelectValue(value));

const toggleOption = (option: TData) => {
    if (!state.value)
        state.value = [];
    const exists = state.value.includes(option);
    const newValue = exists
        ? state.value.filter(o => o !== option)
        : [...state.value, option];
    state.value = newValue;
    emits('change', newValue);
};

const removeSelected = (option: TData) => {
    if (!state.value)
        return;
    const newValue = state.value.filter(o => o !== option);
    state.value = newValue;
    emits('change', newValue);
};
</script>

<template>
    <div :class="cn('form__group relative w-full flex flex-col space-y-1')">
        <div :class="cn(inputColumnVariants({ cols: layout === 'horizontal' ? inlineCols : undefined }), layout === 'horizontal' && 'gap-x-6 items-center')">
            <div
                v-if="label"
                :class="cn(inputColumnSpanVariants({ cols: layout === 'horizontal' ? labelCols : undefined }))"
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

            <div :class="cn(inputColumnSpanVariants({ cols: layout === 'horizontal' ? inputCols : undefined }), props.inputClass)">
                <VPopoverRoot v-model:open="shouldShowSelect">
                    <VPopoverTrigger as-child>
                        <button
                            ref="buttonRef"
                            variant="base"
                            role="combobox"
                            :aria-expanded="shouldShowSelect"
                            :class="cn(selectButtonVariants({ rounded, size, isInvalid: errorMessage ? 'yes' : undefined }))"
                            :disabled="disabled"
                        >
                            <template v-if="state?.length">
                                <div class="flex-1 flex flex-wrap gap-1">
                                    <span
                                        v-for="(val, i) in state"
                                        :key="i"
                                        class="inline-flex items-center gap-1 rounded bg-muted-100 px-2 py-0.5 text-sm"
                                    >
                                        {{ val }}
                                        <button
                                            v-if="clearable"
                                            @click.stop="removeSelected(val)"
                                        >
                                            <Icon
                                                name="lucide:x"
                                                class="h-3 w-3"
                                            />
                                        </button>
                                    </span>
                                </div>
                            </template>
                            <span
                                v-else
                                class="flex-1 text-muted-300"
                            >{{ placeholder }}</span>
                            <Icon
                                name="lucide:chevron-down"
                                class="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                        </button>
                    </VPopoverTrigger>

                    <VPopoverContent
                        class="p-0 overflow-hidden"
                        align="start"
                        :style="{ width: `${buttonRef?.clientWidth}px` }"
                    >
                        <VCommandRoot :name="name">
                            <VCommandInput
                                v-if="searchable"
                                :placeholder="placeholder"
                                class="h-10 pl-10 pr-3"
                                icon-class="w-4 h-4"
                                icon-wrapper-class="pl-3"
                                @input="(event) => asAsync && emits('searchChange', event.target.value)"
                            />
                            <VCommandEmpty />
                            <VCommandList>
                                <VCommandGroup class="p-2">
                                    <VCommandItem
                                        v-for="(option, index) in options"
                                        :key="index"
                                        :value="option"
                                        class="flex items-center justify-between gap-2"
                                        @select="() => toggleOption(option)"
                                    >
                                        <span class="flex-1">{{ option }}</span>
                                        <Icon
                                            name="lucide:check"
                                            :class="cn('h-4 w-4', state?.includes(option) ? 'opacity-100' : 'opacity-0')"
                                        />
                                    </VCommandItem>
                                </VCommandGroup>
                            </VCommandList>
                        </VCommandRoot>
                    </VPopoverContent>
                </VPopoverRoot>

                <div
                    v-if="loading"
                    :class="cn(selectLoadingVariants({ rounded }))"
                >
                    <VSkeleton class="w-full h-3 max-w-[75%]" />
                </div>
            </div>
        </div>

        <VFormMessage
            :id="id"
            :name="name"
        />
    </div>
</template>
