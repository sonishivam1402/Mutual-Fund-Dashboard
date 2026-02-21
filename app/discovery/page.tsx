'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FundCard } from '@/components/fund-card';
import { FilterBar } from '@/components/filter-bar';
import { useFundStore } from '@/lib/store';
import { BarChart3 } from 'lucide-react';

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

export default function DiscoveryPage() {
  const router = useRouter();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [filteredFunds, setFilteredFunds] = useState<Fund[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);
  const { selectedFunds } = useFundStore();

  const handleCompareClick = () => {
    if (selectedFunds.length < 2) {
      setCompareMessage('Select at least 2 funds to compare.');
      return;
    }
    setCompareMessage(null);
    router.push('/comparison');
  };

  const categories = Array.from(new Set(funds.map((f) => f.category)));

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch('/funds.json');
        const data = await response.json();
        setFunds(data.funds);
        setFilteredFunds(data.funds);
      } catch (error) {
        console.error('Error fetching funds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  useEffect(() => {
    if (selectedFunds.length >= 2) setCompareMessage(null);
  }, [selectedFunds.length]);

  useEffect(() => {
    let filtered = funds;

    if (searchTerm) {
      filtered = filtered.filter(
        (f) =>
          f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }

    setFilteredFunds(filtered);
  }, [searchTerm, selectedCategory, funds]);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">Fund Discovery</h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Browse and compare mutual funds to build your investment portfolio
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-card rounded-2xl border border-border shadow-sm p-6 mb-8">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
        </div>

        {/* Selection Status */}
        {selectedFunds.length > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                {selectedFunds.length} fund{selectedFunds.length !== 1 ? 's' : ''} selected for comparison
              </p>
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {selectedFunds.map((f) => f.name).join(', ')}
              </p>
              {compareMessage && (
                <p className="text-sm text-amber-600 dark:text-amber-400 font-medium mt-2">{compareMessage}</p>
              )}
            </div>
            <Button
              onClick={handleCompareClick}
              className="w-full sm:w-auto shrink-0"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Compare Funds
            </Button>
          </div>
        )}

        {/* Fund Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64 rounded-2xl bg-muted/30 border border-border">
            <p className="text-muted-foreground">Loading funds...</p>
          </div>
        ) : filteredFunds.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 rounded-2xl bg-card border border-border">
            <p className="text-muted-foreground mb-4">No funds found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredFunds.map((fund) => (
              <FundCard
                key={fund.id}
                id={fund.id}
                name={fund.name}
                symbol={fund.symbol}
                image={fund.image}
                category={fund.category}
                aum={fund.aum}
                nav={fund.nav}
                expenseRatio={fund.expenseRatio}
                returns={fund.returns}
                riskScore={fund.riskScore}
                volatility={fund.volatility}
                holdings={fund.holdings}
                allocation={fund.allocation}
                inception={fund.inception}
                manager={fund.manager}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
