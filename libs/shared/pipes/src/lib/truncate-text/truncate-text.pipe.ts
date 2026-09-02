import { Pipe, PipeTransform } from '@angular/core';

/**
 * TruncatePipe
 *
 * Truncates a string to a specified limit and appends a suffix.
 * Intelligently cuts at the last space to avoid breaking words.
 *
 * @usage
 * {{ longText | truncate }}              // 100 chars + '…'
 * {{ longText | truncate:50 }}           // 50 chars + '…'
 * {{ longText | truncate:30:'...' }}     // 30 chars + '...'
 *
 * @params
 * - limit: number - Max characters (default: 100)
 * - suffix: string - Text to append (default: '…')
 *
 * @returns
 * - Original string if under limit
 * - Truncated string with suffix if over limit
 */
@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  /**
   * Truncates a string at the last space before the limit
   * @param value - String to truncate
   * @param limit - Maximum length (default: 100)
   * @param suffix - Suffix to append (default: '…')
   * @returns Truncated string
   */
  transform(
    value: string | null | undefined,
    limit = 100,
    suffix = '…',
  ): string {
    if (!value) return '';
    if (value.length <= limit) return value;

    const trimmed = value.slice(0, limit);
    const lastSpace = trimmed.lastIndexOf(' ');

    return (lastSpace > 0 ? trimmed.slice(0, lastSpace) : trimmed) + suffix;
  }
}
