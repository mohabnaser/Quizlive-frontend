import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Hash, ArrowRight, Zap, Target, Trophy,
    Flame, Star, Clock, CheckCircle2, Circle,
    TrendingUp, TrendingDown, Play, BookOpen,
    Award, Sword, ChevronRight, Users, Crown,
    Medal, Sparkles, X
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────── Mock Data ─────── */

const mockRecentActivity = [
    {
        id: 'a1', type: 'quiz', title: 'Introduction to Physics',
        score: 920, total: 1000, accuracy: 92, time: '2 hours ago',
        subject: 'Science', grade: 'A+', xpEarned: 180, emoji: '⚗️',
        gradient: 'from-teal-500/25 to-cyan-600/15',
    },
    {
        id: 'a2', type: 'quiz', title: 'World War II — Key Events',
        score: 750, total: 1000, accuracy: 75, time: '1 day ago',
        subject: 'History', grade: 'B+', xpEarned: 120, emoji: '🏛️',
        gradient: 'from-amber-500/25 to-orange-600/15',
    },
    {
        id: 'a3', type: 'quiz', title: 'Algebra Fundamentals',
        score: 860, total: 1000, accuracy: 86, time: '2 days ago',
        subject: 'Math', grade: 'A', xpEarned: 150, emoji: '📐',
        gradient: 'from-blue-500/25 to-indigo-600/15',
    },
    {
        id: 'a4', type: 'quiz', title: 'Ancient Greek Mythology',
        score: 680, total: 1000, accuracy: 68, time: '4 days ago',
        subject: 'Literature', grade: 'B', xpEarned: 90, emoji: '⚡',
        gradient: 'from-purple-500/25 to-violet-600/15',
    },
    {
        id: 'a5', type: 'quiz', title: 'Cell Biology Deep Dive',
        score: 940, total: 1000, accuracy: 94, time: '1 week ago',
        subject: 'Biology', grade: 'A+', xpEarned: 200, emoji: '🔬',
        gradient: 'from-green-500/25 to-emerald-600/15',
    },
    {
        id: 'a6', type: 'quiz', title: 'JavaScript Basics',
        score: 800, total: 1000, accuracy: 80, time: '1 week ago',
        subject: 'Tech', grade: 'A-', xpEarned: 130, emoji: '💻',
        gradient: 'from-yellow-400/25 to-amber-500/15',
    },
]

const mockUpcomingSessions = [
    {
        id: 's1', title: 'Chemistry Midterm Review',
        teacher: 'Mr. Anderson', time: 'Today at 3:00 PM',
        code: 'CHEM-101', subject: 'Chemistry', urgent: true,
    },
    {
        id: 's2', title: 'History Quiz — WW2',
        teacher: 'Ms. Roberts', time: 'Tomorrow at 2:00 PM',
        code: 'HIS-202', subject: 'History', urgent: false,
    },
    {
        id: 's3', title: 'Math Problem Set',
        teacher: 'Dr. Kim', time: 'Friday at 11:00 AM',
        code: 'MTH-305', subject: 'Math', urgent: false,
    },
]

const mockLeaderboard = [
    { rank: 1, name: 'Alex M.', xp: 8420, avatar: '🧠', country: '🇺🇸', isMe: false },
    { rank: 2, name: 'Priya K.', xp: 7950, avatar: '⚡', country: '🇮🇳', isMe: false },
    { rank: 3, name: 'Leon S.', xp: 7310, avatar: '🎯', country: '🇩🇪', isMe: false },
    { rank: 24, name: 'Sara (You)', xp: 3840, avatar: '🌟', country: '🇪🇬', isMe: true },
]

