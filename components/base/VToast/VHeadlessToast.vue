<script setup lang="ts">
type Props = {
    type?: 'success' | 'error';
    title: string;
    message?: string;
};

type Emits = {
    closeToast: [];
};

const { type = 'success' } = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<template>
    <div :class="cn('p-4 pr-8 w-[356px] rounded-lg bg-success-50 border border-muted-200/70 shadow-sm', type === 'error' && 'bg-danger-50')">
        <p :class="cn('font-medium text-muted-600', type === 'error' && 'text-danger-500')">
            {{ title }}
        </p>

        <p
            v-if="message"
            :class="cn('mt-1 text-muted-500')"
        >
            {{ message }}
        </p>
        <button
            :class="cn('absolute top-4 right-1.5 w-6 h-6 p-0 flex justify-center items-center text-muted-400 hover:text-muted-500', type === 'error' && 'text-red-400 hover:text-red-500')"
            @click="emits('closeToast')"
        >
            <Icon name="mdi:close" />
        </button>
    </div>
</template>
