/**
 * Formats a number to the local format.
 * @param number {number} to be formatted
 * @returns {string} formatted number
 */
const format = (number) => new Intl.NumberFormat().format(Math.round(number * 10) / 10);

/**
 * Shortens a number.
 * @param number {number} to be shortened
 * @returns {string} shortened number
 */
const shortNumber = (number) => {
    if (number >= 1000000) {
        return format(number / 1000000) + 'M';
    }
    
    if(number >= 1000) {
        return format(number / 1000) + 'k';
    }
    
    return format(number);
};

export default shortNumber;