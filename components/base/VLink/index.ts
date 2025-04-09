import type { NuxtLinkProps } from '#app';
import type { HTMLAttributes } from 'vue';
import type { ButtonVariants } from '../VButton';

export type Props = {
    class?: HTMLAttributes['class'];
    variant: ButtonVariants['variant'];
    rounded?: ButtonVariants['rounded'];
    size?: ButtonVariants['size'];
    block?: boolean;
    disabled?: boolean;
    name?: string;
} & NuxtLinkProps;
