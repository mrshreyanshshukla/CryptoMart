const API_BASE_URL = "https://api.coinranking.com/v2";
const COINGECKO_API_BASE_URL = "https://api.coingecko.com/api/v3";
const API_KEY = process.env.NEXT_PUBLIC_COINRANKING_API_KEY;

const headers = {
  "x-access-token": API_KEY,
};

export async function fetchGlobalData() {
  const response = await fetch(`${API_BASE_URL}/stats`, {
    headers,
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data.data;
}

export async function fetchCoinList(offset = 0, limit = 20) {
  const response = await fetch(
    `${API_BASE_URL}/coins?offset=${offset}&limit=${limit}&orderBy=marketCap&orderDirection=desc`,
    { headers, next: { revalidate: 60 } }
  );
  const data = await response.json();
  return data.data;
}

export async function fetchCoinData(uuid) {
  const response = await fetch(`${API_BASE_URL}/coin/${uuid}`, {
    headers,
    next: { revalidate: 60 },
  });
  const data = await response.json();
  return data.data.coin;
}

export async function searchCoins(query) {
  const response = await fetch(
    `${API_BASE_URL}/search-suggestions?query=${query}`,
    { headers, cache: "no-store" }
  );
  const data = await response.json();
  return data?.data?.coins;
}

export async function fetchCoinPriceHistory(uuid, timePeriod = "7d") {
  const response = await fetch(
    `${API_BASE_URL}/coin/${uuid}/history?timePeriod=${timePeriod}`,
    { headers, next: { revalidate: 3600 } }
  );
  const data = await response.json();
  return data.data;
}

export async function fetchGlobalMarketCapHistory() {
  const response = await fetch(`${COINGECKO_API_BASE_URL}/global`, {
    next: { revalidate: 86400 },
  });
  const data = await response.json();
  return data.data;
}

export async function fetchBitcoinPublicCompaniesHoldings() {
  const response = await fetch(
    `${COINGECKO_API_BASE_URL}/companies/public_treasury/bitcoin`,
    { next: { revalidate: 86400 } }
  ); // Cache for 24 hours
  const data = await response.json();
  return data.companies;
}

export async function fetchEthereumPublicCompaniesHoldings() {
  const response = await fetch(
    `${COINGECKO_API_BASE_URL}/companies/public_treasury/ethereum`,
    { next: { revalidate: 86400 } }
  ); // Cache for 24 hours
  const data = await response.json();
  return data.companies;
}
