import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
    'px-2 py-1 inline-flex items-center justify-center text-xs font-medium rounded relative ring-1 ring-inset',
    {
        variants: {
            variant: {
                indigo:
                    'bg-indigo-50 dark:bg-indigo-400/10 text-indigo-800 dark:text-indigo-500 ring-indigo-700/10 dark:ring-indigo-400/30',
                danger:
                    'bg-danger-50 dark:bg-danger-400/10 text-danger-800 dark:text-danger-5500 ring-danger-600/20 dark:ring-danger-400/30',
                warning:
                    'bg-warning-50 dark:bg-warning-400/10 text-warning-800 dark:text-warning-500 ring-warning-600/20 dark:ring-warning-400/30',
                info: 'bg-info-50 dark:bg-info-400/10 text-info-800 dark:text-info-500 ring-info-700/10 dark:ring-info-400/30',
                success:
                    'bg-success-50 dark:bg-success-400/10 text-success-800 dark:text-success-500 ring-success-600/20 dark:ring-success-400/30',
                secondary:
                    'bg-muted-50 dark:bg-muted-500/10 text-muted-800 dark:text-muted-300 ring-muted-600/20 dark:ring-muted-400/30',
                primary:
                    'bg-primary-50 dark:bg-primary-400/10 text-primary-800 dark:text-primary-300 ring-primary-600/20 dark:ring-primary-400/30',
                tag:
                    'font-lato bg-[#E9F0C1] border-none outline-none ring-0 px-6 py-3 font-bold text-green-900',
                pink: 'bg-pink-200 text-pink-700 ring-pink-700/10',
            },
            rounded: {
                none: 'rounded-none',
                base: 'rounded',
                md: 'rounded-md',
                sm: 'rounded-sm',
                xl: 'rounded-xl',
                lg: 'rounded-lg',
                full: 'rounded-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            rounded: 'md',
        },
    },
);

export const indicatorVariant = cva('absolute rounded-full left-2.5 w-2 h-2', {
    variants: {
        variant: {
            indigo: 'bg-indigo-500',
            primary: 'bg-primary-500',
            warning: 'bg-warning-500',
            secondary: 'bg-muted-500',
            info: 'bg-info-500',
            success: 'bg-success-500',
            danger: 'bg-danger-500',
            tag: 'bg-[#E9F0C1]',
            pink: 'bg-pink-400',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export const pulseVariant = cva('absolute animate-ping rounded-full left-2.5 w-2 h-2', {
    variants: {
        variant: {
            primary: 'bg-primary-500',
            warning: 'bg-warning-500',
            danger: 'bg-danger-500',
            info: 'bg-info-500',
            indigo: 'bg-indigo-500',
            success: 'bg-success-500',
            secondary: 'bg-muted-500',
            tag: 'bg-[#E9F0C1]',
            pink: 'bg-pink-400',
        },
    },
    defaultVariants: {
        variant: 'primary',
    },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type IndicatorVariants = VariantProps<typeof indicatorVariant>;
export type PulseVariants = VariantProps<typeof pulseVariant>;
