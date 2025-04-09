<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    titleClass?: HTMLAttributes['class'];
    textClass?: HTMLAttributes['class'];
    title?: string;
    text?: string | number;
    loading?: boolean;
    layout?: 'vertical' | 'horizontal';
};

const { layout = 'vertical', loading = false, ...props } = defineProps<Props>();
</script>

<template>
    <dl
        :class="
            cn(
                'description__item',
                layout === 'horizontal' && 'flex items-center justify-between gap-2',
                props.class,
            )
        "
    >
        <slot name="title">
            <dt
                v-if="title"
                :class="
                    cn(
                        'description__title font-medium text-muted-800 dark:text-muted-100',
                        layout === 'horizontal' && loading && 'whitespace-nowrap',
                        props.titleClass)
                "
            >
                {{ title }}
            </dt>
        </slot>
        <template v-if="!loading">
            <dd
                :class="
                    cn(
                        'description__text mt-1.5',
                        layout === 'horizontal' && 'lg:mt-0',
                        props.textClass,
                    )
                "
            >
                <slot> {{ text }} </slot>
            </dd>
        </template>
        <VSkeleton
            v-else
            :class="
                cn('description__loading w-full h-4 mt-1', layout === 'horizontal' && 'lg:mt-0', layout === 'horizontal' && loading && 'max-w-xs')
            "
        />
    </dl>
</template>
