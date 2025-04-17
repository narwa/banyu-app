import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

export const inputVariants = cva(
    `
        font-lato block w-full py-0 text-sm text-muted-800 placeholder-muted-300 transition duration-150
        bg-white dark:bg-muted-700 dark:text-muted-100

        border border-muted-200 dark:border-muted-700
        focus:border-primary-800 dark:focus:border-primary-700
        focus-visible:border-primary-800 dark:focus-visible:border-primary-700
        disabled:border-muted-200 dark:disabled:border-muted-700
        disabled:focus:border-muted-200 dark:disabled:focus:border-muted-700
        disabled:focus-visible:border-muted-200 dark:disabled:focus-visible:border-muted-700

        focus:ring-1 focus:ring-primary-800 dark:focus:ring-primary-700
        focus-visible:ring-1 focus-visible:ring-primary-800 dark:focus-visible:ring-primary-700
        disabled:focus:ring-0 disabled:focus-visible:ring-0

        disabled:opacity-70 dark:disabled:opacity-60
        disabled:cursor-not-allowed disabled:bg-muted-50
    `,
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
            hasPrefix: {
                xs: 'pl-9',
                sm: 'pl-10',
                md: 'pl-11',
                lg: 'pl-[3.25rem]',
                no: '',
            },
            hasPrefixAction: {
                yes: 'rounded-l-none',
                no: '',
            },
            hasSuffix: {
                xs: 'pr-9',
                sm: 'pr-10',
                md: 'pr-11',
                lg: 'pr-[3.25rem]',
                no: '',
            },
            hasSuffixAction: {
                yes: 'rounded-r-none',
                no: '',
            },
            isInvalid: {
                yes: 'bg-red-50 dark:bg-muted-600 text-red-600 dark:text-red-300 border-red-600 focus:border-red-600 dark:border-red-400 dark:focus:border-red-400 ring-red-600 focus:ring-red-600 dark:focus:ring-red-400 placeholder-red-400 dark:placeholder-red-300',
                no: 'bg-white dark:bg-muted-700 text-muted-800 dark:text-muted-100 border-muted-200 focus:border-primary-800 dark:border-muted-700 dark:focus:border-primary-700 focus:ring-primary-800 dark:focus:ring-primary-700 placeholder-muted-300',
            },
        },
        defaultVariants: {
            rounded: 'md',
            size: 'sm',
            hasPrefix: 'sm',
            hasSuffix: 'sm',
            isInvalid: 'no',
        },
    },
);

export const inputColumnVariants = cva('relative', {
    variants: {
        cols: {
            1: 'lg:grid lg:grid-cols-1',
            2: 'lg:grid lg:grid-cols-2',
            3: 'lg:grid lg:grid-cols-3',
            4: 'lg:grid lg:grid-cols-4',
            5: 'lg:grid lg:grid-cols-5',
            6: 'lg:grid lg:grid-cols-6',
            7: 'lg:grid lg:grid-cols-7',
            8: 'lg:grid lg:grid-cols-8',
            9: 'lg:grid lg:grid-cols-9',
            10: 'lg:grid lg:grid-cols-10',
            11: 'lg:grid lg:grid-cols-11',
            12: 'lg:grid lg:grid-cols-12',
            none: 'lg:grid lg:grid-cols-none',
        },
    },
});

export const inputColumnSpanVariants = cva('relative', {
    variants: {
        cols: {
            1: 'lg:col-span-1',
            2: 'lg:col-span-2',
            3: 'lg:col-span-3',
            4: 'lg:col-span-4',
            5: 'lg:col-span-5',
            6: 'lg:col-span-6',
            7: 'lg:col-span-7',
            8: 'lg:col-span-8',
            9: 'lg:col-span-9',
            10: 'lg:col-span-10',
            11: 'lg:col-span-11',
            12: 'lg:col-span-12',
            full: 'lg:col-span-full',
        },
    },
});

export const inputPrefixVariant = cva(
    'relative h-full flex items-center text-muted-300 dark:text-muted-500',
    {
        variants: {
            size: {
                xs: 'pl-2',
                sm: 'pl-2.5',
                md: 'pl-3',
                lg: 'pl-4',
            },
        },
        defaultVariants: {
            size: 'sm',
        },
    },
);

export const inputSuffixVariant = cva(
    'relative h-full flex items-center text-muted-300 dark:text-muted-500',
    {
        variants: {
            size: {
                xs: 'pr-2',
                sm: 'pr-2.5',
                md: 'pr-3',
                lg: 'pr-4',
            },
        },
        defaultVariants: {
            size: 'sm',
        },
    },
);

