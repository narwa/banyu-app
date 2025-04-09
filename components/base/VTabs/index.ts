export type Tab<TKey extends string> = {
    key: TKey;
    name: string;
    icon?: VNode;
};
