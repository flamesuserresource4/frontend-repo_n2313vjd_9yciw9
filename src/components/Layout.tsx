import { ReactNode, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

export function Layout({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700 dark:text-offwhite">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <TopBar onToggleTheme={() => setDark((d) => !d)} />
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}
