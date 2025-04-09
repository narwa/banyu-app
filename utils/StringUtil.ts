/**
 * Capitalizes the first letter of the given text and converts the rest to lowercase.
 *
 * @param {string} text - The text to be transformed.
 * @returns {string} The transformed text with the first letter capitalized.
 * @description This function capitalizes the first letter of the string and ensures the rest of the string is in lowercase.
 */
export const toCapitalizeCase = (text: string): string => text.charAt(0).toUpperCase() + text.toLowerCase().slice(1);

/**
 * Converts all characters of the given text to lowercase.
 *
 * @param {string} text - The text to be converted.
 * @returns {string} The text in lowercase.
 * @description This function converts all the characters of the input string to lowercase.
 */
export const toLowerCase = (text: string): string => text.toLowerCase();

/**
 * Converts all characters of the given text to uppercase.
 *
 * @param {string} text - The text to be converted.
 * @returns {string} The text in uppercase.
 * @description This function converts all the characters of the input string to uppercase.
 */
export const toUpperCase = (text: string): string => text.toUpperCase();

/**
 * Converts a string into an array using the specified separator.
 *
 * @param {string} text - The string to be split.
 * @param {string} separator - The separator to split the string by.
 * @returns {string[]} An array of strings obtained by splitting the original string.
 * @description This function splits the input string into an array based on the provided separator.
 */
export const stringToArray = (text: string, separator: string): string[] => text.split(separator);

/**
 * Truncates text if it exceeds the specified maximum length and adds ellipsis.
 *
 * @param {string} text - The text to be truncated.
 * @param {number} maxLength - The maximum length allowed before truncation.
 * @param {string} ellipsis - The ellipsis string to append (default: '...').
 * @returns {string} The truncated text with ellipsis if it exceeds the maximum length, otherwise the original text.
 * @description This function truncates the input string if it exceeds the specified maximum length and adds ellipsis at the end.
 */
export const truncateString = (text: string, maxLength: number, ellipsis: string = '...'): string =>
    text.length > maxLength ? `${text.slice(0, maxLength)}${ellipsis}` : text;
