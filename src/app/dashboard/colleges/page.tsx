'use client';

import { useState } from 'react';
import { collegeData } from '@/lib/college-data';
import type { College } from '@/lib/college-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CollegeCard } from '@/components/colleges/college-card';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeType, setCollegeType] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');

  const filteredAndSortedColleges = collegeData
    .filter((college: College) => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = collegeType === 'all' || college.type === collegeType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'fees-asc':
          return a.fees - b.fees;
        case 'fees-desc':
          return b.fees - a.fees;
        default:
          return 0;
      }
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search colleges by name or location..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="size-4" /> Filters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Filter by Type</h4>
                  <p className="text-sm text-muted-foreground">
                    Select college type.
                  </p>
                </div>
                <RadioGroup value={collegeType} onValueChange={setCollegeType}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="r-all" />
                    <Label htmlFor="r-all">All</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Government" id="r-gov" />
                    <Label htmlFor="r-gov">Government</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Private" id="r-private" />
                    <Label htmlFor="r-private">Private</Label>
                  </div>
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="fees-asc">Fees (Low to High)</SelectItem>
              <SelectItem value="fees-desc">Fees (High to Low)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredAndSortedColleges.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedColleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-md border border-dashed py-24 text-center">
            <h3 className="text-xl font-semibold">No colleges found</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filters.
            </p>
        </div>
      )}
    </div>
  );
}
