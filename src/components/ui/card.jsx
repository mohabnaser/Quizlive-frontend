import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('rounded-2xl transition-all duration-300', {
    variants: {
        variant: {
            default: 'card-dark',
            elevated: 'card-dark shadow-xl shadow-black/20',
            outline: 'border border-dark-border bg-transparent',
            glass: 'bg-white/5 backdrop-blur-xl border border-white/10',
            solid: 'bg-dark-card border border-dark-border',
        },
        padding: { none: '', sm: 'p-4', md: 'p-6', lg: 'p-8' },
        hover: {
            true: 'hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 hover:-translate-y-1',
            false: '',
        },
    },
    defaultVariants: { variant: 'default', padding: 'md', hover: false },
})

const Card = forwardRef(({ className, variant, padding, hover, ...props }, ref) => {
    return <div className={cn(cardVariants({ variant, padding, hover, className }))} ref={ref} {...props} />
})
Card.displayName = 'Card'

export { Card, cardVariants }
