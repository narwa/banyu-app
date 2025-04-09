<script setup lang="ts">
import type { RadioGroupRootEmits, RadioGroupRootProps } from 'radix-vue';
import type { HTMLAttributes } from 'vue';
import { useForwardPropsEmits } from 'radix-vue';

const props = defineProps<RadioGroupRootProps & {
    class?: HTMLAttributes['class'];
}>();
const emits = defineEmits<RadioGroupRootEmits>();

const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;
    return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
    <VLibRadixRadioGroupRoot
        :class="props.class"
        v-bind="forwarded"
    >
        <slot />
    </VLibRadixRadioGroupRoot>
</template>
