import dayjs from '#build/dayjs.imports.mjs';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { calculateAge, convertEpochToDate, formatDate, formatDateToEpoch, formatDateYMDtoDMY, formatEpochToDateTime, today, toEpochSecond } from '../DateUtil';

describe('dateUtil', () => {
    describe('formatDate', () => {
        it('should format date older than 7 days with specified format', () => {
            const oldDate = new Date('2024-01-01');
            expect(formatDate({ date: oldDate })).toBe('01 Jan 2024');
        });

        it('should accept custom format', () => {
            const date = new Date('2024-01-01');
            expect(formatDate({ date, format: 'YYYY-MM-DD' })).toBe('2024-01-01');
        });
    });

    describe('formatDateToEpoch', () => {
        it('should convert Date to epoch timestamp', () => {
            const date = new Date('2025-02-25T09:23:48.000Z');
            expect(formatDateToEpoch(date)).toBe(1740475428);
        });

        it('should handle epoch input', () => {
            const epoch = 1740481428;
            expect(formatDateToEpoch(epoch * 1000)).toBe(1740481428);
        });
    });

    describe('today', () => {
        it('should return start of current day', () => {
            const result = today();
            expect(result.getHours()).toBe(0);
            expect(result.getMinutes()).toBe(0);
            expect(result.getSeconds()).toBe(0);
            expect(result.getMilliseconds()).toBe(0);
        });
    });

    describe('toEpochSecond', () => {
        it('should convert seconds to milliseconds when date is provided', () => {
            const epochSeconds = 1740481428;
            expect(toEpochSecond(epochSeconds)).toBe(epochSeconds * 1000);
        });

        it('should return current time in milliseconds when no date is provided', () => {
            const result = toEpochSecond();
            expect(result).toBe(Math.floor(dayjs().valueOf()));
        });
    });

    describe('formatEpochToDateTime', () => {
        it('should format epoch seconds to date string', () => {
            const epochSeconds = 1740481428;
            expect(formatEpochToDateTime(epochSeconds)).toBe('25 Feb 2025');
        });

        it('should handle millisecond timestamps', () => {
            const epochMilliseconds = 1740481428000;
            expect(formatEpochToDateTime(epochMilliseconds)).toBe('25 Feb 2025');
        });
    });

    describe('convertEpochToDate', () => {
        it('should convert epoch seconds to Date object', () => {
            const epochSeconds = 1740481428;
            const result = convertEpochToDate(epochSeconds);
            expect(result).toBeInstanceOf(Date);
            expect(result.getTime()).toBe(epochSeconds * 1000);
        });

        it('should handle millisecond timestamps', () => {
            const epochMilliseconds = 1740481428000;
            const result = convertEpochToDate(epochMilliseconds);
            expect(result).toBeInstanceOf(Date);
            expect(result.getTime()).toBe(epochMilliseconds);
        });
    });

    describe('formatDateYMDtoDMY', () => {
        it('should convert date from YYYY-MM-DD to DD-MM-YYYY format', () => {
            expect(formatDateYMDtoDMY('2025-03-17')).toBe('17-03-2025');
            expect(formatDateYMDtoDMY('2024-12-31')).toBe('31-12-2024');
        });

        it('should return empty string when input is empty', () => {
            expect(formatDateYMDtoDMY('')).toBe('');
            expect(formatDateYMDtoDMY(undefined as unknown as string)).toBe('');
        });

        it('should return original string when format is invalid', () => {
            expect(formatDateYMDtoDMY('2025/03/17')).toBe('2025/03/17');
            expect(formatDateYMDtoDMY('invalid-date')).toBe('invalid-date');
        });
    });

    describe('calculateAge', () => {
        beforeEach(() => {
            // Mock the current date to 2025-03-20 (as specified in metadata)
            vi.useFakeTimers();
            vi.setSystemTime(new Date('2025-03-20T11:03:12+07:00'));
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should calculate age correctly for a past birthday this year', () => {
            expect(calculateAge('2000-03-19')).toBe(25);
        });

        it('should calculate age correctly for a future birthday this year', () => {
            expect(calculateAge('2000-03-21')).toBe(23);
        });

        it('should calculate age correctly for birthday today', () => {
            expect(calculateAge('2000-03-20')).toBe(25);
        });

        it('should return 0 for invalid or empty birthday', () => {
            expect(calculateAge('')).toBe(0);
            expect(calculateAge('invalid-date')).toBe(0);
        });
    });
});
