import { Layout } from './components/Layout';
import { KPICards } from './components/KPICards';
import { ChartPanel } from './components/ChartPanel';
import { FilterBar } from './components/FilterBar';
import { CommandPalette } from './components/CommandPalette';
import { InsightsPanel } from './components/InsightsPanel';
import { Hero3D } from './components/Hero3D';

function App() {
  return (
    <Layout>
      <div className="space-y-6">
        <Hero3D />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <KPICards />
            <FilterBar onChange={() => {}} />
            <ChartPanel />
          </div>
          <div className="lg:col-span-1">
            <InsightsPanel />
          </div>
        </div>
      </div>
      <CommandPalette />
    </Layout>
  );
}

export default App;
