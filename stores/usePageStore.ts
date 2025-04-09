import type { Breadcrumb } from '~/components/base/VBreadcrumb';

export const usePageStore = defineStore(
    'page',
    () => {
        const title = ref<string>();
        const breadcrumbList = ref<Breadcrumb[]>([]);
        const isLoadingTitle = ref<boolean>(false);

        function setTitle(value?: string) {
            title.value = value;
        }

        function setBreadcrumbList(value: Breadcrumb[]) {
            breadcrumbList.value = value;
        }

        function setLoadingTitle(value: boolean) {
            isLoadingTitle.value = value;
        }

        return {
            breadcrumbList,
            title,
            isLoadingTitle,
            setBreadcrumbList,
            setTitle,
            setLoadingTitle,
        };
    },
);
