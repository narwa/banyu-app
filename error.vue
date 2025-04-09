<script setup lang="ts">
import type { NuxtError } from '#app';
import { ERROR_LIST } from './constants';

const props = defineProps<Props>();

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
});

type Props = {
    error: NuxtError;
};

const statusCode = computed(() => props.error?.statusCode || 500);
const errorContent = computed(() => ERROR_LIST.find(error => error.statusCode === statusCode.value));

useSeoMeta({
    title: `${statusCode.value} - ${errorContent.value?.title}`,
    description: errorContent.value?.description,
    ogTitle: `${statusCode.value} - ${errorContent.value?.title}`,
    ogDescription: errorContent.value?.description,
    twitterTitle: errorContent.value?.title,
    twitterDescription: errorContent.value?.description,
});
</script>

<template>
    <NuxtLayout name="blank">
        <VFlex
            direction="col"
            justify="center"
            class="min-h-screen bg-yellow-50 text-center space-y-6"
            space-y="6"
        >
            <VText
                as="h1"
                variant="h1"
                class="text-8xl md:text-[6.6rem] text-yellow-800"
                italic
            >
                {{ errorContent?.statusCode }}
            </VText>

            <div class="border-t border-light-green-300 rounded-tr-[18%] pt-6 md:pt-12">
                <VContainer class="max-w-3xl space-y-4">
                    <VText
                        as="h4"
                        variant="h4"
                    >
                        {{ errorContent?.heading }}
                    </VText>

                    <VText
                        as="p"
                        variant="body"
                        class="text-yellow-800"
                    >
                        {{ errorContent?.description }}
                    </VText>
                </VContainer>

                <div class="pt-8">
                    <VLink
                        variant="primary"
                        size="xl"
                        rounded="xl"
                        :to="{ name: 'index' }"
                        aria-label="Link to Home"
                    >
                        Return to Homepage
                        <Icon name="mdi:arrow-right" />
                    </VLink>
                </div>
            </div>
        </VFlex>
    </NuxtLayout>
</template>
