import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
    'relative h-auto w-full block transition duration-150 disabled:bg-muted-50 dark:disabled:bg-muted-700 border dark:disabled:border-muted-700 disabled:opacity-70 disabled:cursor-not-allowed dark:disabled:opacity-60',
    {
        variants: {
            rounded: {
                base: 'rounded',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                full: 'rounded-full',
                none: 'rounded-none',
            },
            size: {
                xs: 'px-2 py-1 text-xs',
                sm: 'px-2.5 py-1.5 text-sm',
                md: 'px-3 py-2 text-sm',
                lg: 'px-4 py-3 text-base',
            },
            isInvalid: {
                yes: 'bg-red-50 dark:bg-muted-600 text-red-600 dark:text-red-300 border-red-600 focus:border-red-600 dark:border-red-400 dark:focus:border-red-400 ring-red-600 focus:ring-red-600 dark:focus:ring-red-400 placeholder-red-400 dark:placeholder-red-300',
                no: 'bg-white dark:bg-muted-700 text-muted-800 dark:text-muted-100 border-muted-200 focus:border-primary-800 dark:border-muted-700 dark:focus:border-primary-700 focus:ring-primary-800 dark:focus:ring-primary-700 placeholder-muted-300',
            },
            isLoading: {
                yes: 'resize-none',
                no: '',
            },
        },
        defaultVariants: {
            rounded: 'md',
            size: 'sm',
            isInvalid: 'no',
            isLoading: 'no',
        },
    },
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
