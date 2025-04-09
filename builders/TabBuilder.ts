import type { Tab } from '~/components/base/VTabs';

export class TabBuilder<TKey extends string> {
    private tabs: Tab<TKey>[] = [];

    setTab(tab: Tab<TKey>): this {
        this.tabs.push(tab);
        return this;
    }

    setTabWithCondition(callback: () => boolean, tab: Tab<TKey>): this {
        if (callback())
            this.tabs.push(tab);
        return this;
    }

    build() {
        return this.tabs;
    }
}
