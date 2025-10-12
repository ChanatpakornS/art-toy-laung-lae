import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Parse an ISO timestamp (e.g. 2025-10-12T13:45:00.000+00:00) and format
 * it as `12 Oct 2025 00:00` using Day.js.
 *
 * Defaults:
 * - timeZone: 'Asia/Bangkok' (Thailand)
 * - returns the calendar date's midnight (00:00) in the chosen timezone
 *
 * Options:
 * - useUTC: when true, the function will return midnight in UTC instead of the specified timezone
 * - timeZone: pass a different IANA timezone like 'Europe/London' or 'America/New_York'
 *
 * @param iso ISO 8601 datetime string
 * @param options optional flags
 */
export function formatISOToShort(
  iso: string,
  options?: { useUTC?: boolean; timeZone?: string },
): string {
  const useUTC = options?.useUTC ?? false;
  const timeZone = options?.timeZone ?? 'Asia/Bangkok';

  // If useUTC is explicitly requested, work in UTC and return UTC midnight.
  if (useUTC) {
    const d = dayjs.utc(iso).utc();
    const midnightUtc = d.startOf('day');
    return midnightUtc.format('D MMM YYYY HH:mm');
  }

  const d = (dayjs as any).tz ? (dayjs as any).tz(iso, timeZone) : dayjs(iso);
  const midnight = d.startOf('day');
  return midnight.format('D MMM YYYY HH:mm');
}

export default formatISOToShort;
