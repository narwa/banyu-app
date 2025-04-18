<script setup lang="ts">
import type { AreaUpdateRequest } from '~/services/AreaService';
import { BreadcrumbBuilder } from '~/builders/BreadcrumbBuilder';
import { useMutationDeleteArea } from '~/composables/area/mutations/useDeleteArea';
import { useMutationUpdateArea } from '~/composables/area/mutations/useUpdateArea';
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

// Edit mode state
const isEditing = ref(false);
const editForm = ref<AreaUpdateRequest>({
    code: areaDetail.code,
    description: areaDetail.description,
    rates: areaDetail.rates.length > 0
        ? [...areaDetail.rates]
        : [{
                tierStart: 0,
                tierEnd: null,
                ratePerUnit: 0,
            }],
});

// Update area mutation
const { mutateAsync: updateArea, isPending: isUpdating } = useMutationUpdateArea({
    onSuccess: (data) => {
        // Update local data
        Object.assign(areaDetail, data);
        queryClient.setQueryData(['areaDetail'], data);
        isEditing.value = false;
    },
});

// Delete area mutation
const { mutateAsync: deleteArea, isPending: isDeleting } = useMutationDeleteArea({
    onSuccess: () => {
        // Navigate back to area list after successful deletion
        navigateTo('/area');
    },
});

// Delete area confirmation
const showDeleteConfirm = ref(false);

// Handle delete area
async function handleDeleteArea() {
    try {
        showDeleteConfirm.value = true;
    }
    catch (error) {
        console.error('Failed to delete area:', error);
    }
}

// Confirm delete area
async function confirmDeleteArea() {
    try {
        await deleteArea({ areaCode: code.value });
    }
    catch (error) {
        console.error('Failed to delete area:', error);
        showDeleteConfirm.value = false;
    }
}

// Cancel delete area
function cancelDeleteArea() {
    showDeleteConfirm.value = false;
}

// Start editing
function startEditing() {
    editForm.value = {
        code: areaDetail.code,
        description: areaDetail.description,
        rates: JSON.parse(JSON.stringify(areaDetail.rates)),
    };
    isEditing.value = true;
}

// Cancel editing
function cancelEditing() {
    isEditing.value = false;
}

// Save changes
async function saveChanges() {
    try {
        await updateArea(editForm.value);
    }
    catch (error) {
        console.error('Failed to update area:', error);
    }
}

// Add new rate tier
function addRateTier() {
    editForm.value.rates.push({
        tierStart: 0,
        tierEnd: null,
        ratePerUnit: 0,
    });
}

// Remove rate tier
function removeRateTier(index: number) {
    editForm.value.rates.splice(index, 1);
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
                            {{ areaDetail.code }}
                        </VText>
                        <div v-if="!isEditing">
                            <VText
                                as="p"
                                variant="base"
                                class="text-muted-500"
                            >
                                {{ areaDetail.description }}
                            </VText>
                        </div>
                        <div v-else>
                            <VInput
                                v-model="editForm.description"
                                placeholder="Area Description"
                                class="mb-2 max-w-md"
                                name="description"
                            />
                        </div>
                    </VFlex>
                </div>
                <div>
                    <VButton
                        v-if="!isEditing"
                        variant="primary"
                        @click="startEditing"
                    >
                        Edit Area
                    </VButton>
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
                        as="h3"
                        variant="h5"
                    >
                        Water Rates
                    </VText>

                    <!-- View Mode Table -->
                    <div
                        v-if="!isEditing"
                        class="overflow-x-auto"
                    >
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
                                        {{ rate.tierEnd === null ? 'Unlimited' : rate.tierEnd }}
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

                    <!-- Edit Mode Table -->
                    <div
                        v-else
                        class="overflow-x-auto"
                    >
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
                                    v-for="(rate, index) in editForm.rates"
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
                                            variant="danger"
                                            size="sm"
                                            @click="removeRateTier(index)"
                                        >
                                            Remove
                                        </VButton>
                                    </td>
                                </tr>
                                <tr v-if="!editForm.rates || editForm.rates.length === 0">
                                    <td
                                        colspan="4"
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
                            Back to List
                        </VButton>
                    </NuxtLink>

                    <VButton
                        v-if="!isEditing"
                        variant="danger"
                        size="md"
                        :loading="isDeleting"
                        @click="handleDeleteArea"
                    >
                        Delete Area
                    </VButton>
                </VFlex>

                <!-- Right side buttons (only in edit mode) -->
                <VFlex
                    v-if="isEditing"
                    justify="between"
                    gap="4"
                >
                    <VFlex
                        gap="2"
                    >
                        <VButton
                            variant="secondary"
                            @click="cancelEditing"
                        >
                            Cancel
                        </VButton>
                        <VButton
                            variant="primary"
                            :loading="isUpdating"
                            @click="saveChanges"
                        >
                            Save Changes
                        </VButton>
                    </VFlex>

                    <VButton
                        variant="secondary"
                        size="sm"
                        @click="addRateTier"
                    >
                        Add Tier
                    </VButton>
                </VFlex>
            </VFlex>
        </VCard>
    </NuxtLayout>

    <!-- Delete Confirmation Modal -->
    <VModal
        v-if="showDeleteConfirm"
        @close="cancelDeleteArea"
    >
        <div class="p-6">
            <VText
                as="h3"
                variant="h4"
                weight="semibold"
                class="mb-4"
            >
                Confirm Deletion
            </VText>
            <VText
                as="p"
                variant="base"
                class="mb-6"
            >
                Are you sure you want to delete area <strong>{{ areaDetail.code }}</strong>? This action cannot be undone.
            </VText>
            <VFlex
                justify="end"
                gap="2"
            >
                <VButton
                    variant="secondary"
                    @click="cancelDeleteArea"
                >
                    Cancel
                </VButton>
                <VButton
                    variant="danger"
                    :loading="isDeleting"
                    @click="confirmDeleteArea"
                >
                    Delete
                </VButton>
            </VFlex>
        </div>
    </VModal>
</template>
