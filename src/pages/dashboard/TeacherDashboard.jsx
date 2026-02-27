import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Plus, BookOpen, Target, Users, Trophy, TrendingUp,
    TrendingDown, Clock, MoreVertical, Play, Edit3, Copy,
    Share2, Archive, Trash2, ArrowRight,
    CheckCircle2, Circle, ChevronRight, X, WifiOff
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ─────── Mock Data ─────── */
const mockQuizzes = [
    {
        id: 'q1', title: 'Introduction to Physics', subject: 'Science',
        questionCount: 15, status: 'published', lastPlayed: '2 hours ago',
        gradient: 'from-teal-500/30 to-cyan-600/20', emoji: '⚗️',
        tags: ['Physics', 'Grade 10'],
    },
    {
        id: 'q2', title: 'World War II — Key Events', subject: 'History',
        questionCount: 20, status: 'published', lastPlayed: '1 day ago',
        gradient: 'from-amber-500/30 to-orange-600/20', emoji: '🏛️',
        tags: ['History', 'Grade 11'],
    },
    {
        id: 'q3', title: 'JavaScript Advanced Concepts', subject: 'Technology',
        questionCount: 12, status: 'draft', lastPlayed: '3 days ago',
        gradient: 'from-yellow-400/30 to-amber-500/20', emoji: '💻',
        tags: ['Programming', 'Web Dev'],
    },
    {
        id: 'q4', title: 'Cell Biology Deep Dive', subject: 'Science',
        questionCount: 18, status: 'published', lastPlayed: '5 days ago',
        gradient: 'from-green-500/30 to-emerald-600/20', emoji: '🔬',
        tags: ['Biology', 'Grade 10'],
    },
    {
        id: 'q5', title: 'Ancient Greek Mythology', subject: 'Literature',
        questionCount: 10, status: 'published', lastPlayed: '1 week ago',
        gradient: 'from-purple-500/30 to-violet-600/20', emoji: '⚡',
        tags: ['Literature', 'Culture'],
    },
    {
        id: 'q6', title: 'Algebra Fundamentals', subject: 'Math',
        questionCount: 25, status: 'draft', lastPlayed: 'Never',
        gradient: 'from-blue-500/30 to-indigo-600/20', emoji: '📐',
        tags: ['Algebra', 'Grade 9'],
    },
]

const recentCodes = ['BIO-2024', 'CS-101', 'PHY-003']

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

const xpTasks = [
    { label: 'Create a quiz', done: true },
    { label: 'Play a session', done: true },
    { label: 'Get 100% accuracy', done: false },
    { label: 'Invite a student', done: false },
    { label: 'Daily login', done: true },
]

const miniAvatarColors = ['#7C3AED', '#EC4899', '#10B981', '#F59E0B', '#3B82F6']

function useCountUp(target, duration = 700) {
    const [value, setValue] = useState(0)
    useEffect(() => {
        let start = 0
        const step = target / (duration / 16)
        const timer = setInterval(() => {
            start += step
            if (start >= target) { setValue(target); clearInterval(timer) }
            else setValue(Math.floor(start))
        }, 16)
        return () => clearInterval(timer)
    }, [target, duration])
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
                    className="absolute rounded-full bg-purple-500/5"
                    style={{
                        width: `${120 + i * 80}px`,
                        height: `${120 + i * 80}px`,
                        left: `${10 + i * 15}%`,
                        top: `${5 + i * 12}%`,
                        animation: `float ${8 + i * 2}s ease-in-out infinite`,
                        animationDelay: `${i * 1.2}s`,
                        filter: 'blur(40px)',
                    }}
                />
            ))}
        </div>
    )
}