const mockBadges = [
    { id: 'b1', emoji: '🔥', label: 'On Fire', desc: '5-day streak', color: 'from-orange-500/30 to-red-500/20', earned: true },
    { id: 'b2', emoji: '🎯', label: 'Sharpshooter', desc: '95%+ accuracy', color: 'from-blue-500/30 to-indigo-500/20', earned: true },
    { id: 'b3', emoji: '⚡', label: 'Speed Demon', desc: 'Fastest answer', color: 'from-yellow-500/30 to-amber-500/20', earned: true },
    { id: 'b4', emoji: '💪', label: 'Comeback Kid', desc: 'Won after trailing', color: 'from-green-500/30 to-emerald-500/20', earned: true },
    { id: 'b5', emoji: '🧠', label: 'Brainiac', desc: '10 perfect scores', color: 'from-purple-500/30 to-violet-500/20', earned: false },
    { id: 'b6', emoji: '👑', label: 'Quiz King', desc: '#1 on leaderboard', color: 'from-amber-500/30 to-yellow-500/20', earned: false },
    { id: 'b7', emoji: '📚', label: 'Scholar', desc: '50 quizzes played', color: 'from-pink-500/30 to-rose-500/20', earned: false },
    { id: 'b8', emoji: '🌍', label: 'Globetrotter', desc: 'Top 10 globally', color: 'from-teal-500/30 to-cyan-500/20', earned: false },
]

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const xpTasks = [
    { label: 'Join a session', done: true },
    { label: 'Score 80%+', done: true },
    { label: 'Perfect streak', done: false },
    { label: 'Challenge a friend', done: false },
    { label: 'Daily login', done: true },
]

const recentCodes = ['BIO-2024', 'CS-101', 'CHEM-101']

function useCountUp(target, duration = 700, delay = 0) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        const t = setTimeout(() => {
            let start = 0
            const step = target / (duration / 16)
            const timer = setInterval(() => {
                start += step
                if (start >= target) { setValue(target); clearInterval(timer) }
                else setValue(Math.floor(start))
            }, 16)
            return () => clearInterval(timer)
        }, delay)
        return () => clearTimeout(t)
    }, [target, duration, delay])
    return value
}


function getGreeting() {
    const h = new Date().getHours()
    if (h < 12) return { text: 'Good morning', icon: '☀️' }
    if (h < 18) return { text: 'Good afternoon', icon: '🌤️' }
    return { text: 'Good evening', icon: '🌙' }
}


function BackgroundParticles() {
    return (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: `${100 + i * 70}px`,
                        height: `${100 + i * 70}px`,
                        left: `${8 + i * 16}%`,
                        top: `${8 + i * 11}%`,
                        background: i % 2 === 0
                            ? 'radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)'
                            : 'radial-gradient(circle, rgba(236,72,153,0.05) 0%, transparent 70%)',
                        animation: `float ${9 + i * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 1.1}s`,
                        filter: 'blur(30px)',
                    }}
                />
            ))}
        </div>
    )
}


function WelcomeRow({ joinCode, setJoinCode, joinExpanded, setJoinExpanded }) {
    const greeting = getGreeting()
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8"
            style={{ animation: 'fadeSlideUp 0.5s ease-out 0.1s both' }}
        >
            <div>
                <h1
                    className="text-2xl sm:text-3xl font-black text-white mb-1 tracking-tight"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                >
                    {greeting.text}, Sara! {greeting.icon}
                </h1>
                <p className="text-[13px] text-[#475569] leading-relaxed">
                    You're on a <span className="font-bold text-orange-400">5-day streak</span> 🔥 ·{' '}
                    <span className="font-bold text-white">3 sessions</span> scheduled this week
                </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxWidth: joinExpanded ? '220px' : '0', opacity: joinExpanded ? 1 : 0 }}
                >
                    <input
                        type="text"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                        placeholder="Enter code..."
                        className="rounded-xl border border-[#2A2A3D] bg-[#1A1A2E] focus:border-[#7C3AED] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)] text-white text-sm px-4 py-2.5 outline-none w-full transition-all duration-300 block"
                    />
                </div>

                <button
                    onClick={() => setJoinExpanded(v => !v)}
                    className="flex items-center gap-2 rounded-xl border border-[#2A2A3D] hover:border-[#7C3AED]/40 hover:bg-[rgba(124,58,237,0.06)] px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 active:scale-95 cursor-pointer"
                >
                    <Hash size={15} className="text-[#8B5CF6]" />
                    Enter Code
                </button>

                <button className="relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white bg-[#7C3AED] hover:bg-[#8B5CF6] shadow-lg shadow-purple-900/30 transition-all duration-200 active:scale-95 cursor-pointer overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Play size={15} />
                    Join Live
                </button>
            </div>
        </div>
    )
}

