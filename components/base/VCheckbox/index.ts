import { cva } from 'class-variance-authority';

export const checkboxVariants = cva(
    'peer w-[18px] h-[18px] shrink-0 rounded border border-muted-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-800 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 disabled:bg-muted-100 data-[state=checked]:bg-primary-800 data-[state=checked]:border-primary-800 data-[state=checked]:text-white dark:bg-muted-900 dark:border-muted-600 dark:data-[state=checked]:bg-primary-700 dark:data-[state=checked]:border-primary-700 dark:focus:ring-offset-0 dark:disabled:bg-muted-800',
);
