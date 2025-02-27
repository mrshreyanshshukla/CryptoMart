"use client";

import { fetchCoinList } from "@/lib/api";
import DraggableCoin from "@/components/DraggableCoin";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import Watchlist from "@/components/WatchList";

const PaginationButton = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2  rounded ${
      disabled
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-gray-800 text-gray-400 font-medium hover:bg-gray-700"
    }`}
    disabled={disabled}
  >
    {children}
  </button>
);

export default function Explore() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalCoins, setTotalCoins] = useState(0);
  const pageSize = 20;
  const router = useRouter();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    fetchCoins();
  }, [page]);

  async function fetchCoins() {
    const offset = (page - 1) * pageSize;
    const data = await fetchCoinList(offset, pageSize);
    setCoins(data.coins);
    setTotalCoins(data.stats.total);
    setLoading(false);
  }

  const totalPages = Math.ceil(totalCoins / pageSize);

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-semibold mb-4">Explore Markets</h1>
        {!loading && coins.length === 0 && (
          <p className="text-center">
            No Coins Available at the moment. Please try later.
          </p>
        )}
        {!loading && coins.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-400 border-y border-y-gray-600 uppercase">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Market
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Market cap
                      </th>
                      <th scope="col" className="px-6 py-3">
                        24H Change (%)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Symbol
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Rank
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coins.map((coin) => (
                      <DraggableCoin coin={coin} key={coin.uuid} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!loading && coins.length > 0 && (
                <div className="my-8 flex justify-center items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      Showing{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {(page - 1) * pageSize + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {Math.min(page * pageSize, totalCoins)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {totalCoins}
                      </span>{" "}
                      Coins
                    </span>
                    <div className="inline-flex space-x-2 mt-2 xs:mt-0">
                      <PaginationButton
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </PaginationButton>
                      <PaginationButton
                        onClick={() =>
                          setPage((prev) => Math.min(prev + 1, totalPages))
                        }
                        disabled={page === totalPages}
                      >
                        Next
                      </PaginationButton>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!loading && coins.length > 0 && (
              <div className="lg:col-span-1">
                <Watchlist />
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </main>
    </DndProvider>
  );
}
