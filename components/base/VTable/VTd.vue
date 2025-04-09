<script setup lang="ts">
import { tableCellVariants } from '.';
</script>

<template>
    <td :class="cn(tableCellVariants())">
        <slot />
    </td>
</template>
