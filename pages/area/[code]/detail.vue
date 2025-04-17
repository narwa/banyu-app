<script setup lang="ts">
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationGetAreaDetail } from '~/composables/area/queries/useQueryAreaDetail';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'area-detail',
});

useSeoMeta({
    title: 'Area Detail',
});

const route = useRoute();
const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
            to: '/area',
        })
        .setBreadcrumb({
            name: 'Area Detail',
        })
        .build(),
);

const code = computed(() => route.params.code.toString());
pageStore.setTitle('');

const queryClient = useQueryClient();
const { mutateAsync: getAreaDetail } = useMutationGetAreaDetail();
const areaDetail = await getAreaDetail({ areaCode: code.value });
queryClient.setQueryData(['areaDetail'], areaDetail);
</script>

<template>
    <NuxtLayout name="default">
        <VCard>
            <VFlex
                gap-x="2"
                class="border-b pb-4"
            >
                <div class="flex-1">
                    <VFlex
                        direction="col"
                        gap="1"
                    >
                        <VText
                            as="h1"
                            variant="h3"
                            weight="semibold"
                        >
                            {{ areaDetail.code }}
                        </VText>
                        <VText
                            as="p"
                            variant="base"
                            class="text-muted-500"
                        >
                            {{ areaDetail.description }}
                        </VText>
                    </VFlex>
                </div>
            </VFlex>

            <VFlex
                direction="col"
                gap="4"
                class="mt-4"
            >
                <VFlex
                    direction="col"
                    gap="2"
                >
                    <VText
                        as="h2"
                        variant="h4"
                        weight="semibold"
                    >
                        Water Rates
                    </VText>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Tier Start
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Tier End
                                    </th>
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Rate Per Unit
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(rate, index) in areaDetail.rates"
                                    :key="index"
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ rate.tierStart }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ rate.tierEnd }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {{ rate.ratePerUnit }}
                                    </td>
                                </tr>
                                <tr v-if="!areaDetail.rates || areaDetail.rates.length === 0">
                                    <td
                                        colspan="3"
                                        class="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No rates available for this area
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </VFlex>
            </VFlex>
        </VCard>
    </NuxtLayout>
</template>
