import { useEffect, useState } from "react";
import axios from "axios";
import { currencies } from "../lib/constants";
import { formatCurrency, convertMarketCap } from "../utils";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  selectedCrypto: Record<string, any>;
  selectedCurrency: string;
}

const CryptoDetails: React.FC<Props> = ({
  selectedCrypto,
  selectedCurrency,
}) => {
  const [cryptoPrices, setCryptoPrices] = useState<Record<string, any>>({});
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const currencyCodes = currencies.map((currency) => currency.code);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price",
          {
            params: {
              vs_currencies: currencyCodes.join(","),
              ids: selectedCrypto.id,
            },
          }
        );
        setCryptoPrices({
          ...cryptoPrices,
          ...response.data,
        });
        setError("");
      } catch (err: any) {
        setError(
          err?.message ?? "Something went wrong. Please try after sometime"
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (
      !cryptoPrices.hasOwnProperty(selectedCrypto?.id) &&
      selectedCrypto?.id &&
      selectedCurrency
    ) {
      fetchCryptoDetails();
    }
    if (cryptoPrices.hasOwnProperty(selectedCrypto?.id)) {
      setError("");
    }
  }, [selectedCrypto?.id, selectedCurrency]);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-200 font-semibold">Error: {error}</p>;
  }

  const currentPrice = formatCurrency(
    cryptoPrices[selectedCrypto?.id]?.[selectedCurrency] ?? 0,
    selectedCurrency
  );

  const marketCap = formatCurrency(
    convertMarketCap(
      selectedCrypto?.market_cap,
      cryptoPrices[selectedCrypto?.id]?.usd,
      cryptoPrices[selectedCrypto?.id]?.[selectedCurrency]
    ) ?? 0,
    selectedCurrency
  );

  const priceChange = selectedCrypto.price_change_percentage_24h;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        <img
          src={selectedCrypto.image}
          alt={selectedCrypto.name}
          className="w-6 h-6 mr-2"
        />
        <h2 className="text-xl font-bold">{selectedCrypto.name}</h2>
      </div>
      <p>Symbol: {selectedCrypto?.symbol?.toUpperCase()}</p>
      <p>Current Price: {currentPrice}</p>
      <p>Market Cap: {marketCap}</p>
      <p>
        24h Change:{" "}
        <span className={priceChange > 0 ? "text-green-400" : "text-red-400"}>
          {priceChange}%
        </span>
      </p>
    </div>
  );
};

export default CryptoDetails;
