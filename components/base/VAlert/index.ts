import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const alertVariants = cva('w-full flex gap-4 px-4 py-3', {
    variants: {
        variant: {
            default: 'bg-muted-100 dark:bg-muted-900',
            success: 'bg-green-50 dark:bg-green-900',
            warning: 'bg-yellow-50 dark:bg-yellow-900',
            danger: 'bg-red-50 dark:bg-red-900',
            soft: 'bg-muted-50 dark:bg-muted-900 border border-dashed border-muted-100 dark:border-transparent',
        },
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
        variant: 'default',
        rounded: 'md',
    },
});

export const titleVariant = cva('text-sm font-medium', {
    variants: {
        variant: {
            default: 'text-muted-700 dark:text-white',
            success: 'text-green-600 dark:text-white',
            warning: 'text-yellow-600 dark:text-white',
            danger: 'text-red-600 dark:text-white',
            soft: 'text-muted-700 dark:text-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const textVariant = cva('text-sm mt-1', {
    variants: {
        variant: {
            default: 'text-muted-500 dark:text-white',
            success: 'text-green-600 dark:text-white',
            warning: 'text-yellow-600 dark:text-white',
            danger: 'text-red-600 dark:text-white',
            soft: 'text-muted-500 dark:text-white',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export const iconVariant = cva('h-6 w-6', {
    variants: {
        variant: {
            default: 'text-muted-600 dark:text-muted-500',
            success: 'text-green-600 dark:text-green-600',
            warning: 'text-yellow-600 dark:text-yellow-600',
            danger: 'text-red-600 dark:text-red-600',
            soft: 'text-muted-600 dark:text-muted-500',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
export type TitleVariants = VariantProps<typeof titleVariant>;
export type TextVariants = VariantProps<typeof textVariant>;
export type IconVariants = VariantProps<typeof iconVariant>;
