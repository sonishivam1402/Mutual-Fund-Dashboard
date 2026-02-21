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
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
        <Input
          placeholder="Search by fund name or symbol..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-11 rounded-xl bg-background border-border focus-visible:ring-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => onCategoryChange('')}
          variant={selectedCategory === '' ? 'default' : 'outline'}
          size="sm"
          className={`rounded-full transition-colors ${selectedCategory === '' ? '' : 'hover:bg-muted'}`}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => onCategoryChange(category)}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            className={`rounded-full transition-colors ${selectedCategory === category ? '' : 'hover:bg-muted'}`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
