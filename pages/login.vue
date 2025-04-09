<script setup lang="ts">
import { definePageMeta } from '#imports';
import { useRouter } from 'vue-router';
import { authService } from '~/services/AuthService';
import { useAuthStore } from '~/stores/useAuthStore';

definePageMeta({
    layout: 'blank',
    title: 'Login',
    name: 'login',
    middleware: 'guest',
});

useSeoMeta({
    title: 'Login',
    description: 'Login to BanyuApp Backoffice',
    keywords: 'login, BanyuApp, backoffice',
});

const router = useRouter();
const authStore = useAuthStore();
const { loginAuth, loginFirebase } = authService();

const { showNotification } = useNotification();

const signInWithGoogle = async () => {
    const result = await loginFirebase();
    const user = result.user;

    const token = await user.getIdToken();
    try {
        const response = await loginAuth(token);
        if (response && response.data.value?.token) {
            authStore.setToken(response.data.value?.token);
            router.push({ name: 'index' });
            showNotification({
                type: 'success',
                title: 'Login Successful',
                message: 'Welcome to BanyuApp Backoffice',
            });
        }
    }
    catch (error) {
        if (error instanceof Error) {
            showNotification({
                type: 'error',
                title: 'Error Login',
                message: error.message || 'Something went wrong please try again',
            });
        };
    }
};
</script>

<template>
    <section class="h-screen bg-primary">
        <div class="container mx-auto px-4 lg:px-16 grid grid-cols-1 place-items-center lg:grid-cols-2 h-full gap-x-6">
            <div class="w-full hidden lg:block">
                <img
                    src="/images/water-drop.webp"
                    alt="Discussion"
                    class="object-contain"
                    loading="lazy"
                    width="2112"
                >
            </div>
            <div class="max-w-lg h-80 lg:h-[22.5rem] p-8 space-y-6 rounded-lg bg-white shadow-lg flex flex-col items-center justify-center">
                <img
                    src="/images/banyu-app-text.png"
                    alt="Discussion"
                    class="object-contain h-20"
                    loading="lazy"
                    height="100"
                >
                <VText
                    as="h5"
                    variant="h5"
                    class="text-center font-bold text-primary-500"
                >
                    BanyuApp Backoffice
                </VText>
                <VButton
                    variant="primary"
                    class="rounded-sm"
                    @click="signInWithGoogle"
                >
                    <Icon
                        name="mdi:google"
                    />
                    <span class="text-base">Sign in with BanyuApp Google email</span>
                </VButton>
            </div>
        </div>
    </section>
</template>
