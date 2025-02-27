import GlobalMarketCapChart from "@/components/GlobalMarketCapChart";
import PublicCompaniesHoldings from "@/components/PublicHoldings";
import {
  fetchBitcoinPublicCompaniesHoldings,
  fetchEthereumPublicCompaniesHoldings,
  fetchGlobalData,
  fetchGlobalMarketCapHistory,
} from "@/lib/api";
import { InfoIcon } from "@/utils/Icons";
import millify from "millify";

export default async function Home() {
  const [globalData, marketCapHistory, bitcoinHoldings, ethereumHoldings] =
    await Promise.all([
      fetchGlobalData(),
      fetchGlobalMarketCapHistory(),
      fetchBitcoinPublicCompaniesHoldings(),
      fetchEthereumPublicCompaniesHoldings(),
    ]);

  return (
    <main className="container mx-auto mt-8 font-poppins">
      <h1 className="text-2xl sm:text-3xl font-bold m-4">Global Crypto Market</h1>
      <div className="flex items-center bg-slate-900 rounded-xl m-4">
        <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
          <div className="flex items-center gap-1">
            <p className="font-light text-gray-400 text-xs sm:text-sm">Total Market cap</p>
            <InfoIcon className="text-gray-400" />
          </div>
          <p className="text-sm sm:text-xl">${millify(globalData?.totalMarketCap)}</p>
        </div>
        <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
          <div className="flex items-center gap-1">
            <p className="font-light text-gray-400 text-xs sm:text-sm">24h Volume</p>
            <InfoIcon className="text-gray-400" />
          </div>
          <p className="text-sm sm:text-xl">${millify(globalData?.total24hVolume)}</p>
        </div>

        <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
          <div className="flex items-center gap-1">
            <p className="font-light text-gray-400 text-xs sm:text-sm">Total Coins</p>
            <InfoIcon className="text-gray-400" />
          </div>
          <p className="text-sm sm:text-xl">{globalData?.totalCoins}</p>
        </div>

        <div className="p-1 sm:p-3 m-2 border-r border-r-gray-800 w-1/4">
          <div className="flex items-center gap-1">
            <p className="font-light text-gray-400 text-xs sm:text-sm">Total Exchanges</p>
            <InfoIcon className="text-gray-400" />
          </div>
          <p className="text-sm sm:text-xl">{globalData?.totalExchanges}</p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-3/4">
          <GlobalMarketCapChart data={marketCapHistory} />
        </div>
      </div>

      <PublicCompaniesHoldings
        bitcoinHoldings={bitcoinHoldings}
        ethereumHoldings={ethereumHoldings}
      />
    </main>
  );
}