function QuizMenu({ quizId, onClose }) {
    const items = [
        { icon: Edit3, label: 'Edit', color: '' },
        { icon: Copy, label: 'Duplicate', color: '' },
        { icon: Share2, label: 'Share', color: '' },
        { icon: Archive, label: 'Archive', color: '' },
        { icon: Trash2, label: 'Delete', color: 'text-red-400 hover:bg-red-500/10' },
    ]
    return (
        <div
            className="absolute right-0 top-8 z-50 w-44 rounded-xl border border-[#2A2A3D] bg-[#1A1A2E] shadow-2xl shadow-black/50 overflow-hidden"
            style={{ animation: 'fadeSlideUp 0.15s ease-out forwards' }}
        >
            {items.map(({ icon: Icon, label, color }) => (
                <button
                    key={label}
                    onClick={onClose}
                    className={cn(
                        'flex w-full items-center gap-2.5 px-3.5 py-2.5 text-[13px] transition-all duration-100 cursor-pointer',
                        color || 'text-[#94A3B8] hover:text-white hover:bg-[rgba(124,58,237,0.08)]'
                    )}
                >
                    <Icon size={14} />
                    {label}
                </button>
            ))}
        </div>
    )
}

function QuizCard({ quiz, index }) {
    const [menuOpen, setMenuOpen] = useState(false)
    const [hovered, setHovered] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        function handle(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
        }
        if (menuOpen) document.addEventListener('mousedown', handle)
        return () => document.removeEventListener('mousedown', handle)
    }, [menuOpen])

    return (
        <div
            className="group relative flex flex-col rounded-2xl border border-[#2A2A3D] bg-[#13131F] overflow-hidden transition-all duration-300 hover:border-[#7C3AED]/30 hover:shadow-xl hover:shadow-purple-900/10 hover:-translate-y-0.5"
            style={{ animation: `fadeSlideUp 0.5s ease-out ${0.05 * index}s both` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={`relative h-32 bg-gradient-to-br ${quiz.gradient} overflow-hidden`}>
                <span
                    className="absolute inset-0 flex items-center justify-center text-6xl select-none transition-transform duration-500"
                    style={{
                        opacity: 0.35,
                        transform: hovered ? 'scale(1.1)' : 'scale(1)',
                    }}
                >
                    {quiz.emoji}
                </span>

                <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1">
                    {quiz.questionCount} Qs
                </span>

                <span
                    className={cn(
                        'absolute top-3 right-3 rounded-full text-white text-[10px] font-bold px-2.5 py-1 uppercase tracking-wide',
                        quiz.status === 'published' ? 'bg-emerald-500/90' : 'bg-amber-500/90'
                    )}
                >
                    {quiz.status}
                </span>

                <div
                    className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
                    style={{ opacity: hovered ? 1 : 0 }}
                >
                    <button className="flex items-center gap-2 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 transition-all duration-200 active:scale-95 cursor-pointer">
                        <Play size={15} />
                        Start Live
                    </button>
                </div>
            </div>

            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-[14px] font-semibold text-white leading-snug mb-1.5 line-clamp-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {quiz.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-[#475569] mb-3">
                    <Clock size={11} />
                    Played {quiz.lastPlayed}
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span className="rounded-lg bg-[#1A1A2E] border border-[#2A2A3D] text-[#94A3B8] text-[11px] font-medium px-2.5 py-1">
                        {quiz.subject}
                    </span>

                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v) }}
                            className={cn(
                                'rounded-lg p-1.5 text-[#475569] hover:text-white hover:bg-[#1A1A2E] transition-all duration-200 cursor-pointer',
                                hovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                            )}
                        >
                            <MoreVertical size={15} />
                        </button>
                        {menuOpen && <QuizMenu quizId={quiz.id} onClose={() => setMenuOpen(false)} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ accentColor, icon: Icon, label, value, animTarget, trend, trendLabel, trendUp, extra, index }) {
    const animated = useCountUp(animTarget ?? 0)
    const displayValue = animTarget !== undefined ? animated : value

    return (
        <div
            className="relative flex flex-col rounded-2xl border border-[#2A2A3D] bg-[#13131F] p-5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#2A2A3D]/80 hover:-translate-y-0.5"
            style={{ animation: `fadeSlideUp 0.5s ease-out ${0.35 + index * 0.05}s both` }}
        >
            <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl" style={{ background: accentColor }} />

            <div className="absolute top-4 right-4 opacity-60">
                <Icon size={20} style={{ color: accentColor }} />
            </div>

            <p className="text-[10px] font-semibold tracking-[0.12em] text-[#475569] uppercase mb-3">{label}</p>

            <p className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                {label === 'Global Rank' && <span style={{ color: '#475569' }}>#</span>}
                {displayValue}
            </p>

            {trend && (
                <div className="flex items-center gap-1.5 mt-auto">
                    {trendUp
                        ? <TrendingUp size={12} className="text-green-400" />
                        : <TrendingDown size={12} className="text-red-400" />}
                    <span className={cn('text-[11px] font-semibold', trendUp ? 'text-green-400' : 'text-red-400')}>
                        {trend}
                    </span>
                    <span className="text-[11px] text-[#475569]">{trendLabel}</span>
                </div>
            )}
            {extra && <div className="mt-auto">{extra}</div>}
        </div>
    )
}

function XPHeroCard() {
    const [xpAnimated, setXpAnimated] = useState(false)
    const xpPercent = (1200 / 2000) * 100 
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
                className="absolute inset-0 pointer-events-none rounded-2xl"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
                    opacity: 0.4,
                }}
            />
            <div
                className="absolute top-0 right-4 select-none pointer-events-none"
                style={{
                    fontSize: '140px',
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 900,
                    opacity: 0.04,
                    color: '#fff',
                    lineHeight: 1,
                }}
            >
                12
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6 lg:p-7">
                    <div className="flex items-center gap-4 mb-5">
                        <div
                            className="relative flex h-14 w-14 shrink-0 items-center justify-center"
                            style={{
                                clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
                                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                                boxShadow: '0 0 20px rgba(245, 158, 11, 0.35)',
                            }}
                        >
                            <span className="text-[20px] font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>12</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <p className="text-[10px] font-bold tracking-[0.2em] text-amber-400 uppercase">
                                    Master League
                                </p>
                                <span style={{ animation: 'pulse 3s ease-in-out infinite' }}>👑</span>
                            </div>
                            <p className="text-[13px] text-[#94A3B8]">Teacher · Level 12</p>
                        </div>
                    </div>

                    <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[12px] font-medium text-[#475569]">Experience Points</p>
                            <p className="text-[12px] font-bold text-white">1,200 / 2,000 XP</p>
                        </div>
                        <div className="relative h-2.5 w-full rounded-full bg-[#1A1A2E] overflow-hidden">
                            <div
                                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] transition-all duration-1000 ease-out"
                                style={{ width: xpAnimated ? `${xpPercent}%` : '0%' }}
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
                            🎯 You need <span className="font-bold text-white">800 XP</span> to reach Level 13
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold tracking-[0.1em] text-[#475569] uppercase mb-2.5">Ways to earn XP today</p>
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
                        <p className="text-[11px] text-green-400 mt-2">
                            ✓ 3/5 tasks done today
                        </p>
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

                    <p
                        className="text-6xl font-black text-white leading-none mb-0.5"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                    >
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
                                            isPast ? 'bg-purple-400/70' : isToday ? 'bg-purple-300' : 'bg-white/10'
                                        )}
                                        style={isToday ? { animation: 'pulse 1.5s ease-in-out infinite', boxShadow: '0 0 10px rgba(196,181,253,0.5)' } : {}}
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

