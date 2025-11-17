import type { KPI, MetricPoint, SegmentKey } from '@/types';

export const kpis: KPI[] = [
  { key: 'dau', label: 'DAU', value: 12450, delta: 3.2 },
  { key: 'mau', label: 'MAU', value: 98210, delta: 1.1 },
  { key: 'conversion', label: 'Conversion', value: 4.6, delta: -0.4 },
  { key: 'churn', label: 'Churn', value: 1.8, delta: 0.2 },
];

// Generate 90 days of mock data
const days = 90;
const today = new Date();

function rnd(base: number, variance = 0.1) {
  return base * (1 + (Math.random() - 0.5) * 2 * variance);
}

export const timeSeries: MetricPoint[] = Array.from({ length: days }, (_, i) => {
  const d = new Date(today);
  d.setDate(today.getDate() - (days - i));
  return {
    date: d.toISOString().slice(0, 10),
    values: {
      dau: Math.round(rnd(12000, 0.08)),
      mau: Math.round(rnd(98000, 0.05)),
      conversion: parseFloat(rnd(4.5, 0.15).toFixed(2)),
      churn: parseFloat(rnd(2.0, 0.2).toFixed(2)),
    },
  };
});

export const segments: Record<SegmentKey, string[]> = {
  region: ['NA', 'EU', 'APAC', 'LATAM'],
  platform: ['Web', 'iOS', 'Android'],
  plan: ['Free', 'Pro', 'Enterprise'],
};

export function getSegmentSeries(segmentKey: SegmentKey) {
  // Build simple stacks by segment with random data
  return segments[segmentKey].map((name) => ({
    name,
    values: Array.from({ length: days }, () => Math.round(rnd(1000, 0.4))),
  }));
}
