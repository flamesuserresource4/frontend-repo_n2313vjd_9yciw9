import { Home, Users, FlaskConical, Bell, Settings } from 'lucide-react';
import { useState } from 'react';

const items = [
  { name: 'Overview', icon: Home },
  { name: 'Cohorts', icon: Users },
  { name: 'Experiments', icon: FlaskConical },
  { name: 'Alerts', icon: Bell },
  { name: 'Settings', icon: Settings },
];

export function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside className={`sticky top-0 h-screen shrink-0 transition-all duration-200 ${open ? 'w-64' : 'w-20'} p-4`}> 
      <div className="h-full rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs shadow-glass flex flex-col">
        <button
          aria-label="Toggle sidebar"
          onClick={() => setOpen((o) => !o)}
          className="self-end m-2 px-2 py-1 text-xs rounded-md bg-white/10 hover:bg-white/20"
        >
          {open ? '«' : '»'}
        </button>
        <div className="px-4 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-electric-600 to-electric-700" />
            {open && <div>
              <div className="text-sm text-slate-300">AI Analytics</div>
              <div className="font-semibold">Command Center</div>
            </div>}
          </div>
        </div>
        <nav className="px-2 space-y-1">
          {items.map(({ name, icon: Icon }) => (
            <button key={name} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-electric-600">
              <Icon className="h-5 w-5" />
              {open && <span>{name}</span>}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-3 text-xs text-slate-400">v1.0</div>
      </div>
    </aside>
  );
}
