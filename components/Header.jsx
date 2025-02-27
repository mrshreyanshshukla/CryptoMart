"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchCoins } from "@/lib/api";
import { HistoryIcon, SearchIcon } from "@/utils/Icons";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  async function fetchSuggestions() {
    const coins = await searchCoins(searchTerm);
    setSuggestions(coins.slice(0, 5));
  }

  function handleSearch(coin) {
    const newRecentSearches = [
      coin,
      ...recentSearches.filter((item) => item.uuid !== coin.uuid),
    ].slice(0, 5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    router.push(`/coin/${coin.uuid}`);
    setSearchTerm("");
    setSuggestions([]);
    setIsFocused(false);
  }

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/">
            <span className="text-xl font-bold">CryptoMart</span>
          </Link>
          <Link href="/explore">Explore</Link>
        </div>
        <div className="relative mx-4">
          <input
            type="text"
            placeholder="Search crypto..."
            className="bg-gray-700 text-white px-4 py-2 rounded-full w-36 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <SearchIcon className="h-5 w-5 absolute hidden sm:flex right-3 top-2.5 " />
          {isFocused &&
            (suggestions.length > 0 || recentSearches.length > 0) && (
              <div className="absolute mt-1 w-full bg-white text-black rounded-md shadow-lg">
                {suggestions.map((coin) => (
                  <div
                    key={coin.uuid}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => handleSearch(coin)}
                  >
                    {coin.name} ({coin.symbol})
                  </div>
                ))}
                {suggestions.length === 0 &&
                  recentSearches.map((coin) => (
                    <div
                      key={coin.uuid}
                      className="px-4 text-slate-500 text-sm py-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                      onMouseDown={() => handleSearch(coin)}
                    >
                      <HistoryIcon /> {coin.name} ({coin.symbol})
                    </div>
                  ))}
              </div>
            )}
        </div>
      </div>
    </header>
  );
}
