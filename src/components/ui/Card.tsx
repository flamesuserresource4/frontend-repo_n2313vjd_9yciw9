import { ReactNode } from 'react';
import { motion } from 'framer-motion';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(2,6,23,0.25)' }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl bg-white/70 dark:bg-white/10 backdrop-blur-sm border border-white/20 dark:border-white/10 shadow-glass ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/20">
      <div>
        <h3 className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</h3>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-offwhite">{title}</h2>
      </div>
      {actions}
    </div>
  );
}

export function CardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}
