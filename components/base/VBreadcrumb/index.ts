import type { RouteLocationRaw } from 'vue-router';

export type Breadcrumb = {
    name: string;
    to?: RouteLocationRaw;
};
