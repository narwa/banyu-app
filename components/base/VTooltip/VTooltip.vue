<script setup lang="ts">
import type { TooltipContentProps, TooltipTriggerProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { TooltipContentVariants } from '.';
import { tooltipArrowVariants, tooltipContentVariants } from '.';

export type TooltipVariant = 'danger' | 'default';

type Props = {
    as?: TooltipTriggerProps['as'];
    class?: HTMLAttributes['class'];
    type?: TooltipContentVariants['type'];
    rounded?: TooltipContentVariants['rounded'];
    position?: TooltipContentProps['side'];
    tooltip?: string;
    closeOnClick?: boolean;
    disableTeleport?: boolean;
};

const props = defineProps<Props>();
</script>

<template>
    <VLibRadixTooltipProvider
        :disable-closing-trigger="!closeOnClick"
        :delay-duration="100"
    >
        <VLibRadixTooltipRoot>
            <slot name="trigger">
                <VTooltipTrigger
                    :as="as"
                    :type="!as || as === 'button' ? 'button' : undefined"
                >
                    <slot />
                </VTooltipTrigger>
            </slot>
            <VLibRadixTooltipPortal :disabled="disableTeleport">
                <VLibRadixTooltipContent
                    v-bind="$attrs"
                    :class="cn(tooltipContentVariants({ rounded, type }), props.class)"
                >
                    {{ tooltip }}
                    <VLibRadixTooltipArrow
                        v-bind="props"
                        :class="cn(tooltipArrowVariants({ type }))"
                    />
                </VLibRadixTooltipContent>
            </VLibRadixTooltipPortal>
        </VLibRadixTooltipRoot>
    </VLibRadixTooltipProvider>
</template>
