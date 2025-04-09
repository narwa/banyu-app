<script setup lang="ts">
import { TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText, TagsInputRoot } from 'radix-vue';
import { useField } from 'vee-validate';

type Props = {
    label?: string;
    required?: boolean;
    description?: string;
    name: string;
    modelValue?: string[];
    placeholder?: string;
};

const props = defineProps<Props>();

const { value: tagsValue, errorMessage } = useField(toRef(props, 'name'), undefined, {
    initialValue: props.modelValue || [],
    validateOnMount: false,
    syncVModel: true,
});
</script>

<template>
    <div>
        <VFlex
            direction="col"
            gap="2"
            class="mb-2"
        >
            <VFormLabel
                :label="label"
                :required="required"
            />
            <slot name="description">
                <VFormDescription
                    v-if="description"
                    :name="name"
                >
                    {{ description }}
                </VFormDescription>
            </slot>
        </VFlex>

        <TagsInputRoot
            v-model="tagsValue"
            class="flex gap-2 items-center border p-2 rounded-md w-full flex-wrap text-sm"
            :class="cn({ 'bg-danger-50 border border-red-600': errorMessage })"
        >
            <TagsInputItem
                v-for="item in tagsValue"
                :key="item"
                :value="item"
                class="text-white flex shadow-md items-center justify-center gap-x-2 bg-green-500 aria-[current=true]:bg-green-900 rounded-full p-1"
            >
                <TagsInputItemText class="text-sm px-2 border-r-[1px] border-muted-200" />
                <TagsInputItemDelete class="bg-transparent mb-[-0.5rem] mr-2">
                    <Icon
                        name="lucide:x"
                    />
                </TagsInputItemDelete>
            </TagsInputItem>

            <TagsInputInput
                :placeholder="placeholder"
                class="text-sm focus:outline-none flex-1 rounded-md bg-transparent"
                :class="cn({ 'placeholder:text-red-400': errorMessage })"
            />
        </TagsInputRoot>

        <div
            v-if="errorMessage"
            class="text-red-500 text-sm mt-2"
        >
            {{ errorMessage }}
        </div>
    </div>
</template>
