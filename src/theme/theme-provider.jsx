import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(undefined)

function getSystemTheme() {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children, defaultTheme = 'dark' }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return defaultTheme
        return localStorage.getItem('quizlive-theme') || defaultTheme
    })

    const resolvedTheme = theme === 'system' ? getSystemTheme() : theme

    useEffect(() => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(resolvedTheme)
        localStorage.setItem('quizlive-theme', theme)
    }, [theme, resolvedTheme])

    useEffect(() => {
        if (theme !== 'system') return
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
            const root = window.document.documentElement
            root.classList.remove('light', 'dark')
            root.classList.add(getSystemTheme())
        }
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within a ThemeProvider')
    return context
}
