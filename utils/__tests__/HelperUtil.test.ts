import { describe, expect, it } from 'vitest';
import {
    createUUID,
    createUUIDv7,
    dateOrNull,
    dateOrZero,
    epochToDate,
    formatCurrency,
    getInitial,
    isArray,
    isArrayEmpty,
    isArrayExist,
    isDate,
    isNil,
    isNumber,
    isNumeric,
    itStringArray,
    numberOrNull,
    numberOrZero,
    stringArrayOrEmpty,
    stringOrEmpty,
    stringOrFallback,
    stringOrNull,
    valueOrNull,
} from '../HelperUtil';

describe('helperUtil', () => {
    describe('isArray', () => {
        it('should return true for arrays', () => {
            expect(isArray([])).toBe(true);
            expect(isArray([1, 2, 3])).toBe(true);
        });

        it('should return false for non-arrays', () => {
            expect(isArray(undefined)).toBe(false);
        });
    });

    describe('isArrayExist', () => {
        it('should return true for non-empty arrays', () => {
            expect(isArrayExist([1])).toBe(true);
            expect(isArrayExist([1, 2, 3])).toBe(true);
        });

        it('should return false for empty arrays or non-arrays', () => {
            expect(isArrayExist([])).toBe(false);
            expect(isArrayExist(undefined)).toBe(false);
        });
    });

    describe('isNil', () => {
        it('should return true for null and undefined', () => {
            expect(isNil(null)).toBe(true);
            expect(isNil(undefined)).toBe(true);
        });

        it('should return false for non-null values', () => {
            expect(isNil(0)).toBe(false);
            expect(isNil('')).toBe(false);
            expect(isNil(false)).toBe(false);
            expect(isNil({})).toBe(false);
        });
    });

    describe('isNumber', () => {
        it('should return true for finite numbers', () => {
            expect(isNumber(0)).toBe(true);
            expect(isNumber(1.5)).toBe(true);
            expect(isNumber(-10)).toBe(true);
        });

        it('should return false for non-numbers or infinite values', () => {
            expect(isNumber(Infinity)).toBe(false);
            expect(isNumber(Number.NaN)).toBe(false);
            expect(isNumber('123')).toBe(false);
            expect(isNumber(null)).toBe(false);
        });
    });

    describe('isNumeric', () => {
        it('should return true for numeric strings', () => {
            expect(isNumeric('123')).toBe(true);
            expect(isNumeric('-123')).toBe(true);
            expect(isNumeric('0')).toBe(true);
        });

        it('should return false for non-numeric strings', () => {
            expect(isNumeric('abc')).toBe(false);
            expect(isNumeric('12.34')).toBe(false);
            expect(isNumeric('')).toBe(false);
        });
    });

    describe('createUUID', () => {
        it('should generate a valid UUID v4', () => {
            const uuid = createUUID();
            expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });
    });

    describe('createUUIDv7', () => {
        it('should generate a valid UUID v7', () => {
            const uuid = createUUIDv7();
            expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });
    });

    describe('getInitial', () => {
        it('should return initials for multiple words', () => {
            expect(getInitial('John Doe')).toBe('JD');
            expect(getInitial('Alice Bob Charlie')).toBe('AC');
        });

        it('should return first two letters for single word', () => {
            expect(getInitial('John')).toBe('JO');
            expect(getInitial('Alice')).toBe('AL');
        });

        it('should handle empty or undefined input', () => {
            expect(getInitial('')).toBe('');
            expect(getInitial(undefined)).toBe('');
        });
    });

    describe('valueOrNull', () => {
        it('should return the value if it exists', () => {
            expect(valueOrNull('test')).toBe('test');
            expect(valueOrNull(123)).toBe(123);
        });

        it('should return null for falsy values', () => {
            expect(valueOrNull(null)).toBeNull();
            expect(valueOrNull(undefined)).toBeNull();
        });
    });

    describe('stringOrNull', () => {
        it('should return the string if it exists', () => {
            expect(stringOrNull('test')).toBe('test');
        });

        it('should return null for non-string values', () => {
            expect(stringOrNull(null)).toBeNull();
            expect(stringOrNull(undefined)).toBeNull();
            expect(stringOrNull(123 as any)).toBeNull();
        });
    });

    describe('numberOrNull', () => {
        it('should return the number if it exists', () => {
            expect(numberOrNull(123)).toBe(123);
            expect(numberOrNull(0)).toBe(0);
        });

        it('should return null for non-number values', () => {
            expect(numberOrNull(null)).toBeNull();
            expect(numberOrNull(undefined)).toBeNull();
            expect(numberOrNull(Infinity)).toBeNull();
        });
    });

    describe('isArrayEmpty', () => {
        it('should return the array if it exists', () => {
            expect(isArrayEmpty([1, 2, 3])).toEqual([1, 2, 3]);
        });

        it('should return empty array for null or undefined', () => {
            expect(isArrayEmpty(null)).toEqual([]);
            expect(isArrayEmpty(undefined)).toEqual([]);
        });
    });

    describe('isDate', () => {
        it('should return true for Date objects', () => {
            expect(isDate(new Date())).toBe(true);
        });

        it('should return false for non-Date values', () => {
            expect(isDate('2023-01-01')).toBe(false);
            expect(isDate(123)).toBe(false);
            expect(isDate(null)).toBe(false);
        });
    });

    describe('stringOrEmpty', () => {
        it('should return the string if it exists', () => {
            expect(stringOrEmpty('test')).toBe('test');
        });

        it('should return empty string for falsy values', () => {
            expect(stringOrEmpty(null)).toBe('');
            expect(stringOrEmpty(undefined)).toBe('');
            expect(stringOrEmpty('')).toBe('');
        });
    });

    describe('numberOrZero', () => {
        it('should return the number if it exists', () => {
            expect(numberOrZero(123)).toBe(123);
            expect(numberOrZero(-10)).toBe(-10);
        });

        it('should return 0 for non-number values', () => {
            expect(numberOrZero(null)).toBe(0);
            expect(numberOrZero(undefined)).toBe(0);
            expect(numberOrZero(Infinity)).toBe(0);
        });
    });

    describe('dateOrNull', () => {
        it('should return the date if it exists', () => {
            const date = new Date();
            expect(dateOrNull(date)).toBe(date);
        });

        it('should return null for non-date values', () => {
            expect(dateOrNull(null)).toBeNull();
            expect(dateOrNull(undefined)).toBeNull();
            expect(dateOrNull('2023-01-01' as any)).toBeNull();
        });
    });

    describe('dateOrZero', () => {
        it('should return the date if it exists', () => {
            const date = new Date();
            expect(dateOrZero(date)).toBe(date);
        });

        it('should return current date for non-date values', () => {
            const result = dateOrZero(null);
            expect(result instanceof Date).toBe(true);
            expect(dateOrZero(undefined) instanceof Date).toBe(true);
        });
    });

    describe('itStringArray', () => {
        it('should return true for string arrays', () => {
            expect(itStringArray(['a', 'b', 'c'])).toBe(true);
            expect(itStringArray([''])).toBe(true);
        });

        it('should return false for non-string arrays or non-arrays', () => {
            expect(itStringArray([1, 2, 3] as any)).toBe(false);
            expect(itStringArray(undefined)).toBe(false);
            expect(itStringArray(null as any)).toBe(false);
            expect(itStringArray(['a', 1] as any)).toBe(false);
        });
    });

    describe('stringArrayOrEmpty', () => {
        it('should return the string array if it exists', () => {
            expect(stringArrayOrEmpty(['a', 'b', 'c'])).toEqual(['a', 'b', 'c']);
        });

        it('should return empty array for non-string arrays or undefined', () => {
            expect(stringArrayOrEmpty(undefined)).toEqual([]);
            expect(stringArrayOrEmpty([1, 2, 3] as any)).toEqual([]);
        });
    });

    describe('epochToDate', () => {
        it('should convert epoch to Date object', () => {
            const epoch = 1614556800000;
            const result = epochToDate(epoch);
            expect(result instanceof Date).toBe(true);
            expect(result?.getTime()).toBe(epoch);
        });

        it('should return Date object for invalid inputs', () => {
            expect(epochToDate(null)).toBeInstanceOf(Date);
        });
    });

    describe('stringOrFallback', () => {
        it('should return the value when it exists', () => {
            expect(stringOrFallback('test')).toBe('test');
            expect(stringOrFallback('hello')).toBe('hello');
        });

        it('should return the fallback when value is null or undefined', () => {
            expect(stringOrFallback(null, 'fallback')).toBe('fallback');
            expect(stringOrFallback(undefined, 'default')).toBe('default');
        });

        it('should return empty string when no fallback is provided and value is null/undefined', () => {
            expect(stringOrFallback(null)).toBe('');
            expect(stringOrFallback(undefined)).toBe('');
        });
    });

    describe('formatCurrency', () => {
        it('should format number with default options', () => {
            expect(formatCurrency(1000)).toBe('1.000');
            expect(formatCurrency(1000.5)).toBe('1.000,5');
            expect(formatCurrency(1000.55)).toBe('1.000,55');
            expect(formatCurrency(1000.555)).toBe('1.000,56'); // rounds to 2 decimal places
        });

        it('should handle null or undefined values', () => {
            expect(formatCurrency(undefined)).toBe('0');
            expect(formatCurrency(null as unknown as undefined)).toBe('0');
        });

        it('should format negative numbers', () => {
            expect(formatCurrency(-1000)).toBe('-1.000');
            expect(formatCurrency(-1000.5)).toBe('-1.000,5');
        });

        it('should use absolute value when absolute option is true', () => {
            expect(formatCurrency(-1000, { absolute: true })).toBe('1.000');
            expect(formatCurrency(-1000.5, { absolute: true })).toBe('1.000,5');
        });

        it('should apply custom number format options', () => {
            expect(formatCurrency(1000, { style: 'currency', currency: 'IDR' })).toMatch(/Rp.*1.000/);
            expect(formatCurrency(1000.5, { maximumFractionDigits: 0 })).toBe('1.001');
            expect(formatCurrency(1000, { minimumFractionDigits: 2 })).toBe('1.000,00');
        });
    });
});
