<script setup lang="ts">
defineOptions({
    name: 'Default',
});

const pageStore = usePageStore();
const isSidebarMobileOpen = shallowRef<boolean>(false);
const isSidebarHovered = shallowRef<boolean>(false);
const isLargeScreen = useMediaQuery('(min-width: 1280px)');

watchEffect(() => {
    if (isLargeScreen.value)
        isSidebarMobileOpen.value = false;
});
</script>

<template>
    <div
        :class="cn('group sidebar--collapsed transition-[margin] duration-300 xl:shadow-none fixed top-0 left-0 z-50 xl:ml-0 shadow-xl after:fixed after:inset-0 after:bg-muted-900/70 after:backdrop-blur after:xl:hidden [&.sidebar--open]:ml-0 [&.sidebar--open]:after:block -ml-[275px] after:hidden', isSidebarHovered && 'sidebar--hover', {
            'sidebar--open': isSidebarMobileOpen && !isLargeScreen,
        })"
    >
        <div
            :class="cn('fixed ml-[232px] w-10 h-10 items-center justify-center hidden z-50 mt-2 ', {
                flex: isSidebarMobileOpen && !isLargeScreen,
            })"
        >
            <button
                type="button"
                @click="isSidebarMobileOpen = false"
            >
                <Icon
                    name="lucide:x"
                    class="text-muted-400"
                />
            </button>
        </div>
        <VSidebar @hover="(value) => isSidebarHovered = value" />
        <VHeader @mobile-open="(value) => isSidebarMobileOpen = value">
            <template #header-info>
                <slot name="header-info" />
            </template>
            <template #header-actions>
                <slot name="header-actions" />
            </template>
        </VHeader>
    </div>

    <slot name="ok" />

    <main class="bg-light-gray-100 transition-[margin,width] min-h-screen duration-100 px-5 pt-[39px] pb-16 content--compact xl:ml-[275px] [&.content--compact]:xl:ml-[91px]">
        <div class="mt-10">
            <VFlex
                items="start"
                gap="3"
                class="flex-col lg:flex-row lg:items-center lg:justify-between"
            >
                <VFlex
                    v-if="!pageStore.isLoadingTitle"
                    direction="col"
                    type="1"
                    gap="2"
                >
                    <VText
                        v-if="pageStore.title"
                        as="h1"
                        variant="h1"
                        class="mt-10"
                    >
                        {{ pageStore.title }}
                    </VText>
                </VFlex>

                <VFlex
                    v-else
                    direction="col"
                    type="1"
                    gap="2"
                >
                    <VSkeleton class="max-w-sm" />
                    <VSkeleton class="max-w-[150px]" />
                </VFlex>

                <div id="page__action" />
            </VFlex>
            <VFlex
                direction="col"
                class="mt-4"
            >
                <slot />
            </VFlex>
        </div>
    </main>
</template>
