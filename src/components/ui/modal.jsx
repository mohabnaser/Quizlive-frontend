import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Modal({ open, onClose, children, className, title }) {
    const overlayRef = useRef(null)

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [open])

    useEffect(() => {
        const handleEscape = (e) => { if (e.key === 'Escape') onClose() }
        if (open) document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onClose])

    if (!open) return null

    return (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === overlayRef.current) onClose() }}>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
            <div className={cn('relative z-10 w-full max-w-lg rounded-2xl card-dark p-6 animate-fade-in', className)}>
                <div className="flex items-center justify-between mb-4">
                    {title && <h2 className="text-lg font-semibold text-dark-text">{title}</h2>}
                    <button onClick={onClose} className="ml-auto p-1 rounded-lg text-dark-muted hover:text-dark-text hover:bg-dark-card-hover transition-colors cursor-pointer">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
