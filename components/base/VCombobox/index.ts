import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const selectButtonVariants = cva(
    'inline-flex items-center w-full space-x-2 font-normal whitespace-nowrap transition duration-150 text-left text-muted-800 bg-white border border-muted-200 focus:border-primary-800 focus:ring-1 focus:ring-primary-800 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-muted-50 dark:text-muted-100 dark:bg-muted-700 dark:border-muted-700 dark:focus:border-primary-700 dark:focus:ring-primary-700 dark:disabled:opacity-60 dark:disabled:border-muted-700 dark:disabled:focus:border-muted-700',
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
                xs: 'h-8 px-2 text-xs',
                sm: 'h-9 px-2.5 text-sm',
                md: 'h-10 px-3 py-2 text-sm',
                lg: 'h-11 px-4 py-3 text-base',
            },
            isInvalid: {
                yes: 'bg-red-50 dark:bg-muted-600 text-red-600 dark:text-red-300 border-red-600 focus:border-red-600 dark:border-red-400 dark:focus:border-red-400 focus:ring-red-600 dark:focus:ring-red-400',
            },
        },
        defaultVariants: {
            rounded: 'md',
            size: 'sm',
        },
    },
);

export const selectLoadingVariants = cva(
    'absolute z-20 bg-white inset-0 px-4 flex items-center justify-start dark:bg-muted-700 border border-muted-200',
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
        },
        defaultVariants: {
            rounded: 'md',
        },
    },
);

export type SelectButtonVariants = VariantProps<typeof selectButtonVariants>;
