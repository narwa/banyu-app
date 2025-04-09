import { describe, expect, it } from 'vitest';
import { stringToArray, toCapitalizeCase, toLowerCase, toUpperCase, truncateString } from '../StringUtil';

describe('stringUtil', () => {
    describe('toCapitalizeCase', () => {
        it('should capitalize the first letter and convert rest to lowercase', () => {
            expect(toCapitalizeCase('hello')).toBe('Hello');
            expect(toCapitalizeCase('WORLD')).toBe('World');
            expect(toCapitalizeCase('javaScript')).toBe('Javascript');
        });

        it('should handle empty string', () => {
            expect(toCapitalizeCase('')).toBe('');
        });

        it('should handle single character', () => {
            expect(toCapitalizeCase('a')).toBe('A');
        });
    });

    describe('toLowerCase', () => {
        it('should convert all characters to lowercase', () => {
            expect(toLowerCase('HELLO')).toBe('hello');
            expect(toLowerCase('World')).toBe('world');
            expect(toLowerCase('JavaScript')).toBe('javascript');
        });

        it('should handle empty string', () => {
            expect(toLowerCase('')).toBe('');
        });
    });

    describe('toUpperCase', () => {
        it('should convert all characters to uppercase', () => {
            expect(toUpperCase('hello')).toBe('HELLO');
            expect(toUpperCase('World')).toBe('WORLD');
            expect(toUpperCase('javaScript')).toBe('JAVASCRIPT');
        });

        it('should handle empty string', () => {
            expect(toUpperCase('')).toBe('');
        });
    });

    describe('stringToArray', () => {
        it('should split string by separator', () => {
            expect(stringToArray('hello,world', ',')).toEqual(['hello', 'world']);
            expect(stringToArray('a-b-c', '-')).toEqual(['a', 'b', 'c']);
            expect(stringToArray('test test test', ' ')).toEqual(['test', 'test', 'test']);
        });

        it('should handle empty string', () => {
            expect(stringToArray('', ',')).toEqual(['']);
        });

        it('should handle string with no separator matches', () => {
            expect(stringToArray('hello', ',')).toEqual(['hello']);
        });
    });

    describe('truncateString', () => {
        it('should truncate string that exceeds maximum length', () => {
            expect(truncateString('Hello World', 5)).toBe('Hello...');
            expect(truncateString('JavaScript is awesome', 10)).toBe('JavaScript...');
        });

        it('should not truncate string that does not exceed maximum length', () => {
            expect(truncateString('Hello', 5)).toBe('Hello');
            expect(truncateString('Hello', 10)).toBe('Hello');
        });

        it('should use custom ellipsis when provided', () => {
            expect(truncateString('Hello World', 5, '***')).toBe('Hello***');
            expect(truncateString('JavaScript', 4, ' [more]')).toBe('Java [more]');
        });

        it('should handle empty string', () => {
            expect(truncateString('', 5)).toBe('');
        });

        it('should handle very short maximum length', () => {
            expect(truncateString('Hello', 0)).toBe('...');
            expect(truncateString('Hello', 1)).toBe('H...');
        });
    });
});
