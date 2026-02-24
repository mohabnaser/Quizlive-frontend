import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/theme/theme-provider'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }) {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={cn(
                'relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border bg-dark-card text-dark-muted transition-colors hover:text-dark-text hover:border-primary-500/30 cursor-pointer',
                className
            )}
            aria-label="Toggle theme"
        >
            {resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    )
}
