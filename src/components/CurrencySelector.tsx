import { CurrencyType } from "../lib/constants";

interface Props {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
  currencies: CurrencyType[];
}

function CurrencySelector({
  selectedCurrency,
  onCurrencyChange,
  currencies,
}: Props) {
  return (
    <div className="flex justify-end p-4  w-full">
      <div className="p-4 border rounded-lg shadow-lg">
        <label className="block text-sm font-medium mb-2">
          Select Currency
        </label>
        <select
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value)}
          className="w-full p-2 border rounded-lg bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:shadow-md transition duration-200"
        >
          {currencies.map((currency: CurrencyType) => (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.name} ({currency.symbol})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CurrencySelector;
