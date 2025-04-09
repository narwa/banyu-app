<script setup lang="ts">
import { tableRowVariants } from '.';
</script>

<template>
    <tr :class="cn(tableRowVariants())">
        <slot />
    </tr>
</template>
