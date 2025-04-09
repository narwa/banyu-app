<script lang="ts" setup>
import { PromiseDialogsWrapper } from 'vue-promise-dialogs';
import { useMutationGetDetailProfile } from './composables/user/useMutationGetDetailProfile';

useHead({
    htmlAttrs: {
        lang: 'en',
    },
    link: [
        {
            rel: 'icon',
            type: 'image/svg',
            href: '/favicon.svg',
        },
    ],
    titleTemplate: 'Nostratech Back Office - %s',
});

const authStore = useAuthStore();
const { mutateAsync: getDetailProfile } = useMutationGetDetailProfile();

watchImmediate(
    () => authStore.token,
    async () => {
        if (!authStore.token) {
            return;
        }

        await getDetailProfile();
    },
);
</script>

<template>
    <VToast
        position="top-right"
        close-button
    />
    <PromiseDialogsWrapper />
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
