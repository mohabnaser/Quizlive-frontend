import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { cn } from '@/lib/utils'

const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Resources', href: '#resources' },
]

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border/50 bg-dark-bg/80 backdrop-blur-xl">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                            <Zap className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">
                            Quiz<span className="text-primary-400">Live</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a key={link.label} href={link.href} className="text-sm text-dark-muted hover:text-white transition-colors">
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
                        <Link to="/signup"><Button variant="primary" size="sm">Sign Up</Button></Link>
                    </div>

                    <button className="md:hidden p-2 text-dark-muted hover:text-white transition-colors cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
                        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <div className={cn('md:hidden overflow-hidden transition-all duration-300', mobileOpen ? 'max-h-80 pb-4' : 'max-h-0')}>
                    <div className="flex flex-col gap-2 pt-2">
                        {navLinks.map((link) => (
                            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)}
                                className="px-3 py-2 rounded-lg text-sm text-dark-muted hover:text-white hover:bg-dark-card transition-colors">
                                {link.label}
                            </a>
                        ))}
                        <div className="flex gap-2 mt-2 px-3">
                            <Link to="/login" className="flex-1"><Button variant="ghost" size="sm" className="w-full">Login</Button></Link>
                            <Link to="/signup" className="flex-1"><Button variant="primary" size="sm" className="w-full">Sign Up</Button></Link>
                        </div>
                    </div>
                </div>
            </Container>
        </nav>
    )
}
