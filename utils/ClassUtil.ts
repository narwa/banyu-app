import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using `clsx` and merges them with Tailwind's `twMerge`.
 *
 * @param {Array<string>} inputs - An array of class names to be combined and merged.
 * @returns {string} A string of combined and merged class names.
 * @description This function utilizes `clsx` to combine class names and then uses `twMerge`
 * to remove any conflicting TailwindCSS classes, resulting in a clean, merged string of class names.
 */

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(...inputs));
};
