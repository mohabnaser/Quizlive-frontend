import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-primary-500/10 text-primary-400 border border-primary-500/20',
                success: 'bg-green-500/10 text-green-400 border border-green-500/20',
                warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
                danger: 'bg-red-500/10 text-red-400 border border-red-500/20',
                outline: 'border border-dark-border text-dark-muted',
            },
        },
        defaultVariants: { variant: 'default' },
    }
)

const Badge = forwardRef(({ className, variant, ...props }, ref) => {
    return <span className={cn(badgeVariants({ variant, className }))} ref={ref} {...props} />
})
Badge.displayName = 'Badge'

export { Badge, badgeVariants }
