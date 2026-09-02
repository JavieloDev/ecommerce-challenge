import { Pipe, PipeTransform } from '@angular/core';

/**
 * TimeAgoPipe
 *
 * Converts a date into a human-readable relative time string (e.g., "hace 5 minutos").
 * Updates automatically when time changes (pure: false).
 *
 * @usage
 * {{ createdAt | timeAgo }} // "hace 3 días"
 * {{ '2024-01-15T10:30:00' | timeAgo }} // "hace 2 horas"
 *
 * @supports
 * - Date objects
 * - ISO strings
 * - Timestamps (numbers)
 *
 * @returns
 * - "justo ahora" for < 60 seconds
 * - "hace X minutos/horas/días/meses/años" for older dates
 */
@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {
  /**
   * Transforms a date into a relative time string
   * @param value - Date, string, number, or null
   * @returns Human-readable relative time in Spanish
   */
  transform(value: Date | string | number | null | undefined): string {
    if (!value) return '';

    const date = new Date(value);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

    if (seconds < 60) return 'justo ahora';

    const intervals: [number, string][] = [
      [31536000, 'año'],
      [2592000, 'mes'],
      [86400, 'día'],
      [3600, 'hora'],
      [60, 'minuto'],
    ];

    for (const [secondsInUnit, label] of intervals) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count >= 1) {
        return `hace ${count} ${label}${count > 1 ? 's' : ''}`;
      }
    }

    return 'justo ahora';
  }
}
