import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { uiText } from '@/content/common';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/cn';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? uiText.theme.toLight : uiText.theme.toDark}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-header-fg/20 text-header-fg transition-colors hover:border-accent hover:text-accent',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ rotate: -45, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 45, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Sun aria-hidden="true" className="h-5 w-5" />
          ) : (
            <Moon aria-hidden="true" className="h-5 w-5" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
