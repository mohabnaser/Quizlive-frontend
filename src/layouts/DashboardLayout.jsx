import { Outlet } from 'react-router-dom'

export function DashboardLayout() {
    return (
        <div className="min-h-screen flex bg-dark-bg">
            <aside className="hidden lg:flex w-64 flex-col border-r border-dark-border bg-dark-card p-4">
                <div className="text-lg font-bold text-white mb-8">Dashboard</div>
                <nav className="flex flex-col gap-1">
                    <span className="text-sm text-dark-muted px-3 py-2">Navigation coming soon</span>
                </nav>
            </aside>
            <main className="flex-1 overflow-auto">
                <div className="p-6"><Outlet /></div>
            </main>
        </div>
    )
}