function XPHeroCard() {
    const [xpAnimated, setXpAnimated] = useState(false)
    const xpCurrent = 3840
    const xpNext = 5000
    const xpPercent = (xpCurrent / xpNext) * 100  
    const streak = 5

    useEffect(() => {
        const t = setTimeout(() => setXpAnimated(true), 300)
        return () => clearTimeout(t)
    }, [])

    const today = new Date().getDay()
    const dayMap = [6, 0, 1, 2, 3, 4, 5]

    return (
        <div
            className="relative rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}
        >

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
                    opacity: 0.4,
                }}
            />

            <div
                className="absolute top-0 right-4 select-none pointer-events-none"
                style={{
                    fontSize: '140px', fontFamily: "'Syne', sans-serif",
                    fontWeight: 900, opacity: 0.04, color: '#fff', lineHeight: 1,
                }}
            >
                8
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 lg:p-7">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                            <div
                                className="absolute inset-0 rounded-2xl rotate-45"
                                style={{
                                    background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                                    boxShadow: '0 0 20px rgba(124,58,237,0.4)',
                                }}
                            />
                            <span
                                className="relative text-[20px] font-black text-white z-10"
                                style={{ fontFamily: "'Syne', sans-serif" }}
                            >8</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-[#8B5CF6] uppercase">
                                    Rising Star League
                                </p>
                                <span style={{ animation: 'pulse 3s ease-in-out infinite' }}>⭐</span>
                            </div>
                            <p className="text-[13px] text-[#94A3B8]">Student · Level 8</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[12px] font-medium text-[#475569]">Experience Points</p>
                            <p className="text-[12px] font-bold text-white">
                                {xpCurrent.toLocaleString()} / {xpNext.toLocaleString()} XP
                            </p>
                        </div>
                        <div className="relative h-2.5 w-full rounded-full bg-[#1A1A2E] overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000 ease-out"
                                style={{
                                    width: xpAnimated ? `${xpPercent}%` : '0%',
                                    background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                                }}
                            />
                            <div
                                className="absolute inset-y-0 left-0 rounded-full"
                                style={{
                                    width: `${xpPercent}%`,
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
                                    backgroundSize: '200% 100%',
                                    animation: 'shimmer-sweep 2.5s linear infinite',
                                }}
                            />
                        </div>
                        <p className="text-[11px] text-[#475569] mt-1.5">
                            🎯 You need <span className="font-bold text-white">1,160 XP</span> to reach Level 9
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold tracking-[0.1em] text-[#475569] uppercase mb-2.5">
                            Daily XP missions
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                            {xpTasks.map((task, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    {task.done
                                        ? <CheckCircle2 size={13} className="text-green-400 shrink-0" />
                                        : <Circle size={13} className="text-[#2A2A3D] shrink-0" />}
                                    <span className={cn('text-[11px]', task.done ? 'text-[#94A3B8] line-through opacity-60' : 'text-[#94A3B8]')}>
                                        {task.label}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] text-green-400 mt-2">✓ 3/5 missions done today · +70 XP earned</p>
                    </div>
                </div>

                <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-[#2A2A3D] to-transparent my-6" />

                <div
                    className="lg:w-56 p-6 flex flex-col items-center justify-center text-center"
                    style={{ background: 'linear-gradient(135deg, #4C1D95, #5B21B6)' }}
                >
                    <div
                        className="text-4xl mb-1 select-none"
                        style={{ animation: 'flame-pulse 1.5s ease-in-out infinite' }}
                    >
                        🔥
                    </div>

                    <p className="text-6xl font-black text-white leading-none mb-0.5"
                        style={{ fontFamily: "'Syne', sans-serif" }}>
                        {streak}
                    </p>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-purple-300 uppercase mb-4">Days</p>

                    <div className="flex gap-1.5 mb-3">
                        {weekDays.map((day, i) => {
                            const todayIdx = dayMap[today]
                            const isPast = i < todayIdx
                            const isToday = i === todayIdx
                            return (
                                <div key={i} className="flex flex-col items-center gap-1">
                                    <div
                                        className={cn(
                                            'h-5 w-5 rounded-full flex items-center justify-center',
                                            isPast ? 'bg-purple-400/70' :
                                                isToday ? 'bg-purple-300' : 'bg-white/10'
                                        )}
                                        style={isToday ? {
                                            animation: 'pulse 1.5s ease-in-out infinite',
                                            boxShadow: '0 0 10px rgba(196,181,253,0.5)',
                                        } : {}}
                                    >
                                        {(isPast || isToday) && <div className="h-2 w-2 rounded-full bg-white" />}
                                    </div>
                                    <span className="text-[9px] text-purple-300/70 font-medium">{day}</span>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-[11px] text-green-400 mb-4">✓ +1 Day added today</p>
                    <button className="w-full rounded-full bg-white/10 hover:bg-white/20 px-4 py-2 text-[12px] font-semibold text-white transition-all duration-200 cursor-pointer mb-2">
                        View Rewards
                    </button>
                    <p className="text-[10px] text-purple-300/60">Don't break your streak!</p>
                </div>
            </div>
        </div>
    )
}

function StatCard({ accentColor, icon: Icon, label, animTarget, value, trend, trendLabel, trendUp, extra, index }) {
    const animated = useCountUp(animTarget ?? 0, 700, 350 + index * 50)
    const displayValue = animTarget !== undefined ? animated : value

    return (
        <div
            className="relative flex flex-col rounded-2xl border border-[#2A2A3D] bg-[#13131F] p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group"
            style={{ animation: `fadeSlideUp 0.5s ease-out ${0.35 + index * 0.05}s both` }}
        >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: accentColor }} />
            <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity">
                <Icon size={20} style={{ color: accentColor }} />
            </div>

            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#475569] uppercase mb-3">{label}</p>
            <p className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                {label === 'Global Rank' && <span style={{ color: '#475569' }}>#</span>}
                {displayValue}
                {label === 'Avg. Accuracy' && <span className="text-2xl text-[#94A3B8]">%</span>}
            </p>

            {trend && (
                <div className="flex items-center gap-1.5 mt-auto">
                    {trendUp ? <TrendingUp size={12} className="text-green-400" /> : <TrendingDown size={12} className="text-red-400" />}
                    <span className={cn('text-[11px] font-semibold', trendUp ? 'text-green-400' : 'text-red-400')}>{trend}</span>
                    <span className="text-[11px] text-[#475569]">{trendLabel}</span>
                </div>
            )}
            {extra && <div className="mt-auto">{extra}</div>}
        </div>
    )
}

function JoinSessionCard({ code, setCode }) {
    const [focused, setFocused] = useState(false)

    return (
        <div
            className="relative rounded-2xl border border-[#2A2A3D] overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/20 group"
            style={{
                background: 'linear-gradient(135deg, #1A1A2E, #13131F)',
                animation: 'fadeSlideUp 0.5s ease-out 0.55s both',
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(124,58,237,0.08) 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                    animation: 'dot-drift 20s linear infinite',
                }}
            />
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.04) 50%, transparent 100%)' }}
            />

            <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="relative flex h-2.5 w-2.5">
                                <div className="absolute h-full w-full rounded-full bg-green-500 animate-ping opacity-60" />
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.18em] text-green-400 uppercase">Live Now</span>
                        </div>
                        <h3 className="text-[16px] font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Join a Live Session
                        </h3>
                        <p className="text-[12px] text-[#475569]">
                            Enter the game PIN shared by your teacher
                        </p>
                    </div>
                    <div className="text-3xl select-none">🎮</div>
                </div>

                <div
                    className={cn(
                        'flex items-center rounded-xl border transition-all duration-300 overflow-hidden bg-[#0D0D1A]',
                        focused ? 'border-[#7C3AED] shadow-[0_0_0_3px_rgba(124,58,237,0.12)]' : 'border-[#2A2A3D]'
                    )}
                >
                    <div className="flex items-center gap-2 flex-1 px-4">
                        <Hash size={15} className="text-[#475569] shrink-0" />
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            placeholder="Enter game code..."
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#475569] outline-none py-3.5"
                        />
                    </div>
                    <div className="h-8 w-px bg-[#2A2A3D] shrink-0" />
                    <button className="flex items-center gap-2 px-5 py-3.5 text-[13px] font-semibold text-white bg-[#7C3AED] hover:bg-[#8B5CF6] transition-colors duration-200 shrink-0 cursor-pointer">
                        Join Now <ArrowRight size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-[11px] text-[#475569]">Recent:</span>
                    {recentCodes.map((c) => (
                        <button
                            key={c}
                            onClick={() => setCode(c)}
                            className="text-[11px] font-mono font-semibold text-[#8B5CF6] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 border border-[#7C3AED]/20 rounded-lg px-2.5 py-1 transition-all duration-200 cursor-pointer"
                        >
                            {c}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function UpcomingSessions() {
    return (
        <div
            className="rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s ease-out 0.6s both' }}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A3D]">
                <h3 className="text-[15px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Upcoming Sessions
                </h3>
                <button className="group flex items-center gap-1 text-[12px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium cursor-pointer transition-colors">
                    View all
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="divide-y divide-[#2A2A3D]/60">
                {mockUpcomingSessions.map((session, i) => (
                    <div
                        key={session.id}
                        className="flex items-center gap-4 px-5 py-4 hover:bg-[#1A1A2E]/50 transition-colors duration-200 cursor-pointer group"
                        style={{ animation: `fadeSlideUp 0.4s ease-out ${0.65 + i * 0.07}s both` }}
                    >
                        <div className={cn(
                            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg',
                            session.urgent ? 'bg-red-500/15 border border-red-500/20' : 'bg-[#1A1A2E] border border-[#2A2A3D]'
                        )}>
                            {session.subject === 'Chemistry' ? '🧪' :
                                session.subject === 'History' ? '🏛️' : '📐'}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                                <p className="text-[13px] font-semibold text-white truncate">{session.title}</p>
                                {session.urgent && (
                                    <span className="shrink-0 text-[9px] font-bold bg-red-500/20 text-red-400 border border-red-500/20 rounded-full px-1.5 py-0.5 uppercase tracking-wide">
                                        Today
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-3 mt-0.5">
                                <span className="text-[11px] text-[#475569]">{session.teacher}</span>
                                <span className="h-1 w-1 rounded-full bg-[#2A2A3D]" />
                                <span className="text-[11px] text-[#475569]">{session.time}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] font-mono font-bold text-[#8B5CF6] bg-[#7C3AED]/10 border border-[#7C3AED]/20 rounded-lg px-2 py-1">
                                {session.code}
                            </span>
                            <button className="rounded-lg bg-[#7C3AED] hover:bg-[#8B5CF6] px-3 py-1.5 text-[11px] font-semibold text-white transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100">
                                Join
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

function ActivityCard({ activity, index }) {
    const getGradeColor = (grade) => {
        if (grade.startsWith('A')) return 'text-green-400 bg-green-500/10 border-green-500/20'
        if (grade.startsWith('B')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
        return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }

    const accuracyColor =
        activity.accuracy >= 90 ? '#10B981' :
            activity.accuracy >= 75 ? '#8B5CF6' :
                activity.accuracy >= 60 ? '#F59E0B' : '#EF4444'

    return (
        <div
            className="group relative flex flex-col rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/30 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-0.5"
            style={{ animation: `fadeSlideUp 0.5s ease-out ${0.05 * index}s both` }}
        >
            <div className={`relative h-28 bg-gradient-to-br ${activity.gradient} overflow-hidden flex items-center justify-center`}>
                <span className="text-5xl select-none opacity-30 group-hover:opacity-40 transition-opacity duration-300">
                    {activity.emoji}
                </span>

                <span className={cn(
                    'absolute top-3 left-3 rounded-full text-[11px] font-black px-2.5 py-1 border',
                    getGradeColor(activity.grade)
                )}>
                    {activity.grade}
                </span>

                <span className="absolute top-3 right-3 rounded-full bg-[#7C3AED]/80 text-white text-[10px] font-bold px-2 py-1 flex items-center gap-1">
                    <Zap size={9} />
                    +{activity.xpEarned} XP
                </span>

                <div className="absolute inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="flex items-center gap-1.5 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] px-4 py-2 text-[12px] font-semibold text-white shadow-lg cursor-pointer">
                        <Play size={13} />
                        Play Again
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-[13px] font-semibold text-white leading-snug mb-1.5 line-clamp-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}>
                    {activity.title}
                </h3>

                <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-[#475569]">Accuracy</span>
                        <span className="text-[11px] font-bold" style={{ color: accuracyColor }}>
                            {activity.accuracy}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#1A1A2E] overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{ width: `${activity.accuracy}%`, background: accuracyColor }}
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="rounded-lg bg-[#1A1A2E] border border-[#2A2A3D] text-[#94A3B8] text-[10px] font-medium px-2 py-1">
                        {activity.subject}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] text-[#475569]">
                        <Clock size={10} />
                        {activity.time}
                    </div>
                </div>
            </div>
        </div>
    )
}

function RecentActivitySection() {
    const [filter, setFilter] = useState('all')
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'A', label: 'A Grade' },
        { id: 'B', label: 'B Grade' },
    ]
    const filtered = filter === 'all'
        ? mockRecentActivity
        : mockRecentActivity.filter(a => a.grade.startsWith(filter))

    return (
        <div style={{ animation: 'fadeSlideUp 0.5s ease-out 0.7s both' }}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Recent Activity
                </h2>
                <button className="group flex items-center gap-1.5 text-[13px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium cursor-pointer transition-colors">
                    View All
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>
            </div>

            <div className="flex items-center gap-2 mb-5">
                {filters.map((f) => (
                    <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={cn(
                            'rounded-full px-3.5 py-1.5 text-[12px] font-medium transition-all duration-200 cursor-pointer',
                            filter === f.id
                                ? 'bg-[#7C3AED] text-white shadow-sm shadow-purple-900/30'
                                : 'text-[#475569] hover:text-white hover:bg-[#1A1A2E] border border-[#2A2A3D]'
                        )}
                    >
                        {f.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((activity, i) => (
                    <ActivityCard key={activity.id} activity={activity} index={i} />
                ))}
            </div>
        </div>
    )
}

function MiniLeaderboard() {
    const getRankBg = (rank) => {
        if (rank === 1) return 'from-amber-400/20 to-yellow-500/10 border-amber-500/30'
        if (rank === 2) return 'from-slate-400/15 to-slate-500/10 border-slate-400/25'
        if (rank === 3) return 'from-orange-600/15 to-amber-700/10 border-orange-600/25'
        return 'from-[#1A1A2E] to-[#1A1A2E] border-[#2A2A3D]'
    }

    const getRankIcon = (rank) => {
        if (rank === 1) return <Crown size={14} className="text-amber-400" />
        if (rank === 2) return <Medal size={14} className="text-slate-400" />
        if (rank === 3) return <Medal size={14} className="text-orange-600" />
        return <span className="text-[12px] font-bold text-[#475569]">#{rank}</span>
    }

    return (
        <div
            className="rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s ease-out 0.65s both' }}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A3D]">
                <h3 className="text-[15px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Global Leaderboard
                </h3>
                <button className="group flex items-center gap-1 text-[12px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium cursor-pointer transition-colors">
                    Full board
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="divide-y divide-[#2A2A3D]/60">
                {mockLeaderboard.map((user, i) => (
                    <div
                        key={user.rank}
                        className={cn(
                            'flex items-center gap-3 px-5 py-3.5 transition-colors duration-200',
                            user.isMe ? 'bg-[#7C3AED]/8 border-l-2 border-[#7C3AED]' : 'hover:bg-[#1A1A2E]/50'
                        )}
                        style={{ animation: `fadeSlideUp 0.4s ease-out ${0.7 + i * 0.06}s both` }}
                    >
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center">
                            {getRankIcon(user.rank)}
                        </div>

                        <div className={cn(
                            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-lg bg-gradient-to-br border',
                            getRankBg(user.rank)
                        )}>
                            {user.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={cn(
                                'text-[13px] font-semibold truncate',
                                user.isMe ? 'text-[#A78BFA]' : 'text-white'
                            )}>
                                {user.name}
                                {user.isMe && <span className="ml-2 text-[10px] font-normal text-[#8B5CF6]">(you)</span>}
                            </p>
                            <p className="text-[11px] text-[#475569]">{user.country} · {user.xp.toLocaleString()} XP</p>
                        </div>
                        {!user.isMe && (
                            <div className="w-16 flex-col items-end hidden sm:flex">
                                <div className="h-1 w-full rounded-full bg-[#1A1A2E] overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6]"
                                        style={{ width: `${(user.xp / 10000) * 100}%` }}
                                    />
                                </div>
                            </div>
                        )}
                        {user.isMe && (
                            <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#7C3AED]/15 border border-[#7C3AED]/25 rounded-full px-2 py-0.5">
                                You
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className="px-5 py-3 bg-[#1A1A2E]/60 border-t border-[#2A2A3D]">
                <p className="text-[11px] text-[#475569] text-center">
                    🚀 Play 3 more quizzes to reach <span className="font-bold text-white">Top 20</span>
                </p>
            </div>
        </div>
    )
}

function BadgesSection() {
    const earned = mockBadges.filter(b => b.earned)
    const locked = mockBadges.filter(b => !b.earned)

    return (
        <div
            className="rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.5s ease-out 0.72s both' }}
        >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#2A2A3D]">
                <div>
                    <h3 className="text-[15px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                        Achievements
                    </h3>
                    <p className="text-[11px] text-[#475569] mt-0.5">{earned.length} of {mockBadges.length} unlocked</p>
                </div>
                <button className="group flex items-center gap-1 text-[12px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium cursor-pointer transition-colors">
                    View all (42)
                    <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>

            <div className="p-5">
                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#475569] uppercase mb-3">Earned</p>
                <div className="grid grid-cols-4 gap-3 mb-5">
                    {earned.map((badge, i) => (
                        <div
                            key={badge.id}
                            title={badge.desc}
                            className="group flex flex-col items-center gap-1.5 cursor-pointer"
                            style={{ animation: `fadeSlideUp 0.4s ease-out ${0.73 + i * 0.06}s both` }}
                        >
                            <div className={cn(
                                'flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br border border-white/5 text-2xl select-none transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                                badge.color,
                            )}
                                style={{ boxShadow: '0 0 0 0 transparent' }}
                            >
                                {badge.emoji}
                            </div>
                            <span className="text-[9px] font-semibold text-[#94A3B8] text-center leading-tight">
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>

                <p className="text-[10px] font-semibold tracking-[0.12em] text-[#475569] uppercase mb-3">Locked</p>
                <div className="grid grid-cols-4 gap-3">
                    {locked.map((badge, i) => (
                        <div
                            key={badge.id}
                            title={`Locked: ${badge.desc}`}
                            className="flex flex-col items-center gap-1.5 cursor-not-allowed"
                            style={{ animation: `fadeSlideUp 0.4s ease-out ${0.8 + i * 0.06}s both` }}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1A2E] border border-[#2A2A3D] text-2xl select-none opacity-30 grayscale">
                                {badge.emoji}
                            </div>
                            <span className="text-[9px] font-medium text-[#2A2A3D] text-center leading-tight">
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function RankExtra() {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <span className="rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 border border-amber-500/20">
                    TOP 15%
                </span>
            </div>
            <p className="text-[11px] text-green-400">↑ Up 6 places this week</p>
            <p className="text-[10px] text-[#475569] mt-0.5">#24 — 120 pts behind #23</p>
        </div>
    )
}

function QuizzesExtra() {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <span className="rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 border border-green-500/20">
                    +5 This Week
                </span>
            </div>
            <p className="text-[11px] text-[#475569] mt-0.5">Avg score: 83%</p>
        </div>
    )
}

/* ═══════════════════════════════════════════════
   ═══  MAIN STUDENT DASHBOARD COMPONENT  ═══
   ═══════════════════════════════════════════════ */

export function StudentDashboard() {
    const navigate = useNavigate()
    const [joinCode, setJoinCode] = useState('')
    const [joinExpanded, setJoinExpanded] = useState(false)

    const statCards = [
        {
            accentColor: '#10B981', icon: Target, label: 'Avg. Accuracy',
            animTarget: 84, trend: '+3.1%', trendLabel: 'vs last month', trendUp: true,
        },
        {
            accentColor: '#8B5CF6', icon: BookOpen, label: 'Quizzes Played',
            animTarget: 47, extra: <QuizzesExtra />,
        },
        {
            accentColor: '#F59E0B', icon: Trophy, label: 'Global Rank',
            animTarget: 24, extra: <RankExtra />,
        },
        {
            accentColor: '#EC4899', icon: Flame, label: 'Best Streak',
            animTarget: 5,
            trend: 'Active now', trendLabel: '🔥', trendUp: true,
        },
    ]

    return (
        <>
            <style>{`
                @keyframes shimmer-sweep {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes flame-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }
                @keyframes dot-drift {
                    0% { background-position: 0 0; }
                    100% { background-position: 28px 28px; }
                }
            `}</style>

            <BackgroundParticles />

            <div className="relative min-h-screen px-6 py-8" style={{ background: '#0D0D1A' }}>
                <div className="mx-auto max-w-[1200px]">

                    <WelcomeRow
                        joinCode={joinCode}
                        setJoinCode={setJoinCode}
                        joinExpanded={joinExpanded}
                        setJoinExpanded={setJoinExpanded}
                    />

                    <div className="mb-6">
                        <XPHeroCard />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {statCards.map((card, i) => (
                            <StatCard key={card.label} {...card} index={i} />
                        ))}
                    </div>

                    <div className="mb-6">
                        <JoinSessionCard code={joinCode} setCode={setJoinCode} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-8">
                        <div className="lg:col-span-3 flex flex-col gap-5">
                            <UpcomingSessions />
                            <MiniLeaderboard />
                        </div>
                        <div className="lg:col-span-2">
                            <BadgesSection />
                        </div>
                    </div>

                    <RecentActivitySection />

                    <div className="h-16" />
                </div>
            </div>
        </>
    )
}
