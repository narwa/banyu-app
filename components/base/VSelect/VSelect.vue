<script setup lang="ts" generic="TData extends  string | number">
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
    change: [value?: TData];
    searchChange: [value?: string];
}>();

const id = useId();

const state = defineModel<TData>();
const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef');
const shouldShowSelect = ref<boolean>(false);

const { errorMessage, setValue: setSelectValue } = useField<TData | undefined>(
    toRef(props, 'name'),
    undefined,
    {
        initialValue: state.value,
        validateOnMount: false,
    },
);

watch(state, value => setSelectValue(value));
</script>

<template>
    <div :class="cn('form__group relative w-full flex flex-col space-y-1')">
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
                        props.inputClass,
                    )
                "
            >
                <VPopoverRoot v-model:open="shouldShowSelect">
                    <VPopoverTrigger as-child>
                        <button
                            ref="buttonRef"
                            variant="base"
                            role="combobox"
                            :aria-expanded="shouldShowSelect"
                            :class="cn(
                                selectButtonVariants({
                                    rounded,
                                    size,
                                    isInvalid: errorMessage ? 'yes' : undefined,
                                }),
                            )"
                            :disabled="disabled"
                        >
                            <span
                                v-if="state"
                                class="flex-1"
                            >{{ state }}</span>
                            <span
                                v-else
                                :class="cn(
                                    'flex-1 text-muted-300', {
                                        'opacity-70 dark:opacity-60': disabled,
                                        'text-red-400 dark:text-red-300': !!errorMessage,
                                    })"
                            >
                                {{ placeholder }}
                            </span>
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
                        <VCommandRoot
                            v-model="state"
                            :name="name"
                        >
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
                                        @select="(event) => {
                                            emits('change', event.detail.value as TData);
                                            shouldShowSelect = !shouldShowSelect
                                        }"
                                    >
                                        <span class="flex-1">{{ option }}</span>
                                        <Icon
                                            name="lucide:check"
                                            :class="cn(
                                                'h-4 w-4',
                                                option === state ? 'opacity-100' : 'opacity-0',
                                            )"
                                        />
                                    </VCommandItem>
                                </VCommandGroup>
                            </VCommandList>
                        </VCommandRoot>
                    </VPopoverContent>
                </VPopoverRoot>

                <div
                    v-if="loading"
                    :class="
                        cn(selectLoadingVariants({ rounded }))
                    "
                >
                    <VSkeleton :class="cn('w-full h-3 max-w-[75%]')" />
                </div>
            </div>
        </div>

        <VFormMessage
            :id="id"
            :name="name"
        />
    </div>
</template>
