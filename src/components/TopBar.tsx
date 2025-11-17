import { Command, Search, Sun, Moon, User2 } from 'lucide-react';
import { useEffect } from 'react';

export function TopBar({ onToggleTheme }: { onToggleTheme: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      if ((isMac && e.metaKey && e.key === 'k') || (!isMac && e.ctrlKey && e.key === 'k')) {
        e.preventDefault();
        const evt = new CustomEvent('open-command-palette');
        window.dispatchEvent(evt);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-10 backdrop-blur-xs bg-white/10 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-3">
        <div className="flex-1">
          <div className="group relative">
            <input
              aria-label="Global search"
              placeholder="Search or jump to… (⌘K)"
              className="w-full h-10 rounded-xl bg-white/70 dark:bg-white/10 border border-white/20 pl-10 pr-10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-electric-600"
              onFocus={() => {
                const evt = new CustomEvent('open-command-palette');
                window.dispatchEvent(evt);
              }}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Command className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>
        <button aria-label="Toggle theme" onClick={onToggleTheme} className="h-10 w-10 grid place-items-center rounded-xl bg-white/10 hover:bg-white/20">
          <Sun className="h-5 w-5 hidden dark:block" />
          <Moon className="h-5 w-5 dark:hidden" />
        </button>
        <button aria-label="Profile" className="h-10 w-10 grid place-items-center rounded-full bg-gradient-to-br from-electric-600 to-electric-700">
          <User2 className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
