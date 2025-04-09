<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    headerClass?: HTMLAttributes['class'];
    bodyClass?: HTMLAttributes['class'];
    title?: string;
    text?: string;
};

const props = defineProps<Props>();
</script>

<template>
    <div :class="cn('card', props.class)">
        <slot name="header">
            <div
                v-if="title || text || $slots.action"
                :class="cn('flex justify-between items-center gap-x-6 px-6 py-4 border-b border-muted-200 dark:border-muted-700', headerClass)"
            >
                <div class="flex-1">
                    <slot name="title">
                        <h2
                            v-if="title"
                            level="5"
                            :class="cn('text-base leading-6 font-medium text-muted-800 dark:text-muted-100')"
                        >
                            {{ title }}
                        </h2>
                    </slot>
                    <slot name="text">
                        <p
                            v-if="text"
                            :class="cn('mt-0.5')"
                        >
                            {{ text }}
                        </p>
                    </slot>
                </div>
                <slot name="action" />
            </div>
        </slot>

        <div :class="cn('p-6', bodyClass)">
            <slot />
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    @apply relative rounded-[.6rem] bg-white dark:bg-muted-800 border border-muted-200 dark:border-muted-700 shadow-[0_3px_5px_#0000000b] before:z-[-1] before:h-full before:bg-muted-50 dark:before:bg-muted-700 before:absolute before:top-0 before:right-[.875rem] before:left-[.875rem] before:mt-3 before:shadow-[0_1px_2px_#0000000b] before:border before:border-muted-200 dark:before:border-muted-700  before:rounded-lg;
}
</style>
