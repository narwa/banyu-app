import type { Undefined } from '~/types';
import { v4 as uuidv4, v7 as uuidv7 } from 'uuid';

/**
 * Checks if the given value is an array.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [value] - The value to check.
 * @returns {value is T[]} - Returns true if the value is an array, otherwise false.
 */
export const isArray = <T>(value?: T[]): value is T[] => Array.isArray(value);

/**
 * Checks if the given value is an array and has elements.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} [value] - The value to check.
 * @returns {value is T[]} - Returns true if the value is a non-empty array, otherwise false.
 */
export const isArrayExist = <T>(value?: T[]): value is T[] => isArray(value) && !!value.length;

/**
 * Checks if the given value is null or undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} - Returns true if the value is null or undefined, otherwise false.
 */
export const isNil = (value: unknown): boolean => value == null;

/**
 * Checks if the given value is a finite number.
 *
 * @param {unknown} value - The value to check.
 * @returns {value is number} - Returns true if the value is a finite number, otherwise false.
 */
export const isNumber = (value: unknown): value is number => Number.isFinite(value);

/**
 * Checks if the given string value represents a numeric value.
 *
 * @param {string} [value] - The string to check.
 * @returns {boolean} - Returns true if the string represents a numeric value, otherwise false.
 */
export const isNumeric = (value: string): boolean => !isNil(value) ? /^-?\d+$/.test(value) : false;

/**
 * Generates a unique identifier using the v4 UUID algorithm.
 *
 * @returns {string} A unique identifier.
 */
export const createUUID = (): string => uuidv4();

/**
 * Generates a unique identifier using the v7 UUID algorithm.
 *
 * @returns {string} A unique identifier.
 */
export const createUUIDv7 = (): string => uuidv7();

/**
 * Generates initials from a given name.
 *
 * - If the name consists of multiple words, it takes the first letter of the first and last word.
 * - If the name is a single word, it takes the first two letters.
 * - The result is always in uppercase.
 *
 * @param {string} name - The full name to extract initials from.
 * @returns {string} The generated initials.
 */
export const getInitial = (name: Undefined<string>): string => {
    if (!name)
        return '';

    const words = name.trim().split(/\s+/);
    const initial = words.length > 1
        ? (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase()
        : words[0].slice(0, 2).toUpperCase();
    return initial.toUpperCase();
};

/**
 * @description format value or null
 */
export const valueOrNull = <TData>(value?: TData | null) => value || null;

/**
 * @description format value or null
 */
export const valueOrString = <TData>(value?: TData | null) => value || '';

/**
 * @description format value or null
 */
export const valueOrFallback = <TData>(fallback: TData, value?: TData | null) => value || fallback;

/**
 * @description format value as string or null
 */
export const stringOrNull = (value?: string | null) => typeof value === 'string' ? value : null;

/**
 * @description format value as string or fallback
 */
export const stringOrFallback = (value: string = '', fallback?: string | null) => value || fallback;

/**
 * @description format value as number or null
 */
export const numberOrNull = (value?: number | null) => isNumber(value) ? value : null;

/**
 * @description format value as array or array empty
 */
export const isArrayEmpty = <T>(value?: T[] | null): T[] => value ?? [];

/**
 * @description check value is date
 */
export const isDate = (value: unknown): value is Date => value instanceof Date;

/**
 * @description format value as number or empty
 */
export const stringOrEmpty = (value?: string | null) => typeof value === 'string' && value ? value : '';

/**
 * @description format value as number or zero
 */
export const numberOrZero = (value?: number | null) => isNumber(value) ? value : 0;

/**
 * @description format value as date or null
 */
export const dateOrNull = (value?: Date | null) => isDate(value) ? value : null;

/**
 * @description format value as date or current date
 */
export const dateOrZero = (value?: Date | null) => isDate(value) ? value : new Date();

/**
 * @description check value is string array
 */
export const itStringArray = (value?: string[]): value is string[] => isArray(value) && value.every(item => typeof item === 'string');

/**
 * @description format value as string array or empty
 */
export const stringArrayOrEmpty = (value?: string[]): string[] => itStringArray(value) ? value : [];

/**
 * @description convert epoch to Date object
 */
export const epochToDate = (value?: number | null) => {
    if (!value)
        return new Date();
    return new Date(value);
};

/**
 * @description format currency
 */

export function formatCurrency(value?: number, currencyOptions?: { absolute?: boolean } & Intl.NumberFormatOptions) {
    const { absolute, ...options } = currencyOptions ?? {};
    const currentValue = value ?? 0;
    const absValue = absolute ? Math.abs(currentValue) : currentValue;
    const formattedValue = Intl.NumberFormat('id-ID', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 0,
        ...options,
    }).format(absValue);

    return formattedValue;
}
