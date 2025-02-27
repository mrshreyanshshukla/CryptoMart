"use client";

import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "coin",
    drop: (item) => addToWatchlist(item.id, item.name, item.image),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addToWatchlist = (coinId, coinName, image) => {
    setWatchlist((prev) => {
      if (!prev.some((item) => item.coinId === coinId)) {
        const newWatchlist = [...prev, { coinId, coinName, image }];
        localStorage.setItem("watchlist", JSON.stringify(newWatchlist));
        return newWatchlist;
      }
      return prev;
    });
  };

  return (
    <div
      ref={drop}
      className={`p-4 border-2 rounded-lg ${
        isOver ? "border-blue-500" : "border-gray-300"
      } min-h-[200px]`}
    >
      <h2 className="text-xl font-bold mb-4">Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>Drag and drop coins here to add to your watchlist</p>
      ) : (
        <ul>
          {watchlist.map((coin) => (
            <li
              className="bg-slate-800 flex transition-all items-center gap-2 p-2 mb-2 rounded-xl cursor-pointer hover:bg-slate-700"
              onClick={() => router.push(`/coin/${coin.coinId}`)}
              key={coin.coinId}
            >
              <Image src={coin.image} alt={"image"} height={20} width={20} />
              {coin.coinName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
