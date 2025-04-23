import { format, formatDistanceToNowStrict } from 'date-fns';

export const getFormattedExpirationTime = (expirationTime: number): string => {
  const now = Date.now();

  if (now > expirationTime * 1000) {
    return 'Voting was closed';
  }

  const diffInSeconds = (expirationTime * 1000 - now) / 1000;
  let unit: 'month' | 'day' | 'hour' | 'minute' = 'minute';

  if (diffInSeconds >= 60 * 60 * 24 * 30) {
    unit = 'month';
  } else if (diffInSeconds >= 60 * 60 * 24) {
    unit = 'day';
  } else if (diffInSeconds >= 60 * 60) {
    unit = 'hour';
  } else if (diffInSeconds >= 60) {
    unit = 'minute';
  }

  const relativeTime =
    diffInSeconds < 60
      ? '<1 min'
      : formatDistanceToNowStrict(expirationTime * 1000, { unit, addSuffix: true });

  return `${format(expirationTime * 1000, 'yyyy-MM-dd')} (${relativeTime})`;
};