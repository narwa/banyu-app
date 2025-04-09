<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    class?: HTMLAttributes['class'];
    headerClass?: HTMLAttributes['class'];
    bodyClass?: HTMLAttributes['class'];
    title?: string;
    text?: string;
    layout?: 'vertical' | 'horizontal';
    accordion?: boolean;
    accordionOpen?: boolean;
    required?: boolean;
};

const { accordion = false, accordionOpen = true, ...props } = defineProps<Props>();
</script>

<template>
    <VLibRadixAccordionRoot
        v-if="accordion && layout !== 'horizontal'"
        :default-value="accordionOpen ? 'accordion' : undefined"
        class="section section__accordion"
        type="single"
        collapsible
    >
        <VLibRadixAccordionItem
            v-slot="{ open }"
            value="accordion"
        >
            <VLibRadixAccordionHeader :class="cn('cursor-pointer border-b border-muted-100 pb-4 w-full dark:border-muted-700', props.headerClass)">
                <VFlex
                    items="center"
                    justify="between"
                    class="gap-3"
                >
                    <VLibRadixAccordionTrigger as-child>
                        <VFlex
                            type="1"
                            class="gap-3"
                            justify="between"
                        >
                            <VFlex direction="col">
                                <slot name="title">
                                    <h3
                                        v-if="title"
                                        :class="cn('font-bold text-xl text-muted-800 dark:text-muted-100')"
                                    >
                                        {{ title }}
                                        <span
                                            v-if="required"
                                            :class="cn(required && 'text-danger-600 dark:text-danger-300')"
                                        >
                                            *
                                        </span>
                                    </h3>
                                </slot>
                                <slot name="text">
                                    <span
                                        v-if="text"
                                        :class="cn('mt-1 block text-sm text-muted-500 dark:text-muted-300')"
                                    >
                                        {{ text }}
                                    </span>
                                </slot>
                            </VFlex>

                            <VFlex
                                items="center"
                                :class="cn('gap-3')"
                            >
                                <div>
                                    <VButtonIcon>
                                        <Icon
                                            name="lucide:chevron-down"
                                            :class="cn('w-5 h-5 transition', { 'transform rotate-180': open })"
                                        />
                                    </VButtonIcon>
                                </div>
                            </VFlex>
                        </VFlex>
                    </VLibRadixAccordionTrigger>

                    <slot name="actions" />
                </VFlex>
                <slot name="subHeader" />
            </VLibRadixAccordionHeader>

            <div
                v-show="open"
                :class="cn('pt-6', props.bodyClass)"
            >
                <slot />
            </div>
        </VLibRadixAccordionItem>
    </VLibRadixAccordionRoot>
    <div
        v-else
        :class="
            cn(
                'w-full',
                {
                    'grid grid-cols-12': layout === 'horizontal',
                },
                props.class,
            )
        "
    >
        <div
            :class="
                cn(
                    'flex justify-between border-b border-muted-100 pb-4 mb-4 w-full dark:border-muted-700',
                    layout === 'horizontal' && 'border-0 lg:mb-0 lg:pb-0 col-span-12 lg:col-span-5',
                    props.headerClass,
                )
            "
        >
            <div :class="cn('w-full', layout === 'horizontal' && 'lg:max-w-xs', props.headerClass)">
                <slot name="title">
                    <h3
                        v-if="title"
                        :class="cn('font-medium text-sm text-muted-800 dark:text-muted-100', layout === 'horizontal' && 'text-base')"
                    >
                        {{ title }}
                    </h3>
                </slot>
                <slot name="text">
                    <span
                        v-if="text"
                        :class="
                            cn('block text-sm text-muted-500 dark:text-muted-300', layout === 'horizontal' && 'text-xs mt-1')
                        "
                    >
                        {{ text }}
                    </span>
                </slot>
            </div>
            <div :class="cn('flex items-center gap-3')">
                <slot name="actions" />
            </div>
        </div>
        <div
            :class="
                cn(
                    layout === 'horizontal' && 'col-span-12 lg:col-span-7',
                    props.bodyClass,
                )
            "
        >
            <slot />
        </div>
    </div>
</template>
