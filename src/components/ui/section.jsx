import { cn } from '@/lib/utils'

export function Section({ children, background = 'default', className, ...props }) {
    return (
        <section
            className={cn(
                'py-16 sm:py-20 lg:py-24',
                background === 'alt' && 'bg-dark-card/50',
                background === 'gradient' && 'bg-gradient-cta',
                className
            )}
            {...props}
        >
            {children}
        </section>
    )
}
