export function compressString(asset_id: string): string {
  return asset_id.slice(0, 8) + "..." + asset_id.slice(-5)
}

export function tsToDateString(
  timestamp: number | string,
  locale: string = 'en-US'
): string {
  const tsNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;
  const date = new Date(tsNumber * 1000);
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
