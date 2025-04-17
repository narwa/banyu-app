<script setup lang="ts">
import type { AreaCreateRequest } from '~/services/AreaService';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationCreateArea } from '~/composables/area/mutations/useCreateArea';

definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'area-create',
});

useSeoMeta({
    title: 'Create Area',
});

const pageStore = usePageStore();
pageStore.setBreadcrumbList(
    new BreadcrumbBuilder()
        .setBreadcrumb({
            name: 'Area',
            to: '/area',
        })
        .setBreadcrumb({
            name: 'Create Area',
        })
        .build(),
);

pageStore.setTitle('');

// Form data
const areaForm = ref<AreaCreateRequest>({
    code: '',
    description: '',
    rates: [{
        tierStart: 0,
        tierEnd: null,
        ratePerUnit: 0,
    }],
});

// Create area mutation
const { mutateAsync: createArea, isPending: isCreating } = useMutationCreateArea({
    onSuccess: (data) => {
        // Check if we have a valid area code
        if (data && data.code) {
            // Navigate to the new area's detail page
            navigateTo(`/area/${data.code}/detail`);
        }
        else {
            // If code is missing, navigate to the list page and show a message
            console.error('Created area is missing code in response:', data);
            navigateTo('/area');
        }
    },
    onError: (error) => {
        console.error('Failed to create area:', error);
    },
});

// Add new rate tier
function addRateTier() {
    areaForm.value.rates.push({
        tierStart: 0,
        tierEnd: null,
        ratePerUnit: 0,
    });
}

// Remove rate tier
function removeRateTier(index: number) {
    areaForm.value.rates.splice(index, 1);
}

// Save changes
async function saveChanges() {
    try {
        // Make sure we have required fields
        if (!areaForm.value.code || !areaForm.value.description) {
            // Skip submission if required fields are missing
            return;
        }

        // Call the create area service
        await createArea(areaForm.value);
    }
    catch (error) {
        console.error('Failed to create area:', error);
    }
}
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
                            as="h3"
                            variant="h5"
                            weight="semibold"
                        >
                            Create New Area
                        </VText>
                    </VFlex>
                </div>
            </VFlex>

            <!-- Form Fields -->
            <VFlex
                direction="col"
                gap="4"
                class="mt-4"
            >
                <!-- Area Code -->
                <VFlex
                    direction="col"
                    gap="2"
                >
                    <label
                        for="areaCode"
                        class="text-sm font-medium"
                    >
                        Area Code
                    </label>
                    <VInput
                        id="areaCode"
                        v-model="areaForm.code"
                        name="areaCode"
                        placeholder="Enter area code"
                        class="max-w-md"
                    />
                </VFlex>

                <!-- Area Description -->
                <VFlex
                    direction="col"
                    gap="2"
                >
                    <label
                        for="areaDescription"
                        class="text-sm font-medium"
                    >
                        Description
                    </label>
                    <VInput
                        id="areaDescription"
                        v-model="areaForm.description"
                        name="areaDescription"
                        placeholder="Enter area description"
                        class="max-w-md"
                    />
                </VFlex>

                <!-- Water Rates -->
                <VFlex
                    direction="col"
                    gap="2"
                >
                    <VText
                        as="h3"
                        variant="h5"
                    >
                        Water Rates
                    </VText>

                    <!-- Rates Table -->
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
                                    <th
                                        scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr
                                    v-for="(rate, index) in areaForm.rates"
                                    :key="index"
                                    class="hover:bg-gray-50"
                                >
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <VInput
                                            v-model.number="rate.tierStart"
                                            type="number"
                                            class="w-24"
                                            name="tierStart"
                                        />
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <VInput
                                            :model-value="rate.tierEnd === null ? '' : rate.tierEnd"
                                            type="number"
                                            class="w-24"
                                            placeholder="Unlimited"
                                            name="tierEnd"
                                            @update:model-value="(val) => rate.tierEnd = val === '' ? null : Number(val)"
                                        />
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <VInput
                                            v-model.number="rate.ratePerUnit"
                                            type="number"
                                            class="w-24"
                                            name="ratePerUnit"
                                        />
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <VButton
                                            v-if="areaForm.rates.length > 1"
                                            variant="danger"
                                            size="sm"
                                            @click="removeRateTier(index)"
                                        >
                                            Remove
                                        </VButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </VFlex>
            </VFlex>

            <!-- Bottom action bar -->
            <VFlex
                justify="between"
                class="mt-6 pt-4 border-t border-gray-200"
            >
                <!-- Left side buttons -->
                <VFlex
                    gap="2"
                >
                    <NuxtLink to="/area">
                        <VButton
                            variant="secondary"
                            size="md"
                        >
                            <VIcon
                                name="arrow-left"
                                class="mr-1"
                            />
                            Back to List
                        </VButton>
                    </NuxtLink>
                </VFlex>

                <!-- Right side buttons -->
                <VFlex
                    gap="4"
                >
                    <VButton
                        variant="secondary"
                        size="sm"
                        @click="addRateTier"
                    >
                        Add Tier
                    </VButton>

                    <VButton
                        variant="primary"
                        :loading="isCreating"
                        @click="saveChanges"
                    >
                        Create Area
                    </VButton>
                </VFlex>
            </VFlex>
        </VCard>
    </NuxtLayout>
</template>
