'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search by fund name or symbol..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-white"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onCategoryChange('')}
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          className={selectedCategory === '' ? 'bg-primary text-white' : ''}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            className={selectedCategory === category ? 'bg-primary text-white' : ''}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