export const inputNumberButton = cva(
    'px-3 border border-muted-200 bg-muted-50 text-muted-700 hover:bg-muted-100 focus:bg-muted-100 focus:ring-2 focus:ring-primary-900 dark:focus:ring-offset-0 focus:z-10 disabled:bg-muted-50 disabled:opacity-60 disabled:cursor-not-allowed dark:text-muted-200 dark:bg-muted-700 dark:border-muted-700 dark:disabled:bg-muted-700 dark:disabled:border-muted-700 dark:disabled:  ',
    {
        variants: {
            roundedMinus: {
                base: 'rounded-l',
                sm: 'rounded-l-sm',
                md: 'rounded-l-md',
                lg: 'rounded-l-lg',
                xl: 'rounded-l-xl',
                full: 'rounded-l-full',
                none: 'rounded-l-none',
            },
            roundedPlus: {
                base: 'rounded-l',
                sm: 'rounded-r-sm',
                md: 'rounded-r-md',
                lg: 'rounded-r-lg',
                xl: 'rounded-r-xl',
                full: 'rounded-r-full',
                none: 'rounded-r-none',
            },
            type: {
                minus: 'border-r-0 rounded-r-none',
                plus: 'border-l-0 rounded-l-none',
            },
        },
        defaultVariants: {
            roundedMinus: 'md',
            roundedPlus: 'md',
        },
    },
);

export const inputDateVariant = cva(
    '!font-sans block w-full py-0 text-sm !text-muted-800 !placeholder-muted-300 transition duration-150 disabled:!opacity-70 disabled:!cursor-not-allowed dark:!disabled:opacity-60 !bg-white disabled:!bg-muted-100 dark:disabled:!bg-muted-700 dark:!bg-muted-700 dark:!text-muted-100 focus:!ring-1 focus:!ring-primary-800 disabled:focus:!ring-0 dark:!focus:!ring-primary-700 !border !border-muted-200 focus:!border-primary-800 disabled:focus:!border-muted-200 dark:disabled:!border-muted-700 dark:disabled:focus:!border-muted-700 dark:!border-muted-700 dark:focus:!border-primary-700 hover:!border-muted-200 dark:hover:!border-muted-700',
    {
        variants: {
            rounded: {
                none: '!rounded-none',
                full: '!rounded-full',
                lg: '!rounded-lg',
                xl: '!rounded-xl',
                md: '!rounded-md',
                sm: '!rounded-sm',
                base: '!rounded',
            },
            size: {
                lg: '!h-11 !px-4 !py-3 !text-base',
                md: '!h-10 !px-3 !py-2 !text-sm',
                sm: '!h-9 !px-2.5 !text-sm',
                xs: '!h-8 !px-2 !text-xs',
            },
            hasPrefix: {
                no: '',
                lg: '!pl-[3.25rem]',
                md: '!pl-11',
                sm: '!pl-10',
                xs: '!pl-9',
            },
            hasPrefixAction: {
                no: '',
                yes: 'rounded-l-none',
            },
            hasSuffix: {
                no: '',
                lg: '!pr-[3.25rem]',
                md: '!pr-11',
                sm: '!pr-10',
                xs: '!pr-9',
            },
            hasSuffixAction: {
                no: '',
                yes: '!rounded-r-none',
            },
            isInvalid: {
                no: '!bg-white dark:!bg-muted-700 !text-muted-800 dark:!text-muted-100 !border-muted-200 focus:!border-primary-600 focus:hover:!border-primary-600 dark:!border-muted-700 dark:focus:!border-primary-500 dark:focus:hover:!border-primary-500 focus:!ring-primary-600 dark:focus:!ring-primary-500 !placeholder-muted-300',
                yes: '!bg-red-50 dark:!bg-muted-600 !text-red-600 dark:!text-red-300 !border-red-600 hover:!border-red-600 focus:!border-red-600 dark:!border-red-400 dark:hover:!border-red-400 dark:focus:!border-red-400 !ring-red-600 focus:!ring-red-600 dark:focus:!ring-red-400 !placeholder-red-400 dark:!placeholder-red-300',
            },
            isBorderless: {
                no: '',
                yes: '!shadow-none !border-transparent hover:!border-transparent dark:hover:!border-transparent',
            },
            isClearable: {
                no: '',
                lg: '!pr-[3.25rem]',
                md: '!pr-11',
                sm: '!pr-10',
                xs: '!pr-9',
            },
        },
        defaultVariants: {
            size: 'sm',
            rounded: 'md',
            hasSuffix: 'sm',
            hasPrefix: 'sm',
            isBorderless: 'no',
            isInvalid: 'no',
            isClearable: 'sm',
        },
    },
);

export const inputDateClearableVariant = cva(
    'inline-flex items-center text-muted-300 dark:text-muted-500',
    {
        variants: {
            size: {
                lg: 'h-11 px-4',
                md: 'h-10 px-3',
                sm: 'h-9 px-2.5',
                xs: 'h-8 px-2',
            },
        },
        defaultVariants: {
            size: 'sm',
        },
    },
);

export type InputVariants = VariantProps<typeof inputVariants>;
export type InputDateVariants = VariantProps<typeof inputDateVariant>;
export type InputColumnVariants = VariantProps<typeof inputColumnVariants>;
export type InputColumnSpanVariants = VariantProps<typeof inputColumnSpanVariants>;
