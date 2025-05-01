<script setup lang="ts" generic="TData extends object">
import type { HTMLAttributes } from 'vue';
import type { SortDirection, TableColumn, TableRowSelection } from '.';
import type { SelectOption } from '~/types';
import { SORT_DIRECTION, tableCellVariants, tableColumnVariants, tableHeadVariants, tableRowVariants } from '.';

type Props = {
    title?: string;
    entries: TData[];
    columns: TableColumn<TData>[];
    perPageOptions?: SelectOption<number, string>[];
    total?: number;
    loading?: boolean;
    cardable?: boolean;
    sortable?: boolean;
    responsive?: boolean;
    rowSelection?: TableRowSelection<TData>;
    createText?: string;
    inset?: boolean;
    insetClass?: HTMLAttributes['class'];
    hideHeader?: boolean;
    hideFooter?: boolean;
    hideLimit?: boolean;
    hidePagination?: boolean;
    withCreate?: boolean;
    withNumber?: boolean;
};

const {
    total = 0,
    cardable = true,
    sortable = true,
    responsive = true,
    inset = true,
    insetClass = 'px-4',
    ...props
} = defineProps<Props>();
const emits = defineEmits<{
    create: [];
    check: [entry: TData, value: TData[]];
    checkAll: [value: TData[], isChecked: boolean];
    pageChange: [value: number];
    perPageChange: [value: number];
}>();

const currentPage = defineModel<number>('page', { default: 1 });
const perPage = defineModel<number>('perPage', { default: 10 });
const sortKey = defineModel<string>('sortKey');
const sortDirection = defineModel<SortDirection>('sortDirection');
const selectedRowList = defineModel<TData[]>('selectedRows', { default: [] });
const isAscending = shallowRef<boolean>(
    typeof sortDirection.value === 'string' ? sortDirection.value === 'asc' : true,
);

const entries = computed<TData[]>(() => props.entries ?? []);

const shouldShowPagination = computed(() => !props.loading && total > perPage.value);
const perPageOptions = computed<SelectOption<number, string>[]>(() => {
    const defaultPerPages: SelectOption<number, string>[] = [{
        label: '10',
        value: 10,
    }, {
        label: '20',
        value: 20,
    }, {
        label: '30',
        value: 30,
    }, {
        label: '40',
        value: 40,
    }, {
        label: '50',
        value: 50,
    }];

    return props.perPageOptions ?? defaultPerPages;
});

const startResult = computed(
    () => currentPage.value * perPage.value - perPage.value + (entries.value.length ? 1 : 0),
);
const endResult = computed(
    () => startResult.value + (entries.value.length - (entries.value.length ? 1 : 0)),
);

const tableInformation = computed(() => `Showing ${startResult.value} to ${endResult.value} of ${total} items`);
const columnsLength = computed(
    () =>
        props.columns.length
        + (props.withNumber ? 1 : 0)
        + (props.rowSelection ? 1 : 0),
);
const resultText = computed(() => total);
const createText = computed(() => props.createText ?? 'Create new');

const isContainHash = (columnKey = '#') => columnKey.includes('#');
const isSortColumnValid = (columnKey?: string) => columnKey && sortKey.value === columnKey && !isContainHash(columnKey);

const isRowDisabled = (record: TData, index: number) => props.rowSelection?.props && props.rowSelection?.props(record, index).disabled;
const isRowLocked = (record: TData, index: number) => props.rowSelection?.props && props.rowSelection?.props(record, index).locked;

const isAllRowsChecked = computed<boolean | 'indeterminate'>(() => {
    if (!props.rowSelection || props.loading)
        return false;

    const availableRowList = entries.value.filter(
        (entry, index) => !isRowDisabled(entry, index) && !isRowLocked(entry, index),
    );

    if (!availableRowList.length)
        return false;

    const key = props.rowSelection.key;

    if (availableRowList.every(entry => !!selectedRowList.value.find(row => row[key] === entry[key])))
        return true;
    return availableRowList.every(entry => !selectedRowList.value.some(row => row[key] === entry[key])) ? false : 'indeterminate';
});

function isRowChecked(entry: TData) {
    if (!props.rowSelection)
        return false;
    const key = props.rowSelection.key;
    return selectedRowList.value.some(row => row[key] === entry[key]);
}

function handleChangeLimit(value?: string | number) {
    currentPage.value = 1;
    emits('perPageChange', value ? Number(value) : 1);
}

function handleSortColumn(columnKey?: string) {
    if (!columnKey || isContainHash(columnKey))
        return;
    if (sortKey.value === columnKey) {
        isAscending.value = !isAscending.value;
    }
    else {
        isAscending.value = true;
    }
    sortKey.value = columnKey;
    sortDirection.value = isAscending.value ? SORT_DIRECTION.ASCENDING : SORT_DIRECTION.DESCENDING;
}

