<script setup lang="ts">
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'radix-vue';

defineProps<{
    value: string;
}>();
</script>

<template>
    <AccordionItem
        :value="value"
        class="border rounded-lg"
    >
        <AccordionHeader>
            <AccordionTrigger
                class="px-4 py-3 text-left bg-gray-100 hover:bg-gray-200 font-medium w-full flex items-center justify-between"
            >
                <slot name="title" />
                <Icon
                    name="lucide:chevron-down"
                    class="transition-transform duration-300"
                    :class="{
                        'rotate-180': $el?.parentElement?.getAttribute('data-state') === 'open',
                    }"
                />
            </AccordionTrigger>
        </AccordionHeader>

        <AccordionContent
            class="px-4 py-3 bg-white data-[state=open]:animate-slide-down data-[state=closed]:animate-slide-up"
        >
            <slot />
        </AccordionContent>
    </AccordionItem>
</template>
