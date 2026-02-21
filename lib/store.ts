import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Fund {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  category: string;
  aum: number;
  nav: number;
  expenseRatio: number;
  returns: {
    oneYear: number;
    threeYear: number;
    fiveYear: number;
    tenYear: number;
  };
  riskScore: number;
  volatility: number;
  holdings: Array<{ name: string; symbol?: string; percentage: number }>;
  allocation: Record<string, number>;
  inception: string;
  manager: string;
}

interface FundStore {
  selectedFunds: Fund[];
  addFund: (fund: Fund) => void;
  removeFund: (fundId: string) => void;
  clearSelected: () => void;
  canAddMore: () => boolean;
}

export const useFundStore = create<FundStore>()(
  persist(
    (set, get) => ({
      selectedFunds: [],
      addFund: (fund: Fund) => {
        set((state) => {
          if (state.selectedFunds.length < 3 && !state.selectedFunds.find(f => f.id === fund.id)) {
            return { selectedFunds: [...state.selectedFunds, fund] };
          }
          return state;
        });
      },
      removeFund: (fundId: string) => {
        set((state) => ({
          selectedFunds: state.selectedFunds.filter(f => f.id !== fundId),
        }));
      },
      clearSelected: () => set({ selectedFunds: [] }),
      canAddMore: () => get().selectedFunds.length < 3,
    }),
    {
      name: 'fund-store',
    }
  )
);
