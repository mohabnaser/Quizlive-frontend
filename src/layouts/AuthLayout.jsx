import { Outlet } from 'react-router-dom'

export function AuthLayout() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-dark-bg overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-primary-600/8 blur-[160px]" />
                <div className="absolute top-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-accent-500/5 blur-[120px]" />
                <div className="absolute bottom-1/4 left-1/4 h-[250px] w-[250px] rounded-full bg-primary-700/5 blur-[100px]" />
            </div>
            <div className="relative z-10 w-full">
                <Outlet />
            </div>
        </div>
    )
}
