<script setup lang="ts">
definePageMeta({
    layout: false,
    middleware: ['auth', 'super-admin'],
    name: 'user-detail',
});

useSeoMeta({
    title: 'User Detail',
});
</script>

<template>
    <NuxtLayout name="default">
        User Page Detail
    </NuxtLayout>
</template>
