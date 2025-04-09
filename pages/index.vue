<script lang="ts" setup>
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';

useSeoMeta({
    title: 'Dashboard',
});

definePageMeta({
    middleware: 'auth',
});

const pageStore = usePageStore();

pageStore.setTitle('Dashboard');
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Dashboard',
        })
        .build(),
);
</script>