function StartSessionCard({ onCreateQuiz }) {
    const [selectedQuiz, setSelectedQuiz] = useState(null)
    const [focused, setFocused] = useState(false)

    const publishedQuizzes = mockQuizzes.filter(q => q.status === 'published')

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
            <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.04) 50%, transparent 100%)',
                    animation: 'card-shimmer 2s ease-in-out infinite',
                }}
            />

            <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="relative flex h-2.5 w-2.5 items-center justify-center">
                                <div className="absolute h-full w-full rounded-full bg-green-500 animate-ping opacity-60" />
                                <div className="h-2 w-2 rounded-full bg-green-500" />
                            </div>
                            <span className="text-[10px] font-bold tracking-[0.18em] text-green-400 uppercase">Ready</span>
                        </div>
                        <h3 className="text-[16px] font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                            Start a Live Session
                        </h3>
                        <p className="text-[12px] text-[#475569]">
                            Pick a quiz and launch instantly — players join with a PIN
                        </p>
                    </div>
                    <div className="text-3xl select-none">🚀</div>
                </div>

                <div
                    className={cn(
                        'flex items-center rounded-xl border transition-all duration-300 overflow-hidden bg-[#0D0D1A] mb-3',
                        focused ? 'border-[#7C3AED] shadow-[0_0_0_3px_rgba(124,58,237,0.12)]' : 'border-[#2A2A3D]'
                    )}
                >
                    <div className="flex items-center gap-2 flex-1 px-4">
                        <Play size={15} className="text-[#475569] shrink-0" />
                        <select
                            value={selectedQuiz || ''}
                            onChange={(e) => setSelectedQuiz(e.target.value)}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#475569] outline-none py-3.5 cursor-pointer appearance-none"
                            style={{ color: selectedQuiz ? '#fff' : '#475569' }}
                        >
                            <option value="" disabled style={{ background: '#1A1A2E' }}>Select a published quiz...</option>
                            {publishedQuizzes.map(q => (
                                <option key={q.id} value={q.id} style={{ background: '#1A1A2E', color: '#fff' }}>
                                    {q.emoji} {q.title}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="h-8 w-px bg-[#2A2A3D] shrink-0" />
                    <button
                        disabled={!selectedQuiz}
                        className="flex items-center gap-2 px-5 py-3.5 text-[13px] font-semibold text-white bg-[#7C3AED] hover:bg-[#8B5CF6] disabled:opacity-40 disabled:pointer-events-none transition-colors duration-200 shrink-0 cursor-pointer"
                    >
                        Launch <ArrowRight size={14} />
                    </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[11px] text-[#475569]">No quiz yet?</span>
                    <button
                        onClick={onCreateQuiz}
                        className="text-[11px] font-semibold text-[#8B5CF6] bg-[#7C3AED]/10 hover:bg-[#7C3AED]/20 border border-[#7C3AED]/20 rounded-lg px-2.5 py-1 transition-all duration-200 cursor-pointer flex items-center gap-1"
                    >
                        <Plus size={11} /> Create a new quiz
                    </button>
                </div>
            </div>
        </div>
    )
}

function WelcomeRow({ onCreateQuiz }) {
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
                    {greeting.text}, Alex! {greeting.icon}
                </h1>
                <p className="text-[13px] text-[#475569] leading-relaxed">
                    You have <span className="font-bold text-white">2 quizzes</span> scheduled today ·{' '}
                    <span className="font-bold text-white">12 new students</span> joined this week
                </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <button
                    onClick={onCreateQuiz}
                    className="relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white bg-[#7C3AED] hover:bg-[#8B5CF6] shadow-lg shadow-purple-900/30 transition-all duration-200 active:scale-95 cursor-pointer overflow-hidden group"
                >
                    <span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    />
                    <Plus size={16} />
                    Create Quiz
                </button>
            </div>
        </div>
    )
}

function RecentQuizzesSection({ quizzes }) {
    const [filter, setFilter] = useState('all')
    const filters = [
        { id: 'all', label: 'All' },
        { id: 'published', label: 'Published' },
        { id: 'draft', label: 'Draft' },
    ]

    const filtered = filter === 'all' ? quizzes : quizzes.filter((q) => q.status === filter)

    return (
        <div style={{ animation: 'fadeSlideUp 0.5s ease-out 0.65s both' }}>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-[18px] font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                    Recent Quizzes
                </h2>
                <button className="group flex items-center gap-1.5 text-[13px] text-[#8B5CF6] hover:text-[#A78BFA] font-medium transition-colors duration-200 cursor-pointer">
                    View All (24)
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
            {filtered.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filtered.map((quiz, i) => (
                        <QuizCard key={quiz.id} quiz={quiz} index={i} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#2A2A3D] py-16">
                    <div className="text-5xl mb-4 select-none">📝</div>
                    <h3 className="text-[16px] font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                        No quizzes yet
                    </h3>
                    <p className="text-[13px] text-[#475569] text-center max-w-xs mb-6">
                        Create your first quiz and engage your students instantly
                    </p>
                    <button className="flex items-center gap-2 rounded-xl bg-[#7C3AED] hover:bg-[#8B5CF6] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 cursor-pointer">
                        <Plus size={15} />
                        Create Quiz
                    </button>
                </div>
            )}
        </div>
    )
}

function OfflineBanner({ show, onDismiss }) {
    if (!show) return null
    return (
        <div
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-5 py-3 shadow-2xl"
            style={{ animation: 'fadeSlideUp 0.3s ease-out forwards' }}
        >
            <WifiOff size={15} className="text-amber-400 shrink-0" />
            <span className="text-[13px] text-amber-300 font-medium">You're offline — some features unavailable</span>
            <button onClick={onDismiss} className="ml-2 text-amber-400/60 hover:text-amber-300 cursor-pointer">
                <X size={14} />
            </button>
        </div>
    )
}

function RankExtra() {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <span className="rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 border border-amber-500/20">
                    TOP 5%
                </span>
            </div>
            <p className="text-[11px] text-green-400">↑ Up 14 places this week</p>
            <p className="text-[10px] text-[#475569] mt-0.5">#402 — only 12 pts behind #401</p>
        </div>
    )
}

function StudentsExtra() {
    return (
        <div>
            <div className="flex items-center gap-1.5 mb-1">
                <span className="rounded-full bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 border border-green-500/20">
                    +12 New
                </span>
            </div>
            <div className="flex items-center -space-x-1.5 mt-2">
                {miniAvatarColors.map((color, i) => (
                    <div
                        key={i}
                        className="h-6 w-6 rounded-full border-2 border-[#13131F] flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ background: color }}
                    >
                        {String.fromCharCode(65 + i)}
                    </div>
                ))}
                <div className="h-6 w-6 rounded-full border-2 border-[#13131F] bg-[#2A2A3D] flex items-center justify-center text-[9px] font-bold text-[#94A3B8]">
                    +7
                </div>
            </div>
        </div>
    )
}

const subjectColors = ['#7C3AED', '#10B981', '#F59E0B', '#EC4899', '#3B82F6']
function QuizzesExtra() {
    return (
        <div>
            <p className="text-[11px] text-[#475569] mb-2">3 this week</p>
            <div className="flex items-center gap-1">
                {subjectColors.map((c, i) => (
                    <div key={i} className="h-2 w-2 rounded-full" style={{ background: c }} />
                ))}
            </div>
        </div>
    )
}

const globalStyles = `
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
@keyframes card-shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
}
@keyframes live-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}
`

/* ═══════════════════════════════════════════════
   ═══  MAIN TEACHER DASHBOARD COMPONENT  ═══
   ═══════════════════════════════════════════════ */

export function TeacherDashboard() {
    const navigate = useNavigate()
    const [offlineBanner, setOfflineBanner] = useState(false)

    const statCards = [
        {
            accentColor: '#10B981',
            icon: Target,
            label: 'Avg. Accuracy',
            animTarget: 85,
            trend: '+2.4%',
            trendLabel: 'vs last month',
            trendUp: true,
        },
        {
            accentColor: '#8B5CF6',
            icon: BookOpen,
            label: 'Quizzes Created',
            animTarget: 24,
            extra: <QuizzesExtra />,
        },
        {
            accentColor: '#F59E0B',
            icon: Trophy,
            label: 'Global Rank',
            animTarget: 402,
            extra: <RankExtra />,
        },
        {
            accentColor: '#EC4899',
            icon: Users,
            label: 'Students',
            animTarget: 142,
            extra: <StudentsExtra />,
        },
    ]

    return (
        <>
            <style>{globalStyles}</style>

            <BackgroundParticles />
            <OfflineBanner show={offlineBanner} onDismiss={() => setOfflineBanner(false)} />

            <div className="relative min-h-screen px-6 py-8" style={{ background: '#0D0D1A' }}>
                <div className="mx-auto max-w-[1200px]">

                    <WelcomeRow
                        onCreateQuiz={() => navigate('/dashboard/quiz-builder')}
                    />

                    <div className="mb-6">
                        <XPHeroCard />
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {statCards.map((card, i) => (
                            <StatCard key={card.label} {...card} index={i} />
                        ))}
                    </div>

                    <div className="mb-8">
                        <StartSessionCard onCreateQuiz={() => navigate('/dashboard/quiz-builder')} />
                    </div>

                    <RecentQuizzesSection quizzes={mockQuizzes} />

                    <div className="h-16" />
                </div>
            </div>
        </>
    )
}
