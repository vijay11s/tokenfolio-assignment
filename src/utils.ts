export function formatCurrency(value: number, currency: string): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  });
  return formatter.format(value);
}
