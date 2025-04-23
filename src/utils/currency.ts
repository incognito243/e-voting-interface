export const formatCurrency = (value: number | string) => {
  if (typeof value === 'string') {
    value = parseFloat(value);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};