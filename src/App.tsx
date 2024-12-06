import { useState, useEffect } from "react";
import CryptoList from "./components/CryptoList";
import CryptoDetails from "./components/CryptoDetails";
import CurrencySelector from "./components/CurrencySelector";
import { Crypto, currencies } from "./lib/constants";
import axios from "axios";
import { useLocalStorage } from "./hooks/useLocalStorage";

const App: React.FC = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<Record<string, any>>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>(
    currencies[0].code
  );
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [filteredCryptos, setFilteredCryptos] = useState<Crypto[]>([]);
  const [search, setSearch] = useState("");
  const [recentSearches, setRecentSearches] = useLocalStorage<any[]>(
    "recentSearches",
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSelectCrypto = (
    crypto: Record<string, any>,
    isRecentClicked: boolean = false
  ) => {
    setSelectedCrypto(crypto);
    setSearch("");
    if (!isRecentClicked) {
      const newRecentSearches =
        recentSearches.length >= 10
          ? [...new Set([...recentSearches.slice(1), crypto])]
          : [...new Set([...recentSearches, crypto])];
      setRecentSearches(newRecentSearches);
    }
  };

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: selectedCurrency,
              order: "market_cap_desc",
              per_page: 50,
              page: 1,
            },
          }
        );
        setCryptos(response.data);
        setFilteredCryptos(response.data);
        setError("");
      } catch (err: any) {
        setError(
          "Something went wrong. Please refresh the page or try after sometime."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchCryptos();
  }, []);

  useEffect(() => {
    const filtered = cryptos.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCryptos(filtered);
  }, [search]);

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #1A1A40, #2A2A72, #6A0572)",
        color: "#F3F4F6",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-5xl mx-auto px-5 py-8">
        <CurrencySelector
          currencies={currencies}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={setSelectedCurrency}
        />
        <div className="flex flex-col gap-6">
          <CryptoList
            onSelect={handleSelectCrypto}
            filteredCryptos={filteredCryptos}
            search={search}
            handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            isLoading={isLoading}
            error={error}
          />
          {recentSearches.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-bold pb-3">Recent Searches</h3>
              <ul className="flex gap-x-4 flex-wrap gap-y-2">
                {recentSearches.map((crypto) => (
                  <li
                    key={crypto.id}
                    onClick={() => handleSelectCrypto(crypto, true)}
                    className="cursor-pointer capitalize hover:underline text-blue-300 font-semibold"
                  >
                    {crypto.id}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Object.keys(selectedCrypto).length > 0 && (
            <CryptoDetails
              selectedCrypto={selectedCrypto}
              selectedCurrency={selectedCurrency}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