function handleCheckAllRows(checked: boolean) {
    if (!props.rowSelection)
        return;

    const rowKey = props.rowSelection.key;

    if (checked) {
        const unselectedRows = entries.value.filter((entry, index) => {
            const notIncluded = !selectedRowList.value.some(column => entry[rowKey] === column[rowKey]);
            return !isRowDisabled(entry, index) && !isRowLocked(entry, index) && notIncluded;
        });
        selectedRowList.value = [...selectedRowList.value, ...unselectedRows];
    }
    else {
        selectedRowList.value = selectedRowList.value.filter(
            column => !entries.value.some(entry => entry[rowKey] === column[rowKey]),
        );
    }
    emits('checkAll', selectedRowList.value, checked);
}

function handleCheckRow(entry: TData, checked: boolean) {
    if (!props.rowSelection)
        return;

    const rowKey = props.rowSelection.key;

    if (checked) {
        if (!selectedRowList.value.find(column => entry[rowKey] === column[rowKey])) {
            selectedRowList.value = [...selectedRowList.value, entry];
            emits('check', entry, selectedRowList.value);
        }
    }
    else {
        selectedRowList.value = selectedRowList.value.filter(column => entry[rowKey] !== column[rowKey]);
        emits('check', entry, selectedRowList.value);
    }
}

const combineKey = (...args: (string | number)[]) => args.join('-');

const extractCellClass = (column: TableColumn<TData>, entry: TData) => typeof column.cellClass === 'function' ? column.cellClass(entry) : column.cellClass;
</script>

