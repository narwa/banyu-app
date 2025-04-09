import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const skeletonVariants = cva(
    'w-full h-4 animate-pulse bg-[length:1200px_104px] bg-gradient-to-r from-muted-200/80 from-[8%] via-muted-300/70 via-[18%] to-muted-200/80 to-[33%] dark:from-[hsla(0,0%,100%,.15)] dark:via-[hsla(0,0%,100%,.24)] dark:to-[hsla(0,0%,100%,.15)]',
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
            rounded: 'base',
        },
    },
);

export type SkeletonVariants = VariantProps<typeof skeletonVariants>;
