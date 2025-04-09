<script setup lang="ts">
import { DASHBOARD_MENUS } from '~/constants';
import { sidebarHeaderVariants, sidebarVariants } from '.';

const emits = defineEmits<{
    hover: [value: boolean];
}>();

const route = useRoute();
const authStore = useAuthStore();

const sidebarRef = useTemplateRef('sidebar');
const isSidebarHovered = useElementHover(sidebarRef);
const isLargeScreen = useMediaQuery('(min-width: 1280px)');

const isSidebarCollapsed = computed(() => !isSidebarHovered.value);

watchEffect(() => {
    emits('hover', isSidebarHovered.value);
});

function isLinkActive(path: string) {
    return path === '/' ? route.path === path : !!route.path?.startsWith(path);
}

const dashboardMenu = computed(() =>
    DASHBOARD_MENUS.filter(menu => !menu.requireAdmin || authStore.user?.userType === 'ADMIN'),
);
</script>

<template>
    <div
        ref="sidebar"
        :class="cn(sidebarVariants(), !isLargeScreen && 'border-transparent')"
    >
        <div :class="cn(sidebarHeaderVariants())">
            <VLink
                :to="{ name: 'index' }"
                variant="unstyled"
            >
                <Icon
                    v-if="isSidebarHovered || !isLargeScreen"
                    name="banyu:nostratech"
                    :size="25"
                />
                <Icon
                    v-else
                    name="banyu:n-icon"
                    :size="25"
                />
            </VLink>
        </div>

        <VScrollbar
            :options="{ suppressScrollX: true }"
            wrapper-class="pb-3 w-full h-full z-20 overflow-hidden [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)]"
        >
            <VFlex
                direction="col"
                class="relative test"
            >
                <VSidebarGroup
                    v-for="(group, index) in dashboardMenu"
                    :key="index"
                >
                    <VSidebarTitle :collapsed="isSidebarCollapsed && isLargeScreen">
                        {{ group.name }}
                    </VSidebarTitle>

                    <VFlex
                        direction="col"
                        gap="1"
                    >
                        <VSidebarLink
                            v-for="(menu, menuIndex) in group.children"
                            :key="menuIndex"
                            :is-active="isLinkActive(menu.path)"
                            :to="{ name: menu.hrefName }"
                        >
                            <template #icon>
                                <Icon :name="menu.icon" />
                            </template>
                            {{ menu.name }}
                        </VSidebarLink>
                    </VFlex>
                </VSidebarGroup>
            </VFlex>
        </VScrollbar>

        <VDropdown>
            <VDropdownTrigger class="z-20">
                <VFlex
                    direction="row"
                    items="center"
                    justify="between"
                    class="p-5 border-t border-light-gray-300"
                >
                    <VFlex
                        direction="row"
                        items="center"
                        gap-x="2"
                    >
                        <VAvatar
                            :avatar-src="authStore.user?.photo"
                            :avatar-fallback="getInitial(authStore.user?.fullName)"
                            :avatar-alt="`${authStore.user?.username} photo profile`"
                        />

                        <VText
                            as="p"
                            variant="sub-body"
                            class="text-primary-800 xl:hidden group-[.sidebar--collapsed.sidebar--hover]:xl:block text-ellipsis whitespace-nowrap overflow-hidden"
                            weight="semibold"
                        >
                            {{ authStore.user?.fullName }}
                        </VText>
                    </VFlex>

                    <div class="xl:hidden group-[.sidebar--collapsed.sidebar--hover]:xl:block">
                        <Icon name="lucide:chevron-up" />
                    </div>
                </VFlex>
            </VDropdownTrigger>

            <VDropdownContent class="fixed -bottom-20 left-12">
                <VDropdownItem
                    as="button"
                    class="w-full text-danger-500"
                    @click="authStore.logout"
                >
                    Logout
                </VDropdownItem>
            </VDropdownContent>
        </VDropdown>
    </div>
</template>
