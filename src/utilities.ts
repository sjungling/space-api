import { Scalars } from "./generated/apollo-hooks";

/**
 * @summary Helper for determining compile/run-time environment
 * @returns {boolean}
 */
export const isDevelopment = (): boolean =>
  process.env.NODE_ENV === "production" ? false : true;

/**
 * @summary Return time parts for a number of seconds
 * @param {number} seconds
 * @example
 *  convertSecondsToFormattedTime(936543)
 *  // returns
 *  {
 *    days: 10,
 *    hours: 20,
 *    minutes: 9,
 *    seconds 3
 *  }
 *
 */
export const convertSecondsToFormattedTime = (
  seconds: number
): { hours: number; days: number; minutes: number; seconds: number } => {
  const days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

export type FormatDateOptions = {
  weekday?: "narrow" | "short" | "long";
  era?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
  hour?: "numeric" | "2-digit";
  minute?: "numeric" | "2-digit";
  second?: "numeric" | "2-digit";
  timeZoneName?: "short" | "long";

  // Time zone to express it in
  timeZone?: string;
  // Force 12-hour or 24-hour
  hour12?: boolean;
};

/**
 * @summary Defines format for long date
 * @example
 *  `Friday, October 23, 1960`
 */
export const longDateFormat: FormatDateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

/**
 * @summary Defines formate for 12-hour time
 * @example
 * `2:00PM GMT-07:00`
 */
export const longTimeFormat: FormatDateOptions = {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
  timeZoneName: "long",
};

/**
 * @param {string} date - GraphQL Custom Scalar
 * @returns {string} Date and Time in ISO format
 */
export const formatISODate = (date: Scalars["DateTime"]): string => {
  return new Date(date).toISOString();
};
/**
 *
 * @param {string} unformattedDate
 * @param {FormatDateOptions} [formatOptions]
 * @returns {string} Formatted Date / Time
 */
export const formatDate = (
  unformattedDate: Scalars["DateTime"],
  formatOptions?: FormatDateOptions
): string => {
  const stringifiedDate = new Date(unformattedDate);
  return new Intl.DateTimeFormat("en-US", formatOptions ?? undefined).format(
    stringifiedDate
  );
};
