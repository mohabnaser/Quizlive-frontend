import { Link } from 'react-router-dom'
import { Zap, Twitter, Github, Linkedin } from 'lucide-react'
import { Container } from '@/components/ui/container'

const footerSections = [
    {
        title: 'Product',
        links: [
            { label: 'Features', href: '#features' },
            { label: 'Integrations', href: '#' },
            { label: 'Changelog', href: '#' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Documentation', href: '#' },
            { label: 'API Reference', href: '#' },
            { label: 'Community', href: '#' },
            { label: 'Help Center', href: '#' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Cookie Policy', href: '#' },
        ],
    },
]

const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
]

export function Footer() {
    return (
        <footer className="border-t border-dark-border bg-dark-bg pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                                <Zap className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-white">
                                Quiz<span className="text-primary-400">Live</span>
                            </span>
                        </Link>
                        <p className="text-sm text-dark-muted leading-relaxed max-w-xs mb-6">
                            The world's fastest-growing, interactive quiz platform for educators and enterprise learning.
                        </p>
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a key={social.label} href={social.href} aria-label={social.label}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-dark-border text-dark-muted hover:text-white hover:border-primary-500/30 transition-colors">
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-white mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="text-sm text-dark-muted hover:text-primary-400 transition-colors">
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="border-t border-dark-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-dark-muted">© 2025 Quizlive Inc. All Rights Reserved.</p>
                    <p className="text-xs text-dark-muted">Latest Operations</p>
                </div>
            </Container>
        </footer>
    )
}
