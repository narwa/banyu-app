import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const indicatorVariant = cva('rounded-full flex-shrink-0 w-2.5 h-2.5 mr-1.5', {
    variants: {
        variant: {
            primary: 'bg-primary-700',
            secondary: 'bg-muted-500',
            success: 'bg-success-500',
            info: 'bg-info-500',
            warning: 'bg-warning-500',
            danger: 'bg-danger-500',
            indigo: 'bg-indigo-500',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export const pulseVariant = cva('absolute animate-ping rounded-full w-3 h-3 -ml-px', {
    variants: {
        variant: {
            primary: 'bg-primary-700',
            secondary: 'bg-muted-500',
            success: 'bg-success-500',
            info: 'bg-info-500',
            warning: 'bg-warning-500',
            danger: 'bg-danger-500',
            indigo: 'bg-indigo-500',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export type IndicatorVariants = VariantProps<typeof indicatorVariant>;
export type PulseVariants = VariantProps<typeof pulseVariant>;
