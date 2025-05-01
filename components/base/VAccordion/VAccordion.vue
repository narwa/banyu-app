<script setup lang="ts">
import { AccordionRoot } from 'radix-vue';
</script>

<template>
    <AccordionRoot
        type="single"
        collapsible
        class="w-full mx-auto space-y-2"
    >
        <slot />
    </AccordionRoot>
</template>
