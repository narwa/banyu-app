import type { Breadcrumb } from '~/components/base/VBreadcrumb';

export class BreadcrumbBuilder {
    private breadcrumbList: Breadcrumb[] = [];

    setBreadcrumb({ name, to }: Breadcrumb): this {
        this.breadcrumbList.push({ name, to });
        return this;
    }

    setBreadcrumbWithCondition(callback: () => boolean, { name, to }: Breadcrumb): this {
        if (callback())
            this.breadcrumbList.push({ name, to });
        return this;
    }

    resetColumn(): this {
        this.breadcrumbList = [];
        return this;
    }

    build() {
        return this.breadcrumbList;
    }
}
