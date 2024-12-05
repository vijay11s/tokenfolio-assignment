import { Crypto } from "../lib/constants";
import LoadingSpinner from "./LoadingSpinner";

interface Props {
  onSelect: (crypto: Record<string, any>) => void;
  filteredCryptos: Crypto[];
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error: string;
}

function CryptoList({
  onSelect,
  search,
  handleSearch,
  filteredCryptos,
  isLoading,
  error,
}: Props) {
  return (
    <div className="relative">
      <h1 className="text-2xl font-bold mb-4">Top 50 Cryptocurrencies</h1>
      <input
        type="text"
        placeholder="Search by name or symbol"
        value={search}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded w-full sm:w-1/2 text-gray-700"
      />
      {search && (
        <ul className="max-h-[calc(100vh_-_300px)] overflow-auto flex flex-col gap-4 absolute z-10 bg-gray-700 rounded-md px-6 py-3 w-full sm:w-1/2">
          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <p>{error}</p>
          ) : filteredCryptos.length > 0 ? (
            filteredCryptos.map((crypto) => (
              <li
                key={crypto.id}
                className="flex items-center mb-2 cursor-pointer"
                onClick={() => onSelect(crypto)}
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-6 h-6 mr-2"
                />
                {crypto.name} ({crypto.symbol.toUpperCase()})
              </li>
            ))
          ) : (
            <p>No Crypto found</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default CryptoList;
