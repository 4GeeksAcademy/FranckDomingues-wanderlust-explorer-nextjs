"use client";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="min-w-0 flex-1">
      <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="experience-search">Search by experience title</label>
      <input
        autoComplete="off"
        className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15"
        id="experience-search"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Try “coastal”, “market”, or a regex…"
        type="search"
        value={value}
      />
      <p className="mt-1.5 text-xs text-stone-500">Search matches experience titles and supports regular expressions.</p>
    </div>
  );
}
