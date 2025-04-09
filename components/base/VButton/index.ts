import type { NuxtLink } from '#components';
import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'vue';
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 group',
    {
        variants: {
            variant: {
                'base': '',
                'primary': 'bg-primary-500 text-gray-50 hover:bg-primary-400 transition-colors',
                'secondary': 'border border-secondary-500 text-secondary-500 hover:bg-secondary-400 hover:text-gray-50 transition-colors',
                'secondary-inverted': 'border border-gray-900 hover:bg-yellow-400 hover:text-gray-50 transition-colors',
                'link': '!p-0 text-yellow-500',
                'link-inverted': '!p-0 text-gray-900',
                'unstyled': 'all-[unset] w-fit h-fit !p-0',
                'ghost': 'hover:bg-yellow-500 hover:text-gray-50',
                'success': 'text-white bg-success-500 border border-success-500 hover:bg-success-600 hover:border-success-600 focus:bg-success-600 focus:border-success-600 focus:ring-2 focus:ring-offset-2 focus:ring-success-600 disabled:hover:bg-success-500 disabled:focus:disabled',
                'info': 'text-white bg-blue-500 border border-blue-500 hover:bg-blue-600 hover:border-blue-600 focus:bg-blue-600 focus:border-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:hover:bg-blue-500 disabled:focus:disabled',
                'warning': 'text-white bg-warning-500 border border-warning-500 hover:bg-warning-600 hover:border-warning-600 focus:bg-warning-600 focus:border-warning-600 focus:ring-2 focus:ring-offset-2 focus:ring-warning-600 disabled:hover:bg-warning-500 disabled:focus:disabled',
                'danger': 'text-white bg-danger-600 border border-danger-600 hover:bg-danger-700 hover:border-danger-700 focus:bg-danger-700 focus:border-danger-700 focus:ring-2 focus:ring-offset-2 focus:ring-danger-700 disabled:hover:bg-danger-600 disabled:focus:disabled',
                'indigo': 'text-white bg-indigo-600 border border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700 focus:bg-indigo-700 focus:border-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 disabled:hover:bg-indigo-600 disabled:focus:disabled',
                'pink': 'bg-pink-400 text-pink-700 ring-pink-700/10 focus:ring-pink-700/10 border border-pink-400 hover:bg-pink-700 hover:border-pink-700 hover:text-white focus:bg-pink-700 focus:border-pink-700 focus:text-white disabled:hover:bg-pink-400 disabled:focus:disabled',
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
            size: {
                'xs': 'h-8 text-xs px-3',
                'sm': 'h-9 text-sm px-3',
                'md': 'h-10 text-sm md:text-base px-4',
                'lg': 'h-11 text-base lg:text-lg px-5',
                'xl': 'h-14 text-md lg:text-lg px-7',
                '2xl': 'h-20 text-lg xl:text-xl px-8',
            },
            isLoading: {
                true: 'cursor-not-allowed select-none',
            },
            isBlock: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            rounded: 'md',
            size: 'md',
        },
    },
);

export const buttonIconVariants = cva(
    'p-1 text-yellow-900 outline-none transition duration-200 hover:text-muted-500 hover:bg-muted-100 focus:text-muted-500 focus:bg-muted-100 disabled:cursor-not-allowed disabled:opacity-80',
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
            bordered: {
                true: 'border border-muted-200',
            },
        },
        defaultVariants: {
            rounded: 'md',
            bordered: false,
        },
    },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonIconVariants = VariantProps<typeof buttonIconVariants>;
export type Props = {
    class?: HTMLAttributes['class'];
    loaderClass?: HTMLAttributes['class'];
    variant: ButtonVariants['variant'];
    rounded?: ButtonVariants['rounded'];
    size?: ButtonVariants['size'];
    type?: HTMLButtonElement['type'];
    block?: boolean;
    disabled?: boolean;
    loading?: boolean;
    name?: string;
    as?: 'button' | typeof NuxtLink;
};
