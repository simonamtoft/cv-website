/**
 * Date formatting utilities for flexible date parsing and display
 */

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/**
 * Parses flexible date formats including:
 * - YYYY-MM or YYYY/MM
 * - YYYY-MM-DD
 * - YYYY (year only)
 * - "MMM YYYY" or "YYYY MMM" (e.g., "Jan 2025")
 * - "now" (case-insensitive) - returns current date
 * - "YYYY spring" or "YYYY fall" - semester notation
 *
 * @param {string} value - Date string to parse
 * @returns {Date|null} Parsed date or null if invalid
 *
 * @example
 * parseFlexibleDate("2025-01") // Returns Date object for January 2025
 * parseFlexibleDate("now") // Returns current Date
 * parseFlexibleDate("Jan 2025") // Returns Date object for January 2025
 */
export const parseFlexibleDate = (value) => {
  if (!value) return null;
  if (typeof value !== 'string') return null;
  const raw = value.trim();
  if (!raw) return null;

  const lower = raw.toLowerCase();
  if (lower === 'now') return new Date();

  // YYYY-MM or YYYY/MM or YYYY-MM-DD
  const isoMatch = lower.match(/^(\d{4})[-/](\d{1,2})(?:[-/](\d{1,2}))?$/);
  if (isoMatch) {
    const year = parseInt(isoMatch[1], 10);
    const month = Math.min(Math.max(parseInt(isoMatch[2], 10), 1), 12) - 1;
    return new Date(year, month, 1);
  }

  // YYYY
  const yearOnly = lower.match(/^(\d{4})$/);
  if (yearOnly) {
    return new Date(parseInt(yearOnly[1], 10), 0, 1);
  }

  // "MMM YYYY" or "YYYY MMM"
  const monthNames = MONTH_NAMES.map((m) => m.toLowerCase());
  const monthYearA = lower.match(/^([a-z]{3,})\s+(\d{4})$/);
  if (monthYearA) {
    const mi = monthNames.indexOf(monthYearA[1].slice(0, 3));
    if (mi >= 0) return new Date(parseInt(monthYearA[2], 10), mi, 1);
  }
  const monthYearB = lower.match(/^(\d{4})\s+([a-z]{3,})$/);
  if (monthYearB) {
    const mi = monthNames.indexOf(monthYearB[2].slice(0, 3));
    if (mi >= 0) return new Date(parseInt(monthYearB[1], 10), mi, 1);
  }

  return null;
};

/**
 * Formats a date value for display
 *
 * @param {string} value - Date string to format
 * @returns {string} Formatted date string
 *
 * @example
 * formatDisplayDate("2025-01") // Returns "Jan 2025"
 * formatDisplayDate("now") // Returns "Now"
 * formatDisplayDate("2025") // Returns "2025"
 */
export const formatDisplayDate = (value) => {
  if (!value) return '';
  if (typeof value === 'string' && value.trim().toLowerCase() === 'now') return 'Now';

  const parsed = parseFlexibleDate(value);
  if (!parsed) {
    // Fallback: show raw value
    return String(value);
  }

  // Detect if input had month granularity
  const text = String(value).trim();
  const hasMonth = /(\d{4}[-/]\d{1,2})|(^[A-Za-z]{3,}\s+\d{4}$)|(^(\d{4})\s+[A-Za-z]{3,}$)|(\d{4}\s+(spring|fall))/i.test(text);
  if (hasMonth) {
    const month = MONTH_NAMES[parsed.getMonth()];
    const year = parsed.getFullYear();
    return `${month} ${year}`;
  }
  return String(parsed.getFullYear());
};

/**
 * Formats a date range for display
 *
 * @param {string} startValue - Start date string
 * @param {string} endValue - End date string
 * @returns {string} Formatted date range string
 *
 * @example
 * formatDisplayRange("2023-01", "2025-12") // Returns "Jan 2023 - Dec 2025"
 * formatDisplayRange("2023", "now") // Returns "2023 - Now"
 */
export const formatDisplayRange = (startValue, endValue) => {
  const startText = formatDisplayDate(startValue);
  const endText = formatDisplayDate(endValue);
  if (!endValue || startText === endText) return startText;
  return `${startText} - ${endText}`;
};

/**
 * Converts a year string (possibly with semester notation) to a numerical value
 * Used for sorting dates
 *
 * @param {string} yearString - Year string, possibly with "spring" or "fall" suffix
 * @returns {number} Numerical year value (with .0 for spring, .5 for fall)
 *
 * @example
 * getNumericalYear("2025") // Returns 2025
 * getNumericalYear("2025 spring") // Returns 2025.0
 * getNumericalYear("2025 fall") // Returns 2025.5
 */
export const getNumericalYear = (yearString) => {
  if (yearString === 'now') {
    return new Date().getFullYear();
  }

  // Check for semester suffix
  const yearParts = yearString.split(' ');
  const year = parseInt(yearParts[0], 10);

  if (yearParts.length > 1) {
    const semester = yearParts[1].toLowerCase();
    if (semester === 'spring') {
      return year + 0.0;
    } else if (semester === 'fall') {
      return year + 0.5;
    }
  }

  return year;
};

/**
 * Gets a comparable timestamp for sorting
 *
 * @param {string} value - Date string to convert to timestamp
 * @returns {number} Timestamp in milliseconds, or Infinity if invalid
 *
 * @example
 * getComparableTime("2025-01") // Returns timestamp for January 2025
 * getComparableTime("now") // Returns current timestamp
 */
export const getComparableTime = (value) => {
  const parsed = parseFlexibleDate(value);
  if (parsed) return parsed.getTime();
  if (typeof value === 'string') {
    const approx = getNumericalYear(value);
    if (!Number.isNaN(approx)) return new Date(Math.trunc(approx), 0, 1).getTime();
  }
  return Number.POSITIVE_INFINITY;
};
