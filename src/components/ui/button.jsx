import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-gradient-primary text-white hover:opacity-90 shadow-lg shadow-primary-500/25',
                secondary: 'bg-dark-card border border-dark-border text-dark-text hover:bg-dark-card-hover',
                outline: 'border border-dark-border text-dark-text hover:bg-dark-card hover:border-primary-500/50',
                ghost: 'text-dark-text hover:bg-dark-card',
                link: 'text-primary-400 underline-offset-4 hover:underline',
                cta: 'bg-gradient-cta text-white hover:opacity-90 shadow-xl shadow-primary-500/30',
            },
            size: {
                sm: 'h-9 px-4 text-sm',
                md: 'h-11 px-6 text-sm',
                lg: 'h-12 px-8 text-base',
                xl: 'h-14 px-10 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: { variant: 'primary', size: 'md' },
    }
)

const Button = forwardRef(({ className, variant, size, ...props }, ref) => {
    return (
        <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
