import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const paginationActionVariants = cva(
    'relative inline-flex items-center justify-center space-x-2 font-normal whitespace-nowrap transition duration-300 bg-white hover:bg-muted-100 focus:bg-muted-100 disabled:hover:bg-white disabled:focus:bg-white dark:bg-muted-700 dark:hover:bg-muted-600 dark:focus:bg-muted-600 dark:disabled:hover:bg-muted-700 dark:disabled:focus:bg-muted-700 text-muted-700 dark:text-muted-100 focus:ring-2 focus:ring-offset-2 focus:ring-primary-900 dark:focus:ring-offset-0 border border-muted-300 dark:border-muted-700 disabled:opacity-60 disabled:cursor-not-allowed',
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
                xs: 'h-8 text-xs px-3',
                sm: 'h-9 text-sm px-4',
                md: 'h-10 text-sm px-5',
                lg: 'h-11 text-base px-6',
            },

        },
        defaultVariants: {
            rounded: 'md',
            size: 'sm',
        },
    },
);

export const paginationItemVariants = cva(
    'relative bg-transparent font-normal text-muted-700 dark:text-muted-100 before:absolute before:-top-[17px] before:left-0 before:w-full before:h-[2px] data-[selected]:font-medium data-[selected]:text-primary-800 dark:data-[selected]:text-primary-700 hover:before:bg-muted-200 dark:hover:before:bg-muted-700 data-[selected]:before:bg-primary-800 dark:data-[selected]:before:bg-primary-700',
    {
        variants: {
            size: {
                xs: 'h-8 w-8 text-xs',
                sm: 'h-9 w-9 text-sm',
                md: 'h-10 w-10 text-sm',
                lg: 'h-11 w-11 text-base',
            },

        },
        defaultVariants: {
            size: 'sm',
        },
    },
);

export type PaginationActionVariants = VariantProps<typeof paginationActionVariants>;
export type PaginationItemVariants = VariantProps<typeof paginationItemVariants>;
