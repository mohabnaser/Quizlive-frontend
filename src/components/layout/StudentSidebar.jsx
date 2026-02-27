import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Zap, LayoutDashboard, Hash, Trophy, Star,
    User, Settings, Bell, LogOut, CreditCard,
    ChevronRight, BookOpen, Sword, GraduationCap, Award
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/student' },
    { icon: Hash, label: 'Join Quiz', to: '/student/join', badge: 'HOT' },
    { icon: BookOpen, label: 'My History', to: '/student/history' },
    { icon: Trophy, label: 'Leaderboard', to: '/student/leaderboard' },
    { icon: Award, label: 'Achievements', to: '/student/achievements' },
    { icon: Sword, label: 'Challenges', to: '/student/challenges', badge: 'NEW' },
    { icon: Bell, label: 'Notifications', to: '/student/notifications' },
]

const bottomNavItems = [
    { icon: User, label: 'Profile', to: '/student/profile' },
    { icon: Settings, label: 'Settings', to: '/student/settings' },
]

function NavItem({ icon: Icon, label, to, badge }) {
    return (
        <NavLink
            to={to}
            end={to === '/student'}
            className={({ isActive }) =>
                cn(
                    'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer select-none',
                    isActive
                        ? 'text-white bg-[rgba(124,58,237,0.15)] shadow-[inset_3px_0_12px_rgba(124,58,237,0.2)]'
                        : 'text-[#64748B] hover:text-[#C4B5FD] hover:bg-[rgba(124,58,237,0.08)]'
                )
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[#7C3AED]" />
                    )}
                    <Icon
                        size={18}
                        className={cn(
                            'shrink-0 transition-colors duration-150',
                            isActive ? 'text-[#A78BFA]' : 'group-hover:text-[#A78BFA]'
                        )}
                    />
                    <span className="flex-1">{label}</span>
                    {badge && (
                        <span className={cn(
                            'text-[8px] font-bold tracking-wider rounded-full px-1.5 py-0.5',
                            badge === 'HOT'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        )}>
                            {badge}
                        </span>
                    )}
                </>
            )}
        </NavLink>
    )
}

export function StudentSidebar() {
    const [popoverOpen, setPopoverOpen] = useState(false)
    const popoverRef = useRef(null)
    const navigate = useNavigate()

    useEffect(() => {
        function handleClickOutside(e) {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setPopoverOpen(false)
            }
        }
        if (popoverOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [popoverOpen])

    return (
        <aside
            className="fixed left-0 top-0 z-40 flex h-screen w-[240px] flex-col border-r bg-[#13131F]"
            style={{ borderColor: '#2A2A3D' }}
        >
            <div className="flex items-center gap-3 px-5 py-5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] shadow-lg shadow-purple-900/30">
                    <Zap size={17} className="text-white" />
                </div>
                <span
                    className="text-[17px] font-bold text-white tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    QuizLive
                </span>
            </div>
            <div className="mx-4 h-px bg-gradient-to-r from-[#7C3AED]/60 via-transparent to-transparent mb-2" />
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
                {navItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}
                <div className="pt-4 pb-2 px-1">
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-[#475569] uppercase">
                        Account
                    </p>
                </div>
                {bottomNavItems.map((item) => (
                    <NavItem key={item.to} {...item} />
                ))}
            </nav>
            <div className="border-t border-[#2A2A3D]/60 p-3 relative">
                <button
                    onClick={() => setPopoverOpen((v) => !v)}
                    className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-200 hover:bg-[rgba(124,58,237,0.08)] cursor-pointer"
                >
                    <div className="relative shrink-0">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center ring-2 ring-[#8B5CF6]/70 ring-offset-2 ring-offset-[#13131F]">
                            <GraduationCap size={17} className="text-white" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#13131F]" />
                    </div>

                    <div className="flex-1 min-w-0 text-left">
                        <p className="text-[13px] font-semibold text-white truncate">Sara Student</p>
                        <p className="text-[11px] text-[#64748B] truncate">sara@uni.edu</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                        <span className="text-[9px] font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full px-1.5 py-0.5 tracking-wider">
                            FREE
                        </span>
                        <Settings
                            size={14}
                            className="text-[#475569] group-hover:text-[#7C3AED] transition-all duration-300 group-hover:rotate-45"
                        />
                    </div>
                </button>

                {popoverOpen && (
                    <div
                        ref={popoverRef}
                        className="absolute bottom-full left-3 right-3 mb-2 rounded-xl border border-[#2A2A3D] bg-[#1A1A2E] shadow-xl shadow-black/40 overflow-hidden z-50"
                        style={{ animation: 'fadeSlideUp 0.2s ease-out forwards' }}
                    >
                        {[
                            { icon: User, label: 'View Profile', to: '/student/profile' },
                            { icon: CreditCard, label: 'Upgrade Plan', to: '/student/settings' },
                        ].map(({ icon: Icon, label, to }) => (
                            <button
                                key={label}
                                onClick={() => { setPopoverOpen(false); navigate(to) }}
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#94A3B8] hover:text-white hover:bg-[rgba(124,58,237,0.08)] transition-all duration-150 cursor-pointer"
                            >
                                <Icon size={15} />
                                {label}
                                <ChevronRight size={13} className="ml-auto opacity-40" />
                            </button>
                        ))}
                        <div className="h-px bg-[#2A2A3D] mx-3" />
                        <button
                            onClick={() => { setPopoverOpen(false); navigate('/login') }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
                        >
                            <LogOut size={15} />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </aside>
    )
}
