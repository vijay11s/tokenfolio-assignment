export const currencies: CurrencyType[] = [
  { code: "usd", name: "United States Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "eur", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "inr", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "chf", name: "Swiss Franc", symbol: "₣", flag: "🇨🇭" },
  { code: "gbp", name: "British Pound", symbol: "£", flag: "🇬🇧" },
];

export interface CurrencyType {
  code: string;
  name: string;
  symbol: string;
  flag: string;
}

export interface Crypto {
  id: string;
  name: string;
  current_price: number;
  symbol: string;
  image: string;
}
