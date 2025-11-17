import { kpis } from '@/data/mock';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Card } from './ui/Card';

export function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map((k) => {
        const up = k.delta >= 0;
        return (
          <Card key={k.key}>
            <div className="p-4">
              <div className="text-sm text-slate-400">{k.label}</div>
              <div className="mt-2 flex items-end justify-between">
                <div className="text-2xl font-semibold">{k.key === 'conversion' || k.key === 'churn' ? `${k.value}%` : k.value.toLocaleString()}</div>
                <div className={`flex items-center gap-1 text-sm ${up ? 'text-green-400' : 'text-red-400'}`}>
                  {up ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {Math.abs(k.delta)}%
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
