import type { TableColumn } from '~/components/base/VTable';

export class TableColumnBuilder<TData extends object> {
    private columns: TableColumn<TData>[] = [];

    setColumn(column: TableColumn<TData>): this {
        this.columns.push({
            ...column,
        });
        return this;
    }

    setColumnWithCondition(callback: () => boolean, column: TableColumn<TData>): this {
        if (callback())
            this.columns.push(column);
        return this;
    }

    build() {
        return this.columns;
    }
}
