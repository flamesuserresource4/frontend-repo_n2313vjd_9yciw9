import { Card, CardHeader, CardBody } from './ui/Card';
import { useEffect, useMemo, useState } from 'react';
import type { FiltersState, MetricKey, TimeRange } from '@/types';
import { timeSeries, getSegmentSeries } from '@/data/mock';
import { motion } from 'framer-motion';

// Simple SVG line chart + area chart without extra deps
function LineChart({ keys, data }: { keys: MetricKey[]; data: { date: string; values: Record<MetricKey, number> }[] }) {
  const width = 700;
  const height = 240;
  const padding = 32;

  const flat = data.flatMap((d) => keys.map((k) => d.values[k]));
  const max = Math.max(...flat);
  const min = Math.min(...flat);

  function x(i: number) { return padding + (i / Math.max(1, data.length - 1)) * (width - padding * 2); }
  function y(v: number) {
    const range = max - min || 1;
    const t = (v - min) / range;
    return height - padding - t * (height - padding * 2);
  }

  function pathFor(key: MetricKey) {
    return data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(d.values[key])}`).join(' ');
  }

  const colors: Record<MetricKey, string> = {
    dau: '#60A5FA',
    mau: '#A78BFA',
    conversion: '#34D399',
    churn: '#F87171',
  };

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      {/* gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={padding} x2={width - padding} y1={padding + t * (height - padding * 2)} y2={padding + t * (height - padding * 2)} stroke="rgba(255,255,255,0.08)" />
      ))}
      {keys.map((k) => (
        <g key={k}>
          <path d={pathFor(k)} fill="none" stroke={colors[k]} strokeWidth={2} />
        </g>
      ))}
    </svg>
  );
}

function StackedBars({ labels, series }: { labels: string[]; series: { name: string; values: number[] }[] }) {
  const width = 700;
  const height = 240;
  const padding = 32;
  const barWidth = (width - padding * 2) / labels.length - 8;
  const sums = labels.map((_, i) => series.reduce((acc, s) => acc + s.values[i], 0));
  const max = Math.max(...sums, 1);

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}> 
      {labels.map((_, i) => {
        let y = height - padding;
        return (
          <g key={i}>
            {series.map((s, idx) => {
              const h = (s.values[i] / max) * (height - padding * 2);
              y -= h;
              const color = `hsl(${(idx * 60) % 360} 80% 60% / 0.9)`;
              return <rect key={s.name} x={padding + i * (barWidth + 8)} y={y} width={barWidth} height={h} rx={6} fill={color} />;
            })}
          </g>
        );
      })}
    </svg>
  );
}

export function ChartPanel() {
  const [range, setRange] = useState<TimeRange>('30d');
  const [filters, setFilters] = useState<FiltersState>({ region: [], platform: [], plan: [] });
  const [segmentKey, setSegmentKey] = useState<'region' | 'platform' | 'plan'>('region');

  useEffect(() => {
    const handler = (e: any) => {
      const { key, value } = e.detail || {};
      if (key && value) {
        setFilters((f) => ({ ...f, [key]: f[key as keyof FiltersState].includes(value) ? f[key as keyof FiltersState].filter((v: string) => v !== value) : [...f[key as keyof FiltersState], value] }));
      }
    };
    window.addEventListener('apply-filter' as any, handler);
    return () => window.removeEventListener('apply-filter' as any, handler);
  }, []);

  const filteredSeries = useMemo(() => {
    // In a real app, filters affect query; here we just slice the data subtly
    const len = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return timeSeries.slice(-len);
  }, [range, filters]);

  const segmentSeries = useMemo(() => {
    const len = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    const base = getSegmentSeries(segmentKey);
    return base.map((s) => ({ ...s, values: s.values.slice(-len) }));
  }, [range, segmentKey, filters]);

  const labels = filteredSeries.map((d) => d.date.slice(5));

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {(['7d', '30d', '90d'] as TimeRange[]).map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`px-3 py-1.5 rounded-lg border text-sm ${range === r ? 'bg-electric-600/20 border-electric-600 text-electric-500' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>{r}</button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {(['region', 'platform', 'plan'] as const).map((k) => (
            <button key={k} onClick={() => setSegmentKey(k)} className={`px-3 py-1.5 rounded-lg border text-sm ${segmentKey === k ? 'bg-electric-600/20 border-electric-600 text-electric-500' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}>{k}</button>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader title="Product Metrics" subtitle="Line chart" />
        <CardBody>
          <motion.div layout>
            <LineChart keys={['dau', 'mau', 'conversion']} data={filteredSeries} />
          </motion.div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader title="Segments" subtitle="Stacked" />
        <CardBody>
          <motion.div layout>
            <StackedBars labels={labels} series={segmentSeries} />
          </motion.div>
        </CardBody>
      </Card>
    </div>
  );
}
