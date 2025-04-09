import type { VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'vue';
import { cva } from 'class-variance-authority';

export const textVariants = cva(
    'text-black whitespace-normal break-words select-text tracking-normal font-libre',
    {
        variants: {
            variant: {
                'h1': 'text-[2.5rem] md:text-[3.45rem] leading-tight',
                'h2': 'text-[2rem] md:text-[2.75rem] leading-tight',
                'h3': 'text-2xl md:text-[2.25rem] leading-tight',
                'h4': 'text-xl md:text-3xl leading-tight',
                'h5': 'text-lg md:text-2xl leading-tight font-lato',
                'body': 'text-sm md:text-lg font-lato',
                'sub-body': 'text-xs md:text-sm leading-relaxed font-lato',
                'base': 'text-base font-lato leading-relaxed',
            },
            weight: {
                'thin': 'font-thin',
                'extra-light': 'font-extralight',
                'light': 'font-light',
                'normal': 'font-normal',
                'medium': 'font-medium',
                'semibold': 'font-semibold',
                'bold': 'font-bold',
                'extra-bold': 'font-extrabold',
                'black': 'font-black',
            },
            italic: {
                true: 'italic',
            },
        },
        defaultVariants: {
            variant: 'body',
            weight: 'normal',
            italic: false,
        },
    },
);

export type TextVariants = VariantProps<typeof textVariants>;
export type Props = {
    class?: HTMLAttributes['class'];
    variant?: TextVariants['variant'];
    weight?: TextVariants['weight'];
    italic?: boolean;
    as:
        | 'p'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'span';
};
