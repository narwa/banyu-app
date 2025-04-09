import dayjs from '#build/dayjs.imports.mjs';

/**
 * Format a date to a readable string.
 * @description A formatted date string.
 */
export const formatDate = ({
    date,
    format = 'DD MMM YYYY',
}: {
    date: number | Date;
    format?: string;
}): string => {
    return dayjs(date).format(format);
};

/**
 * @description A formatted date to epoch.
 */

export const formatDateToEpoch = (date: number | Date): number => {
    return dayjs(date).local().unix();
};

/**
 * @description get today date
 */

export const today = () => dayjs().startOf('day').toDate();

/**
 * @description format date in epoch time (second)
 */
export const toEpochSecond = (date?: number) => date ? date * 1000 : Math.floor(dayjs(date).valueOf());

/**
 * @description A formatted date to epoch.
 */

export const formatEpochToDate = (date: number | Date): string => {
    const epochMs = typeof date === 'number' && date < 1e12 ? date * 1000 : date;
    return dayjs(epochMs).local().format('DD MMM YYYY');
};

export const convertEpochToDate = (epoch: number): Date => {
    return new Date(epoch < 1e12 ? epoch * 1000 : epoch);
};

export const formatDateYMDtoDMY = (dateString: string) => {
    if (!dateString)
        return '';

    const parts = dateString.split('-');

    if (parts.length !== 3)
        return dateString;

    return `${parts[2]}-${parts[1]}-${parts[0]}`;
};

/**
 * @description A calculate age.
 */
export const calculateAge = (birthday: string): number => {
    if (!birthday)
        return 0;

    const birthDate = dayjs(birthday);
    const today = dayjs();

    if (!birthDate.isValid())
        return 0;

    let age = today.diff(birthDate, 'year');

    const birthdayThisYear = birthDate.set('year', today.year());
    if (today.isBefore(birthdayThisYear)) {
        age--;
    }

    return age;
};
