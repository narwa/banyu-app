<script setup lang="ts">
import type { ModelValue, VueDatePickerProps } from '@vuepic/vue-datepicker';
import type { HTMLAttributes } from 'vue';
import type {
    InputColumnSpanVariants,
    InputColumnVariants,
    InputDateVariants,
} from '.';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useForwardProps } from 'radix-vue';
import { useField } from 'vee-validate';
import { computed, toRef, watch } from 'vue';
import {
    inputColumnSpanVariants,
    inputColumnVariants,
    inputDateClearableVariant,
    inputDateVariant,
    inputPrefixVariant,
    inputSuffixVariant,
} from '.';
import VSkeleton from '../VSkeleton/VSkeleton.vue';

type Props = VueDatePickerProps & {
    class?: HTMLAttributes['class'];
    inputClass?: HTMLAttributes['class'];
    rounded?: InputDateVariants['rounded'];
    size?: InputDateVariants['size'];
    inlineCols?: InputColumnVariants['cols'];
    labelCols?: InputColumnSpanVariants['cols'];
    inputCols?: InputColumnSpanVariants['cols'];
    name: string;
    label?: string;
    description?: string;
    layout?: 'horizontal' | 'vertical';
    loading?: boolean;
    mode?: 'date' | 'time' | 'datetime' | 'week' | 'month' | 'year';
};

const {
    layout = 'vertical',
    inlineCols = 12,
    labelCols = 4,
    inputCols = 8,
    mode = 'date',
    format = 'dd-MM-yyyy',
    clearable = false,
    position = 'left',
    ...props
} = defineProps<Props>();
const emits = defineEmits<{
    'clear': [];
    'change': [value: ModelValue];
    'update:modelValue': [value: ModelValue];
}>();

const id = useId();

const { errorMessage, setValue: setDateValue } = useField(toRef(props, 'name'), undefined, {
    initialValue: props.modelValue,
    validateOnMount: false,
});

const delegatedProps = computed(() => {
    const {
        class: _class,
        inputClass: _inputClass,
        rounded: _rounded,
        size: _size,
        modelValue: _modelValue,
        description: _helper,
        inline: _inline,
        loading: _loading,
        required: _required,
        ...delegated
    } = props;
    return delegated;
});

const forwarded = useForwardProps(delegatedProps);

function handleDateChanged(date: Date | Date[]) {
    emits('update:modelValue', date);
    emits('change', date);
    setDateValue(date);
}

watch(
    () => props.modelValue,
    (dateValue) => {
        setDateValue(dateValue ?? null);
    },
);
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

                <div :class="cn('flex-1 relative', { 'date--invalid': !!errorMessage })">
                    <div :class="cn('absolute h-full top-0 left-0 text-muted-300 dark:text-muted-500 z-10')">
                        <slot name="prefix">
                            <div :class="cn(inputPrefixVariant({ size }))">
                                <slot name="prefixIcon">
                                    <Icon name="mdi:calendar" />
                                </slot>
                            </div>
                        </slot>
                    </div>

                    <VueDatePicker
                        v-bind="forwarded"
                        :model-value="modelValue"
                        :week-picker="mode === 'week'"
                        :month-picker="mode === 'month'"
                        :year-picker="mode === 'year'"
                        :time-picker="mode === 'time'"
                        :enable-time-picker="mode === 'datetime'"
                        :position="position"
                        :format="format"
                        :readonly="loading"
                        :month-change-on-scroll="false"
                        :ui="{
                            calendar: 'datepicker__calendar',
                            calendarCell: 'datepicker__cell',
                            menu: 'datepicker__menu',
                            input: cn(
                                inputDateVariant({
                                    rounded,
                                    size,
                                    hasPrefix: size,
                                    hasPrefixAction: $slots.prefixAction ? 'yes' : 'no',
                                    hasSuffix: $slots.suffixIcon ? size : 'no',
                                    hasSuffixAction: $slots.suffixAction ? 'yes' : 'no',
                                    isInvalid: errorMessage ? 'yes' : 'no',
                                    isClearable: clearable && modelValue ? size : 'no',
                                }),
                                props.inputClass,
                            ),
                        }"
                        :clearable="clearable"
                        autocomplete="off"
                        text-input
                        hide-input-icon
                        auto-apply
                        no-today
                        @update:model-value="handleDateChanged"
                        @cleared="emits('clear')"
                    >
                        <template #arrow-left>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2em"
                                height="1.2em"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-chevron-left"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                        </template>
                        <template #arrow-right>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.2em"
                                height="1.2em"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                class="lucide lucide-chevron-right"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </template>
                        <template #clear-icon="{ clear }">
                            <span
                                :class="cn(inputDateClearableVariant({ size }))"
                                @click="clear"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1.2em"
                                    height="1.2em"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                >
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </span>
                        </template>
                    </VueDatePicker>

                    <div
                        v-if="$slots.suffix || $slots.suffixIcon"
                        :class="cn('absolute h-full top-0 right-0 text-muted-300 dark:text-muted-500 z-10')"
                    >
                        <slot name="suffix">
                            <div
                                v-if="$slots.suffixIcon"
                                :class="cn(inputSuffixVariant({ size }))"
                            >
                                <slot name="suffixIcon" />
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

