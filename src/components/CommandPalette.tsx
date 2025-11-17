import { useEffect, useMemo, useState } from 'react';
import { Command, Filter, LayoutDashboard, Bell, FlaskConical, Settings2 } from 'lucide-react';

const actions = [
  { id: 'nav_overview', label: 'Go to Overview', icon: LayoutDashboard },
  { id: 'nav_cohorts', label: 'Go to Cohorts', icon: Filter },
  { id: 'nav_experiments', label: 'Go to Experiments', icon: FlaskConical },
  { id: 'nav_alerts', label: 'Open Alerts', icon: Bell },
  { id: 'nav_settings', label: 'Open Settings', icon: Settings2 },
  { id: 'filter_region_na', label: 'Filter: Region → NA', icon: Filter },
  { id: 'filter_platform_ios', label: 'Filter: Platform → iOS', icon: Filter },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('open-command-palette' as any, onOpen);
    return () => window.removeEventListener('open-command-palette' as any, onOpen);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      if ((isMac && e.metaKey && e.key === 'k') || (!isMac && e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filtered = useMemo(() => actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase())), [q]);

  function run(id: string) {
    // Dispatch events to integrate with app state
    if (id.startsWith('filter_')) {
      const [, key, value] = id.split('_');
      window.dispatchEvent(new CustomEvent('apply-filter', { detail: { key, value } }));
    }
    setOpen(false);
  }

  if (!open) return null;
  return (
    <div role="dialog" aria-modal className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl rounded-2xl bg-slate-900/90 text-offwhite border border-white/10 shadow-xl">
        <div className="flex items-center px-4 py-3 border-b border-white/10">
          <Command className="h-4 w-4 text-slate-400" />
          <input
            autoFocus
            aria-label="Command search"
            placeholder="Type a command or search…"
            className="bg-transparent flex-1 px-3 outline-none placeholder:text-slate-500"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <kbd className="text-xs text-slate-400">Esc</kbd>
        </div>
        <ul className="max-h-80 overflow-auto py-2">
          {filtered.map((a) => (
            <li key={a.id}>
              <button onClick={() => run(a.id)} className="w-full text-left px-4 py-2 flex items-center gap-3 hover:bg-white/5 focus:bg-white/10">
                <a.icon className="h-4 w-4 text-electric-500" />
                <span>{a.label}</span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-6 text-sm text-slate-400">No results</li>
          )}
        </ul>
      </div>
    </div>
  );
}
