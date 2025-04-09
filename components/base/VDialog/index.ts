import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const dialogVariants = cva(
    'relative z-50 w-full p-5 bg-white dark:bg-muted-800 shadow-xl',
    {
        variants: {
            rounded: {
                base: 'rounded',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
                xl: 'rounded-xl',
                none: 'rounded-none',
            },
            size: {
                'sm': 'max-w-sm',
                'md': 'max-w-md',
                'lg': 'max-w-lg',
                'xl': 'max-w-xl',
                '2xl': 'max-w-2xl',
                '3xl': 'max-w-3xl',
                '4xl': 'max-w-4xl',
                '5xl': 'max-w-5xl',
                'full': 'lg:max-w-[75%] max-w-full',
            },
        },
        defaultVariants: {
            rounded: 'lg',
            size: 'lg',
        },
    },
);

export type DialogVariants = VariantProps<typeof dialogVariants>;
