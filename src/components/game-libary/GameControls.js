"use client";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function GameControls({ query, setQuery, category, setCategory, categories, playersFilter, setPlayersFilter, sortBy, setSortBy }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <div className="md:col-span-2">
        <Input placeholder="Search by title, description, or category…" value={query} onChange={(e) => setQuery(e.target.value)} 
        className='bg-background'
        />
      </div>

      
    </div>
  );
}
