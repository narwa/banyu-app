<script setup lang="ts">
import type { HTMLAttributes } from 'vue';

type Props = {
    avatarSrc?: string;
    avatarFallback: string;
    avatarAlt: string;
    fallbackDelayMs?: number;
    rootClass?: HTMLAttributes['class'];
    avatarClass?: HTMLAttributes['class'];
    fallbackClass?: HTMLAttributes['class'];
};

const { avatarSrc = '', fallbackDelayMs = 600 } = defineProps<Props>();
</script>

<template>
    <VLibRadixAvatarRoot :class="cn('inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle', rootClass)">
        <VLibRadixAvatarImage
            :class="cn('h-full w-full rounded-[inherit] object-cover', avatarClass)"
            :src="avatarSrc"
            :alt="avatarAlt"
        />
        <VLibRadixAvatarFallback
            :class="cn('text-gray-50 leading-1 flex h-full w-full items-center justify-center bg-primary text-[15px] font-semibold', fallbackClass)"
            :delay-ms="fallbackDelayMs"
        >
            {{ avatarFallback }}
        </VLibRadixAvatarFallback>
    </VLibRadixAvatarRoot>
</template>
