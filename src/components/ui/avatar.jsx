import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const avatarVariants = cva('relative inline-flex shrink-0 overflow-hidden rounded-full', {
    variants: {
        size: { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-12 w-12', xl: 'h-16 w-16' },
    },
    defaultVariants: { size: 'md' },
})

const Avatar = forwardRef(({ className, size, fallback, src, alt, ...props }, ref) => {
    if (!src && fallback) {
        return (
            <div className={cn(avatarVariants({ size, className }), 'bg-primary-500/20 flex items-center justify-center')}>
                <span className="text-primary-400 font-semibold text-sm">{fallback}</span>
            </div>
        )
    }
    return <img className={cn(avatarVariants({ size, className }), 'object-cover')} ref={ref} src={src} alt={alt} {...props} />
})
Avatar.displayName = 'Avatar'

export { Avatar, avatarVariants }
