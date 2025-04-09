import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const tooltipContentVariants = cva(
    'max-w-xs z-[1001] overflow-hidden px-3 py-2 shadow-lg font-medium text-center text-sm text-muted-200 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-muted-900',
    {
        variants: {
            type: {
                danger: 'bg-danger-600 text-muted-100',
                success: 'bg-success-600 text-muted-100',
                dark: 'bg-muted-900 text-muted-200',
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
            rounded: 'lg',
        },
    },
);

export const tooltipArrowVariants = cva('fill-muted-900', {
    variants: {
        type: {
            danger: 'fill-danger-600',
            success: 'fill-success-600',
            dark: 'fill-muted-900',
        },
    },
});

export type TooltipContentVariants = VariantProps<typeof tooltipContentVariants>;
export type TooltipArrowVariants = VariantProps<typeof tooltipArrowVariants>;
