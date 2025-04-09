<script setup lang="ts" generic="TData extends object">
import type { HTMLAttributes } from 'vue';
import type { SelectButtonVariants } from '.';
import type { InputColumnSpanVariants, InputColumnVariants } from '../VInput';
import { selectButtonVariants, selectLoadingVariants } from '.';
import { inputColumnSpanVariants, inputColumnVariants } from '../VInput';

type TrackKey = keyof TData;
type Props = {
    class?: HTMLAttributes['class'];
    rounded?: SelectButtonVariants['rounded'];
    size?: SelectButtonVariants['size'];
    name: string;
    options: TData[];
    trackLabel: TrackKey;
    trackValue: TrackKey;
    clearable?: boolean;
    asAsync?: boolean;
    asyncLoading?: boolean;
    loading?: boolean;
    disabled?: boolean;
    required?: boolean;
    label?: string;
    placeholder?: string;
    inlineCols?: InputColumnVariants['cols'];
    labelCols?: InputColumnSpanVariants['cols'];
    inputCols?: InputColumnSpanVariants['cols'];
    layout?: 'horizontal' | 'vertical';
    description?: string;
};

const {
    layout = 'vertical',
    inlineCols = 12,
    labelCols = 4,
    inputCols = 8,
    ...props
} = defineProps<Props>();
const emits = defineEmits<{
    change: [value?: TData];
}>();

const id = useId();

const state = defineModel<TData>();
const buttonRef = useTemplateRef<HTMLButtonElement>('buttonRef');
const searchTerm = defineModel('search', { default: '' });
const shouldShowSelect = ref<boolean>(false);

const { errorMessage, setValue: setSelectValue } = useField<TData | undefined>(
    toRef(props, 'name'),
    undefined,
    {
        initialValue: state.value,
        validateOnMount: false,
    },
);

const selectedText = computed(() => {
    return state.value ? state.value[props.trackLabel] : undefined;
});

const filteredOptions = computed(() =>
    searchTerm.value === ''
        ? props.options
        : props.options.filter((option) => {
                return String(option[props.trackLabel]).toLowerCase().includes(searchTerm.value.toLowerCase());
            }),
);

function isSelected(value: TData) {
    if (!state.value)
        return false;
    return state.value[props.trackValue] === value[props.trackValue];
}

watch(state, value => setSelectValue(value));
</script>

<template>
    <div :class="cn('select__group relative w-full')">
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
                                v-if="selectedText"
                                class="flex-1"
                            >{{ selectedText }}</span>
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
                                name="lucide:chevrons-up-down"
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
                            v-model:search-term="searchTerm"
                            :name="name"
                        >
                            <VCommandInput
                                :placeholder="placeholder"
                                class="h-10 pl-10 pr-3"
                                icon-class="w-4 h-4"
                                icon-wrapper-class="pl-3"
                            />
                            <VCommandEmpty />
                            <VCommandList>
                                <VCommandGroup class="p-2">
                                    <VCommandItem
                                        v-for="(option, index) in filteredOptions"
                                        :key="index"
                                        :value="option"
                                        class="flex items-center justify-between gap-2"
                                        @select="(event) => {
                                            emits('change', event.detail.value as TData);
                                            shouldShowSelect = !shouldShowSelect
                                        }"
                                    >
                                        <span class="flex-1">{{ toValue(option)[trackLabel] }}</span>
                                        <Icon
                                            name="lucide:check"
                                            :class="cn(
                                                'h-4 w-4',
                                                isSelected(toValue(option)) ? 'opacity-100' : 'opacity-0',
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
