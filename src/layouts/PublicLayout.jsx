import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/navigation/navbar'
import { Footer } from '@/components/navigation/footer'

export function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-dark-bg">
            <Navbar />
            <main className="flex-1 pt-16"><Outlet /></main>
            <Footer />
        </div>
    )
}
