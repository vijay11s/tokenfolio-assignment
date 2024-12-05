import { useEffect, useState } from "react";
import axios from "axios";
import { currencies } from "../lib/constants";
import { formatCurrency } from "../utils";
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

  const currentPrice = formatCurrency(
    cryptoPrices[selectedCrypto?.id]?.[selectedCurrency] ?? 0,
    selectedCurrency
  );

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

      <p>Current Price: {currentPrice}</p>
      <p>24h Change: {selectedCrypto.price_change_percentage_24h}%</p>
    </div>
  );
};

export default CryptoDetails;
