import { cn } from '@/lib/utils'

const sizeMap = { sm: 'max-w-3xl', md: 'max-w-5xl', lg: 'max-w-6xl', xl: 'max-w-7xl' }

export function Container({ children, size = 'xl', className, ...props }) {
    return (
        <div className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeMap[size], className)} {...props}>
            {children}
        </div>
    )
}
