<script setup lang="ts" generic="TKey extends string, TData extends Tab<TKey>">
import type { HTMLAttributes } from 'vue';
import type { Tab } from '.';

  type Props = {
      tabs: TData[];
      class?: HTMLAttributes['class'];
      position?: 'start' | 'center' | 'end';
      justified?: boolean;
      defaultValue?: string;
  };

const { position = 'center', justified = false, ...props } = defineProps<Props>();
</script>

<template>
    <VTabsRoot :default-value="defaultValue">
        <VFlex
            items="center"
            class="overflow-auto"
            gap="4"
        >
            <VTabsList
                :class="cn('relative flex flex-1 w-full gap-4 p-0', {
                    'justify-start': position === 'start',
                    'justify-center': position === 'center',
                    'justify-end': position === 'end',
                }, props.class)"
            >
                <VTabsIndicator />
                <VTabsTrigger
                    v-for="(tab, index) in tabs"
                    :key="index"
                    :justified="justified"
                    :value="tab.key"
                >
                    <VFlex
                        items="center"
                        gap="2"
                    >
                        {{ tab.name }}
                        <component
                            :is="tab.icon"
                            v-if="tab.icon"
                        />
                    </VFlex>
                </VTabsTrigger>
            </VTabsList>
            <slot name="actions" />
        </VFlex>

        <slot />
    </VTabsRoot>
</template>
