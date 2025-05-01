<script setup lang="ts" generic="TData extends Record<string, any>">
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
    valueKey?: string;
    labelKey?: string;
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
    valueKey = 'value',
    labelKey = 'label',
    ...props
} = defineProps<Props>();

const emits = defineEmits<{
    change: [value: (string | number)[]];
    searchChange: [value?: string];
}>();

const id = useId();
const state = defineModel<(string | number)[]>({ default: [] });
const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef');
const shouldShowSelect = ref(false);

const { errorMessage, setValue: setSelectValue } = useField<(string | number)[]>(
    toRef(props, 'name'),
undefined,
{
    initialValue: state.value,
    validateOnMount: false,
},
);

watch(state, value => setSelectValue(value));

const toggleOption = (option: string | number) => {
    if (!state.value)
        state.value = [];
    const exists = state.value.includes(option);
    state.value = exists
        ? state.value.filter(o => o !== option)
        : [...state.value, option];
    emits('change', state.value);
};

const removeSelected = (option: string | number) => {
    if (!state.value)
        return;
    state.value = state.value.filter(o => o !== option);
    emits('change', state.value);
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
                            :disabled="disabled"
                            :class="cn(
                                selectButtonVariants({
                                    rounded,
                                    size,
                                    isInvalid: errorMessage ? 'yes' : undefined,
                                }),
                            )"
                        >
                            <div class="flex flex-wrap gap-1 flex-1">
                                <template v-if="state.length">
                                    <span
                                        v-for="(val, idx) in state"
                                        :key="idx"
                                        class="inline-flex items-center gap-1 rounded bg-muted-100 px-2 py-0.5 text-sm"
                                    >
                                        {{ options.find(o => o[valueKey] === val)?.[labelKey] ?? val }}
                                        <button
                                            v-if="clearable"
                                            type="button"
                                            @click.stop="removeSelected(val)"
                                        >
                                            <Icon
                                                name="lucide:x"
                                                class="w-3 h-3"
                                            />
                                        </button>
                                    </span>
                                </template>
                                <span
                                    v-else
                                    class="text-muted-300 flex-1"
                                >{{ placeholder }}</span>
                            </div>
                            <Icon
                                name="lucide:chevron-down"
                                class="ml-2 w-4 h-4 shrink-0 opacity-50"
                            />
                        </button>
                    </VPopoverTrigger>

                    <VPopoverContent
                        class="p-0 overflow-hidden"
                        align="start"
                        :style="{ width: `${buttonRef?.clientWidth}px` }"
                    >
                        <VCommandRoot>
                            <VCommandInput
                                v-if="searchable"
                                :placeholder="placeholder"
                                class="h-10 pl-10 pr-3"
                                icon-class="w-4 h-4"
                                icon-wrapper-class="pl-3"
                                @input="(e) => asAsync && emits('searchChange', e.target.value)"
                            />
                            <VCommandEmpty />
                            <VCommandList>
                                <VCommandGroup class="p-2">
                                    <VCommandItem
                                        v-for="(option, idx) in options"
                                        :key="idx"
                                        :value="option[valueKey]"
                                        class="flex items-center justify-between gap-2"
                                        @select="() => toggleOption(option[valueKey])"
                                    >
                                        <span class="flex-1">{{ option[labelKey] }}</span>
                                        <Icon
                                            name="lucide:check"
                                            :class="cn('w-4 h-4', state.includes(option[valueKey]) ? 'opacity-100' : 'opacity-0')"
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
