<script setup lang="ts">
type Emits = {
    mobileOpen: [value: boolean];
};
const emits = defineEmits<Emits>();
</script>

<template>
    <section class="bg-white fixed h-20 transition-[margin] duration-100 xl:ml-[275px] group-[.sidebar--collapsed]:xl:ml-[90px] inset-x-0 top-0 before:content-['']">
        <div class="absolute inset-x-0 h-full">
            <VFlex
                class="bg-white h-full bg-transparent border-b border-light-gray-300 shadow-smooth"
                items="center"
            >
                <VFlex
                    type="1"
                    items="center"
                    gap="1"
                    class="xl:hidden"
                >
                    <VButtonIcon
                        type="button"
                        class="grid place-items-center mx-5"
                        @click="emits('mobileOpen', true)"
                    >
                        <Icon
                            name="lucide:align-justify"
                            :size="20"
                        />
                    </VButtonIcon>
                </VFlex>

                <VFlex
                    class="hidden xl:flex mx-5"
                    type="1"
                    gap="4"
                    items="center"
                >
                    <VBreadcrumb />
                    <slot name="header-info" />
                </VFlex>

                <VFlex
                    type="1"
                    justify="end"
                    items="center"
                    gap-x="4"
                    class="mx-5"
                >
                    <slot name="header-actions" />
                </VFlex>
            </VFlex>
        </div>
    </section>
</template>
