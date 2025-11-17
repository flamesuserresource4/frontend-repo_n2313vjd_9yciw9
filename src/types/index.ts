export type TimeRange = '7d' | '30d' | '90d' | 'custom';

export type MetricKey = 'dau' | 'mau' | 'conversion' | 'churn';

export type MetricPoint = {
  date: string; // ISO date
  values: Record<MetricKey, number>;
};

export type SegmentKey = 'region' | 'platform' | 'plan';

export type FilterOption = {
  key: SegmentKey;
  label: string;
  options: string[];
};

export type FiltersState = Record<SegmentKey, string[]>;

export type KPI = {
  key: MetricKey;
  label: string;
  value: number;
  delta: number; // percentage change
};