<style src="@vuepic/vue-datepicker/dist/main.css"></style>

<style lang="scss">
.date--invalid {
    & svg {
        @apply text-red-300;
    }
}

.datepicker__input {
    @apply font-sans;
}

.datepicker__menu {
    @apply font-sans text-sm rounded-md bg-white dark:bg-muted-950 border border-muted-200 dark:border-muted-800;

    & .dp__arrow_bottom,
    & .dp__arrow_top {
        @apply bg-white dark:bg-muted-950 border-muted-200 dark:border-muted-800;
    }

    & .dp--year-select,
    & .dp__month_year_select {
        @apply h-7 text-xs text-muted-800 dark:text-muted-100 hover:bg-muted-100 dark:hover:bg-muted-900;
    }

    & .dp__inner_nav {
        @apply h-7 w-7 rounded-md border border-muted-100 dark:border-muted-900 hover:bg-muted-100 dark:hover:bg-muted-900;

        & svg {
            @apply w-4 h-4;
        }
    }

    & .dp__overlay {
        @apply overflow-hidden p-1 font-sans font-normal text-xs rounded-b-md bg-white dark:bg-muted-950;
    }

    & .dp__overlay_cell {
        @apply rounded-md hover:bg-muted-100 dark:hover:bg-muted-900 text-muted-800 dark:text-muted-100;
    }

    & .dp__overlay_cell_disabled {
        @apply bg-transparent hover:bg-transparent text-muted-300 dark:text-muted-600;
    }

    & .dp__overlay_cell_active {
        @apply bg-primary-800 text-muted-100 dark:text-muted-100;
    }

    & .dp__button {
        @apply left-0 right-0 bottom-0 w-auto rounded-b-md hover:bg-muted-100 dark:hover:bg-muted-900;

        & svg {
            @apply text-muted-400 w-4 h-4;
        }
    }
}

.datepicker__calendar {
    & .dp__calendar_header {
        @apply font-normal text-xs text-muted-400;
    }

    & .dp__calendar_header_item {
        @apply h-auto;
    }

    & .dp__calendar_header_separator {
        @apply hidden;
    }
}

.datepicker__cell {
    @apply w-9 h-9 font-light rounded-md text-muted-800 dark:text-muted-100;

    &.dp__cell_disabled {
        @apply text-muted-300 dark:text-muted-600;
    }

    &.dp__cell_offset {
        @apply text-muted-300 dark:text-muted-600;
    }

    &.dp__date_hover,
    &.dp__date_hover_start,
    &.dp__date_hover_end {
        @apply hover:bg-muted-100 dark:hover:bg-muted-900 hover:text-muted-800 dark:hover:text-muted-100;
    }

    &.dp__range_start {
        @apply rounded-r-none;
    }

    &.dp__range_end {
        @apply rounded-l-none;
    }

    &.dp__range_between {
        @apply rounded-none bg-muted-100 dark:bg-muted-900 dark:border-muted-900;
    }

    &.dp__active_date,
    &.dp__range_end,
    &.dp__range_start {
        @apply bg-primary-800 text-muted-100 dark:text-muted-100;
    }
}
</style>
