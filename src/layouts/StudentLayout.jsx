import { Outlet } from 'react-router-dom'
import { StudentSidebar } from '@/components/layout/StudentSidebar'

export function StudentLayout() {
    return (
        <div className="min-h-screen flex" style={{ background: '#0D0D1A' }}>
            <StudentSidebar />
            <main className="flex-1 overflow-auto" style={{ marginLeft: '240px' }}>
                <Outlet />
            </main>
        </div>
    )
}
