import { create } from "zustand";

const useStore = create((set) => ({
  watchlist: [],
  addToWatchlist: (coin) =>
    set((state) => ({ watchlist: [...state.watchlist, coin] })),
  removeFromWatchlist: (name) =>
    set((state) => ({
      watchlist: state.watchlist.filter((coin) => coin.name !== name),
    })),
}));

export default useStore;
