<script setup lang="ts">
import type { DialogRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import type { DialogVariants } from '.';
import { useForwardPropsEmits } from 'radix-vue';
import { dialogVariants } from '.';

type Props = DialogRootProps & {
    class?: HTMLAttributes['class'];
    contentClass?: HTMLAttributes['class'];
    rounded?: DialogVariants['rounded'];
    size?: DialogVariants['size'];
    title?: string;
    text?: string;
    hideClose?: boolean;
};
type Emits = {
    'update:open': [value: boolean];
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const delegatedProps = computed(() => {
    const {
        class: _class,
        rounded: _rounded,
        size: _size,
        title: _title,
        text: _text,
        ...delegated
    } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const hideHeader = computed(() => !props.title && !props.text);
</script>

<template>
    <VLibRadixDialogRoot v-bind="forwarded">
        <slot name="trigger" />

        <VLibRadixDialogPortal>
            <VLibRadixDialogOverlay
                class="fixed inset-0 z-50 grid place-items-center overflow-y-auto backdrop-blur bg-muted-900/70  dark:bg-muted-800/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 py-10"
            >
                <VLibRadixDialogContent
                    :class="cn(dialogVariants({ size, rounded }), contentClass)"
                    @pointer-down-outside="(event) => {
                        const originalEvent = event.detail.originalEvent;
                        const target = originalEvent.target as HTMLElement;
                        if (originalEvent.offsetX > target.clientWidth || originalEvent.offsetY > target.clientHeight) {
                            event.preventDefault();
                        }
                    }"
                >
                    <slot name="header">
                        <div
                            :class="cn('mb-5 flex justify-between pb-4 border-b border-muted-200 dark:border-muted-700', {
                                'sr-only': hideHeader,
                            })"
                        >
                            <VFlex direction="col">
                                <VLibRadixDialogTitle :class="cn('text-base font-medium text-muted-800 flex-grow dark:text-muted-100')">
                                    {{ title }}
                                </VLibRadixDialogTitle>

                                <VLibRadixDialogDescription :class="cn('text-sm mt-0.5', !title && 'mt-0')">
                                    {{ text }}
                                </VLibRadixDialogDescription>
                            </VFlex>

                            <VFlex gap="2">
                                <slot name="actions" />
                                <div v-if="!hideClose || !hideHeader">
                                    <VDialogClose />
                                </div>
                            </VFlex>
                        </div>
                    </slot>
                    <slot />
                </VLibRadixDialogContent>
            </VLibRadixDialogOverlay>
        </VLibRadixDialogPortal>
    </VLibRadixDialogRoot>
</template>
