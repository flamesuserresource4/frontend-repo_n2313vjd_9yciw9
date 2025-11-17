import { useState } from 'react';
import type { FiltersState, SegmentKey } from '@/types';

const filterDefs: Record<SegmentKey, string[]> = {
  region: ['NA', 'EU', 'APAC', 'LATAM'],
  platform: ['Web', 'iOS', 'Android'],
  plan: ['Free', 'Pro', 'Enterprise'],
};

export function FilterBar({ onChange }: { onChange: (filters: FiltersState) => void }) {
  const [filters, setFilters] = useState<FiltersState>({ region: [], platform: [], plan: [] });

  function toggle(key: SegmentKey, value: string) {
    setFilters((prev) => {
      const next = { ...prev };
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      next[key] = Array.from(set);
      onChange(next);
      return next;
    });
  }

  return (
    <div className="flex flex-wrap gap-3">
      {(Object.keys(filterDefs) as SegmentKey[]).map((key) => (
        <div key={key} className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-slate-400 w-16">{key}</span>
          <div className="flex gap-2">
            {filterDefs[key].map((opt) => (
              <button
                key={opt}
                onClick={() => toggle(key, opt)}
                className={`px-3 py-1.5 rounded-full border text-sm transition ${filters[key].includes(opt) ? 'bg-electric-600/20 border-electric-600 text-electric-500' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
