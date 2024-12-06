export function formatCurrency(value: number, currency: string): string {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    currencyDisplay: "narrowSymbol",
  });
  return formatter.format(value);
}

export function convertMarketCap(
  marketCap: number,
  fromPrice: number,
  toPrice: number
): number {
  const conversionRate = toPrice / fromPrice;
  return marketCap * conversionRate;
}
