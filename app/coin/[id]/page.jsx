import { fetchCoinData, fetchCoinPriceHistory } from "@/lib/api";
import millify from "millify";
import Image from "next/image";
import PriceChart from "@/components/PriceChart";
import { FileIcon, InfoIcon, InternetIcon } from "@/utils/Icons";

export default async function CoinPage({ params }) {
  const [coinData, priceHistory] = await Promise.all([
    fetchCoinData(params.id),
    fetchCoinPriceHistory(params.id, "7d"),
  ]);

  return (
    <main className="container mx-auto mt-8 px-4">
      <div className="flex">
        <div>
          <div className="flex items-center mb-4">
            <Image
              src={coinData.iconUrl}
              alt={coinData.name}
              className="mr-2"
              width={32}
              height={32}
            />
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-3xl font-bold">{coinData.name}</h1>
              <small className="ml-[1px] text-slate-400">
                {coinData.symbol} | {coinData.change} %
              </small>
            </div>
          </div>

          <div className="flex items-center bg-slate-900 rounded-xl m-2">
            <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
              <div className="flex items-center gap-1">
                <p className="font-light text-gray-400 text-xs sm:text-sm">
                  Market cap
                </p>
                <InfoIcon className="text-gray-400" />
              </div>
              <p className="text-sm sm:text-xl">
                ${millify(coinData.marketCap)}
              </p>
            </div>
            <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
              <div className="flex items-center gap-1">
                <p className="font-light text-gray-400 text-xs sm:text-sm">
                  Price
                </p>
                <InfoIcon className="text-gray-400" />
              </div>
              <p className="text-sm sm:text-xl">${millify(coinData.price)}</p>
            </div>

            <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
              <div className="flex items-center gap-1">
                <p className="font-light text-gray-400 text-xs sm:text-sm">
                  All time high
                </p>
                <InfoIcon className="text-gray-400" />
              </div>
              <p className="text-sm sm:text-xl">
                ${millify(coinData.allTimeHigh.price)}
              </p>
            </div>

            <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
              <div className="flex items-center gap-1">
                <p className="font-light text-gray-400 text-xs sm:text-sm">
                  Popularity
                </p>
                <InfoIcon className="text-gray-400" />
              </div>
              <p className="text-sm sm:text-xl">#{coinData.rank}</p>
            </div>
          </div>

          <div className="m-4 my-6 mb-1">
            <p className="text-2xl font-medium">About {coinData.name}</p>
            <p className="text-gray-400">{coinData.description}</p>
          </div>

          <div className="m-4 mb-1">
            <p className="text-2xl font-medium my-4">Resources</p>

            <div className="flex items-center gap-2 mb-2">
              <InternetIcon />
              <a href={coinData.websiteUrl} target="_blank">
                Official Website
              </a>
            </div>
            <div className="flex items-center gap-2 my-2">
              <FileIcon />
              <a href={coinData.links[0].url} target="_blank">
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4">
        <p className="text-2xl font-medium my-4">Price Chart</p>
        <div className="p-10 m-10">
          <PriceChart priceHistory={priceHistory} />
        </div>
      </div>
    </main>
  );
}
