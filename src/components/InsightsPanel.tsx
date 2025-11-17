import { Card, CardBody, CardHeader } from './ui/Card';

const tips = [
  'Spike in DAU on Tuesdays correlates with push campaigns.',
  'Churn slightly up in LATAM; consider localized onboarding.',
  'Conversion higher on iOS for Pro plan—test new pricing on Android.',
  'Experiment #42 shows +3% uplift; scale variant B to 25% traffic.',
];

export function InsightsPanel() {
  return (
    <Card className="h-full">
      <CardHeader title="Insights from AI" subtitle="Generated" />
      <CardBody>
        <ul className="space-y-3 text-sm text-slate-200">
          {tips.map((t, i) => (
            <li key={i} className="p-3 rounded-lg bg-white/5 border border-white/10">{t}</li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
