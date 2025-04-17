<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';

const props = defineProps<{
    class?: HTMLAttributes['class'];
}>();

const pageStore = usePageStore();
</script>

<template>
    <nav
        aria-label="breadcrumb"
        :class="cn(props.class)"
    >
        <ol class="flex items-center gap-1.5 text-primary-900 sm:gap-2.5 max-w-3xl">
            <template
                v-for="(item, index) in pageStore.breadcrumbList"
                :key="index"
            >
                <li
                    v-if="item.to"
                    class="inline-flex items-center gap-1.5 overflow-hidden"
                >
                    <NuxtLink
                        :to="item.to"
                        class="transition-colors text-primary-900 hover:text-muted-600 truncate whitespace-nowrap block text-sm md:text-base max-w-96"
                    >
                        {{ item.name }}
                    </NuxtLink>
                </li>
                <li
                    v-if="index !== pageStore.breadcrumbList.length - 1"
                    role="presentation"
                    aria-hidden="true"
                    :class="cn('[&>svg]:size-3.5 grid place-items-center', props.class)"
                >
                    <Icon name="mdi:chevron-right" />
                </li>
                <li
                    v-if="!item.to"
                    class="inline-flex items-center gap-1.5 overflow-hidden"
                >
                    <VText
                        as="span"
                        variant="base"
                        weight="medium"
                        role="link"
                        aria-disabled="true"
                        aria-current="page"
                        class="transition-colors text-secondary-900 font-bold truncate whitespace-nowrap max-w-96"
                    >
                        {{ item.name }}
                    </VText>
                </li>
            </template>
        </ol>
    </nav>
</template>