<template>
    <div :class="cn('relative w-full text-[13px]', cardable && 'card')">
        <slot name="header">
            <div
                v-if="!hideHeader"
                :class="cn('py-4', inset && insetClass)"
            >
                <div
                    :class="cn('flex flex-col gap-4 md:flex-row md:items-center')"
                >
                    <div :class="cn('flex flex-1 items-center')">
                        <slot name="information">
                            <h2
                                v-if="title"
                                :class="cn('inline-flex text-base font-medium text-muted-800 dark:text-muted-100')"
                            >
                                {{ title }}
                            </h2>
                            <div :class="cn('ml-3 flex items-center text-sm whitespace-nowrap text-muted-400 dark:text-muted-300')">
                                <span>{{ resultText }}</span>

                                <VTooltip
                                    :tooltip="tableInformation"
                                    position="bottom"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        class="w-4 h-4 ml-2"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </VTooltip>
                            </div>
                        </slot>
                    </div>

                    <div :class="cn('flex gap-2')">
                        <VButton
                            v-if="withCreate"
                            variant="unstyled"
                            name="btn-create"
                            data-testid="btn-create"
                            @click="emits('create')"
                        >
                            <Icon name="mdi:plus" />
                            <span>{{ createText }}</span>
                        </VButton>
                        <slot name="actions" />
                    </div>
                </div>
            </div>
        </slot>
        <div
            v-if="$slots.filter"
            :class="cn('pb-3', inset && insetClass)"
        >
            <slot name="filter" />
        </div>
        <slot name="headerExtra" />
        <div :class="cn(responsive && 'w-full overflow-x-auto')">
            <table :class="cn('w-full overflow-auto')">
                <caption class="sr-only">
                    {{ title }}
                </caption>

                <slot name="thead">
                    <thead :class="cn(tableHeadVariants())">
                        <tr>
                            <slot
                                name="columns"
                                :columns="columns"
                            >
                                <th
                                    v-if="rowSelection"
                                    scope="col"
                                    :class="cn(tableColumnVariants(), 'w-[50px]')"
                                >
                                    <VCheckbox
                                        :checked="isAllRowsChecked"
                                        :disabled="loading"
                                        @update:checked="handleCheckAllRows"
                                    />
                                </th>
                                <th
                                    v-if="withNumber"
                                    scope="col"
                                    :class="cn(tableColumnVariants(), 'w-[50px]')"
                                >
                                    No
                                </th>
                                <th
                                    v-for="column in columns"
                                    :key="column.key"
                                    scope="col"
                                    :class="cn(
                                        tableColumnVariants(
                                            {
                                                sortable: !isContainHash(column.sortKey) && sortable ? true : undefined,
                                            },
                                        ), {
                                            'font-bold text-muted-900': isSortColumnValid(column.sortKey),
                                        },
                                        column.columnClass)"
                                    @click="handleSortColumn(column.sortKey)"
                                >
                                    <slot
                                        name="th"
                                        :column="column"
                                        :is-ascending="isAscending"
                                    >
                                        <span>{{ column.name }}</span>
                                        <template v-if="!isContainHash(column.sortKey) && sortable">
                                            <Icon
                                                v-if="isSortColumnValid(column.sortKey) && isAscending"
                                                name="mdi:sort-alphabetical-ascending"
                                                :class="cn('ml-1 w-4 h-4 text-muted-400 dark:text-muted-300')"
                                            />

                                            <Icon
                                                v-if="isSortColumnValid(column.sortKey) && !isAscending"
                                                name="mdi:sort-alphabetical-descending"
                                                :class="cn('ml-1 w-4 h-4 text-muted-400 dark:text-muted-300')"
                                            />
                                        </template>
                                    </slot>
                                </th>
                            </slot>
                        </tr>
                    </thead>
                </slot>
                <slot name="tbody">
                    <tbody>
                        <template v-if="loading">
                            <tr
                                v-for="count in 10"
                                :key="count"
                                :class="cn(tableRowVariants())"
                            >
                                <td
                                    v-if="rowSelection"
                                    :class="cn(tableCellVariants())"
                                >
                                    <VSkeleton />
                                </td>
                                <td
                                    v-if="withNumber"
                                    :class="cn(tableCellVariants())"
                                >
                                    <VSkeleton />
                                </td>
                                <td
                                    v-for="(_column, index) in columns"
                                    :key="combineKey('cell', count, index)"
                                    :class="cn(tableCellVariants())"
                                >
                                    <VSkeleton />
                                </td>
                            </tr>
                        </template>
                        <template v-else>
                            <slot
                                name="body"
                                :entries="entries"
                                :columns="columns"
                            >
                                <template v-if="entries.length > 0">
                                    <slot name="firstRow" />
                                    <slot
                                        name="entries"
                                        :entries="entries"
                                        :columns="columns"
                                    >
                                        <tr
                                            v-for="(entry, index) in entries"
                                            :key="combineKey('row', index)"
                                            :class="cn(tableRowVariants())"
                                        >
                                            <td
                                                v-if="rowSelection"
                                                :class="cn(tableColumnVariants(), 'w-[50px] text-center')"
                                            >
                                                <template v-if="!isRowLocked(toValue(entry), index)">
                                                    <VCheckbox
                                                        :checked="isRowChecked(toValue(entry))"
                                                        :disabled="isRowDisabled(toValue(entry), index)"
                                                        @update:checked="handleCheckRow(toValue(entry), $event)"
                                                    />
                                                </template>

                                                <template v-else>
                                                    <button
                                                        type="button"
                                                        class="focus:ring-0 focus:outline-none"
                                                    >
                                                        <Icon
                                                            name="mdi:lock"
                                                            class="w-4 h-4 text-muted-400"
                                                        />
                                                    </button>
                                                </template>
                                            </td>
                                            <td
                                                v-if="withNumber"
                                                :class="cn(tableCellVariants())"
                                            >
                                                {{ startResult + index }}
                                            </td>
                                            <slot
                                                :entry="entry"
                                                :index="index"
                                            >
                                                <td
                                                    v-for="(column, indexColumn) in columns"
                                                    :key="combineKey('cell', index, indexColumn, createUUID())"
                                                    :class="cn(tableCellVariants(), extractCellClass(column, toValue(entry)))"
                                                >
                                                    <component
                                                        :is="column.render(toValue(entry), index)"
                                                        v-if="column.render"
                                                    />
                                                    <span v-else-if="column.key !== '#'">
                                                        {{ toValue(entry)[column.key] }}
                                                    </span>
                                                </td>
                                            </slot>
                                        </tr>
                                    </slot>
                                    <slot name="lastRow" />
                                </template>
                                <template v-else>
                                    <tr :class="cn(tableRowVariants())">
                                        <td
                                            :colspan="columnsLength"
                                            :class="cn(tableCellVariants(), 'py-6')"
                                        >
                                            <VFlex
                                                direction="col"
                                                items="center"
                                            >
                                                <VEmpty data-testid="table-result-not-found" />
                                            </VFlex>
                                        </td>
                                    </tr>
                                </template>
                            </slot>
                        </template>
                    </tbody>
                </slot>
                <slot name="tfoot" />
            </table>
        </div>

        <slot name="footer">
            <div
                v-if="!hideFooter && (!hideLimit || !hidePagination)"
                :class="cn('py-4', inset && insetClass)"
            >
                <div
                    v-if="!hideLimit || !hidePagination"
                    :class="cn('flex items-center gap-4')"
                >
                    <div
                        v-if="!hideLimit"
                        class="w-24"
                    >
                        <VSelect
                            v-if="!loading"
                            v-model="perPage"
                            name="tablePerPage"
                            :options="perPageOptions"
                            label-key="label"
                            value-key="value"
                            :allow-empty="false"
                            :searchable="false"
                            @change="handleChangeLimit"
                        />
                        <VSkeleton
                            v-else
                            width="100%"
                        />
                    </div>
                    <div
                        v-if="!hidePagination"
                        class="flex-1"
                    >
                        <VPagination
                            v-if="shouldShowPagination"
                            v-model:page="currentPage"
                            :per-page="perPage"
                            :total="total"
                            hide-border
                            class="-mt-4"
                            @change="(page) => emits('pageChange', page)"
                        />
                        <VSkeleton
                            v-if="loading"
                            width="100%"
                        />
                    </div>
                </div>
            </div>
        </slot>
    </div>
</template>

<style scoped lang="scss">
.card {
    @apply rounded-[.6rem] bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 shadow-[0_3px_5px_#0000000b] before:z-[-1] before:h-full before:bg-muted-50 dark:before:bg-muted-700 before:absolute before:top-0 before:right-[.875rem] before:left-[.875rem] before:mt-3 before:shadow-[0_1px_2px_#0000000b] before:border before:border-muted-200 dark:before:border-muted-700  before:rounded-lg;
}
</style>
