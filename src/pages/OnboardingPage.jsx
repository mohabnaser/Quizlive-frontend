import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
    Zap, ArrowRight, ArrowLeft, Check, Upload, Camera, User, AtSign,
    Globe, FileText, Sparkles, GraduationCap, BookOpen,
    BarChart3, Gamepad2, Users, Pin, Award, BookMarked,
    PartyPopper, Rocket
} from 'lucide-react'
import { cn } from '@/lib/utils'


function FloatingParticles() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-primary-500/15 blur-sm"
                    style={{
                        width: `${3 + Math.random() * 5}px`,
                        height: `${3 + Math.random() * 5}px`,
                        left: `${5 + Math.random() * 90}%`,
                        top: `${5 + Math.random() * 90}%`,
                        animation: `float ${5 + Math.random() * 5}s ease-in-out infinite`,
                        animationDelay: `${i * 0.6}s`,
                    }}
                />
            ))}
        </div>
    )
}


function ConfettiAnimation() {
    const colors = [
        '#7c1fff', '#a855f7', '#ec4899', '#f59e0b',
        '#10b981', '#3b82f6', '#f43f5e', '#8b5cf6',
    ]

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => {
                const color = colors[i % colors.length]
                const size = 4 + Math.random() * 8
                const left = Math.random() * 100
                const delay = Math.random() * 2
                const duration = 2.5 + Math.random() * 2
                const rotation = Math.random() * 360
                const shape = i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-sm' : ''

                return (
                    <div
                        key={i}
                        className={cn('absolute', shape)}
                        style={{
                            width: `${size}px`,
                            height: i % 3 === 2 ? `${size * 2.5}px` : `${size}px`,
                            backgroundColor: color,
                            left: `${left}%`,
                            top: '-10px',
                            transform: `rotate(${rotation}deg)`,
                            animation: `confettiFall ${duration}s ease-in ${delay}s forwards`,
                            opacity: 0,
                        }}
                    />
                )
            })}
        </div>
    )
}


function AnimatedCheckmark() {
    return (
        <div className="relative flex items-center justify-center">
            <div className="absolute h-32 w-32 rounded-full bg-green-500/10 animate-ping" style={{ animationDuration: '2s' }} />
            <div className="absolute h-28 w-28 rounded-full bg-green-500/15 animate-pulse" style={{ animationDuration: '1.5s' }} />
            <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-2xl shadow-green-500/40"
                style={{
                    animation: 'checkmarkAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
                }}
            >
                <Check className="h-12 w-12 text-white" strokeWidth={3} style={{
                    animation: 'checkmarkDraw 0.4s ease-out 0.4s forwards',
                    opacity: 0,
                }} />
            </div>
        </div>
    )
}


function ProgressBar({ currentStep, totalSteps }) {
    const percentage = ((currentStep) / totalSteps) * 100

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold tracking-[0.14em] text-dark-muted uppercase">
                    Step {currentStep} of {totalSteps}
                </span>
                <span className="text-[11px] font-bold text-primary-400">
                    {Math.round(percentage)}%
                </span>
            </div>

            <div className="relative h-2 w-full rounded-full bg-dark-border/40 overflow-hidden">
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500 transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%` }}
                />
                <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-700 ease-out"
                    style={{ width: `${percentage}%`, animation: 'shimmer 2s ease-in-out infinite' }}
                />
            </div>

            <div className="flex items-center justify-between mt-4">
                {Array.from({ length: totalSteps }).map((_, i) => {
                    const stepNum = i + 1
                    const isCompleted = currentStep > stepNum
                    const isCurrent = currentStep === stepNum

                    return (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                            <div
                                className={cn(
                                    'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-bold transition-all duration-500',
                                    isCompleted
                                        ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/30'
                                        : isCurrent
                                            ? 'border-primary-500 text-primary-400 bg-primary-500/10 shadow-lg shadow-primary-500/20'
                                            : 'border-dark-border/60 text-dark-muted bg-transparent'
                                )}
                            >
                                {isCompleted ? <Check className="h-4 w-4" /> : stepNum}
                            </div>
                            <span className={cn(
                                'text-[10px] font-medium transition-colors duration-300 hidden sm:block',
                                isCompleted || isCurrent ? 'text-white' : 'text-dark-muted/60'
                            )}>
                                {['Role', 'Profile', 'Topics', 'Ready'][i]}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


function StepRoleSelection({ selectedRole, onSelect }) {
    const roles = [
        {
            id: 'teacher',
            emoji: '🎓',
            icon: GraduationCap,
            title: 'Teacher',
            subtitle: 'Host engaging live quizzes, track progress, gamify learning',
            color: 'from-blue-500/20 to-blue-600/10',
            borderColor: 'border-blue-500/40',
            features: [
                { icon: Users, text: 'Classroom management' },
                { icon: BarChart3, text: 'Detailed reports' },
                { icon: Gamepad2, text: 'Live game modes' },
            ],
        },
        {
            id: 'student',
            emoji: '📚',
            icon: BookOpen,
            title: 'Student',
            subtitle: 'Join quizzes, challenge friends, earn badges',
            color: 'from-green-500/20 to-green-600/10',
            borderColor: 'border-green-500/40',
            features: [
                { icon: Pin, text: 'Join via PIN' },
                { icon: Award, text: 'Personal stats' },
                { icon: BookMarked, text: 'Study flashcards' },
            ],
        },
    ]

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ animation: 'fadeSlideUp 0.5s ease-out forwards' }}>
            <div className="text-center mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    How will you use QuizLive?
                </h2>
                <p className="text-sm text-dark-muted leading-relaxed max-w-md mx-auto">
                    Choose your primary role. You can always change this later in settings.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {roles.map((role, index) => {
                    const isSelected = selectedRole === role.id
                    return (
                        <button
                            key={role.id}
                            type="button"
                            onClick={() => onSelect(role.id)}
                            className={cn(
                                'group relative flex flex-col items-center text-center rounded-2xl border p-6 sm:p-7 transition-all duration-300 cursor-pointer',
                                'hover:scale-[1.02] hover:-translate-y-1 active:scale-[0.98]',
                                isSelected
                                    ? 'border-primary-500 bg-primary-500/8 shadow-xl shadow-primary-500/15'
                                    : 'border-dark-border bg-dark-card/60 hover:border-primary-500/30 hover:bg-dark-card-hover/80 hover:shadow-lg hover:shadow-primary-900/10'
                            )}
                            style={{
                                animation: `fadeSlideUp 0.5s ease-out ${0.1 + index * 0.1}s both`,
                            }}
                        >
                            {isSelected && (
                                <div className="absolute -top-2.5 -right-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 shadow-lg shadow-primary-500/40 ring-4 ring-dark-bg"
                                    style={{ animation: 'checkmarkAppear 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}
                                >
                                    <Check className="h-4 w-4 text-white" strokeWidth={3} />
                                </div>
                            )}

                            <div className={cn(
                                'flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br mb-5 transition-all duration-300',
                                role.color,
                                isSelected ? 'scale-110 shadow-lg' : 'group-hover:scale-105'
                            )}>
                                <span className="text-3xl select-none">{role.emoji}</span>
                            </div>

                            <h3 className={cn(
                                'text-lg font-bold mb-2 transition-colors duration-300',
                                isSelected ? 'text-white' : 'text-white/90'
                            )}>
                                {role.title}
                            </h3>
                            <p className="text-xs text-dark-muted leading-relaxed mb-5">
                                {role.subtitle}
                            </p>

                            <div className="w-full space-y-2.5">
                                {role.features.map((feat) => (
                                    <div key={feat.text} className="flex items-center gap-2.5 text-left">
                                        <div className={cn(
                                            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-300',
                                            isSelected ? 'bg-primary-500/25' : 'bg-dark-border/30'
                                        )}>
                                            <Check className={cn(
                                                'h-3 w-3 transition-colors duration-300',
                                                isSelected ? 'text-primary-400' : 'text-dark-muted/50'
                                            )} />
                                        </div>
                                        <span className={cn(
                                            'text-[12px] font-medium transition-colors duration-300',
                                            isSelected ? 'text-white/80' : 'text-dark-muted/70'
                                        )}>
                                            {feat.text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {isSelected && (
                                <div className="absolute -bottom-px left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}


function StepProfileSetup({ profileData, onChange }) {
    const fileInputRef = useRef(null)
    const [focusedField, setFocusedField] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setAvatarPreview(ev.target.result)
                onChange({ ...profileData, avatar: ev.target.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const countries = [
        'United States', 'United Kingdom', 'Canada', 'Australia', 'Germany',
        'France', 'Japan', 'India', 'Brazil', 'Egypt', 'South Korea',
        'Mexico', 'Indonesia', 'Turkey', 'Saudi Arabia', 'UAE',
        'South Africa', 'Nigeria', 'Kenya', 'Spain', 'Italy',
        'Netherlands', 'Sweden', 'Norway', 'Singapore', 'Malaysia',
        'Philippines', 'Thailand', 'Vietnam', 'Argentina', 'Colombia',
        'Chile', 'Poland', 'Czech Republic', 'Austria', 'Switzerland',
        'Belgium', 'Portugal', 'Ireland', 'New Zealand', 'Other',
    ]

    return (
        <div className="w-full max-w-lg mx-auto" style={{ animation: 'fadeSlideUp 0.5s ease-out forwards' }}>
            <div className="text-center mb-9">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    Set up your profile
                </h2>
                <p className="text-sm text-dark-muted leading-relaxed">
                    Let others know who you are. This helps build your QuizLive identity.
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative cursor-pointer"
                >
                    <div className={cn(
                        'flex h-28 w-28 items-center justify-center rounded-full border-2 border-dashed transition-all duration-300 overflow-hidden',
                        avatarPreview
                            ? 'border-primary-500 shadow-lg shadow-primary-500/20'
                            : 'border-dark-border hover:border-primary-500/50 bg-dark-card'
                    )}>
                        {avatarPreview ? (
                            <img src={avatarPreview} alt="Avatar" className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex flex-col items-center gap-1.5">
                                <Camera className="h-7 w-7 text-dark-muted group-hover:text-primary-400 transition-colors duration-300" />
                                <span className="text-[10px] font-medium text-dark-muted group-hover:text-primary-400 transition-colors">
                                    Upload
                                </span>
                            </div>
                        )}
                    </div>
                    {avatarPreview && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Upload className="h-6 w-6 text-white" />
                        </div>
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                    />
                </button>
            </div>

            <div className="space-y-5">
                <div>
                    <label htmlFor="onb-display-name" className="block text-[13px] font-semibold text-white mb-2">
                        Display name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted/50 pointer-events-none" />
                        <input
                            id="onb-display-name"
                            type="text"
                            value={profileData.displayName}
                            onChange={(e) => onChange({ ...profileData, displayName: e.target.value })}
                            onFocus={() => setFocusedField('displayName')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Alex Johnson"
                            className={cn(
                                'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                focusedField === 'displayName'
                                    ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                    : 'border-dark-border hover:border-dark-border/80'
                            )}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="onb-username" className="block text-[13px] font-semibold text-white mb-2">
                        Username <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted/50 pointer-events-none" />
                        <input
                            id="onb-username"
                            type="text"
                            value={profileData.username}
                            onChange={(e) => onChange({ ...profileData, username: e.target.value.replace(/\s/g, '').toLowerCase() })}
                            onFocus={() => setFocusedField('username')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="alexjohnson"
                            className={cn(
                                'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                focusedField === 'username'
                                    ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                    : 'border-dark-border hover:border-dark-border/80'
                            )}
                        />
                        {profileData.username && (
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[11px] font-medium text-green-400 flex items-center gap-1">
                                <Check className="h-3 w-3" /> Available
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="onb-country" className="block text-[13px] font-semibold text-white mb-2">
                        Country / Region <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-dark-muted/50 pointer-events-none" />
                        <select
                            id="onb-country"
                            value={profileData.country}
                            onChange={(e) => onChange({ ...profileData, country: e.target.value })}
                            onFocus={() => setFocusedField('country')}
                            onBlur={() => setFocusedField(null)}
                            className={cn(
                                'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white outline-none transition-all duration-250 appearance-none cursor-pointer',
                                !profileData.country && 'text-dark-muted/50',
                                focusedField === 'country'
                                    ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                    : 'border-dark-border hover:border-dark-border/80'
                            )}
                        >
                            <option value="" disabled>Select your country</option>
                            {countries.map((c) => (
                                <option key={c} value={c} className="bg-dark-card text-white">{c}</option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg className="h-4 w-4 text-dark-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label htmlFor="onb-bio" className="flex items-center justify-between text-[13px] font-semibold text-white mb-2">
                        <span>Bio</span>
                        <span className="text-[11px] font-normal text-dark-muted/60">Optional</span>
                    </label>
                    <div className="relative">
                        <FileText className="absolute left-4 top-3.5 h-4 w-4 text-dark-muted/50 pointer-events-none" />
                        <textarea
                            id="onb-bio"
                            value={profileData.bio}
                            onChange={(e) => onChange({ ...profileData, bio: e.target.value.slice(0, 160) })}
                            onFocus={() => setFocusedField('bio')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Tell us a bit about yourself..."
                            rows={3}
                            className={cn(
                                'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250 resize-none',
                                focusedField === 'bio'
                                    ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                    : 'border-dark-border hover:border-dark-border/80'
                            )}
                        />
                        <span className="absolute right-3 bottom-2.5 text-[10px] text-dark-muted/40">
                            {profileData.bio.length}/160
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepTopics({ selectedTopics, onToggle }) {
    const topics = [
        { id: 'science', label: 'Science', emoji: '🔬' },
        { id: 'math', label: 'Mathematics', emoji: '🔢' },
        { id: 'history', label: 'History', emoji: '🏛️' },
        { id: 'geography', label: 'Geography', emoji: '🌍' },
        { id: 'technology', label: 'Technology', emoji: '💻' },
        { id: 'literature', label: 'Literature', emoji: '📖' },
        { id: 'sports', label: 'Sports', emoji: '⚽' },
        { id: 'pop-culture', label: 'Pop Culture', emoji: '🎬' },
        { id: 'music', label: 'Music', emoji: '🎵' },
        { id: 'art', label: 'Art & Design', emoji: '🎨' },
        { id: 'languages', label: 'Languages', emoji: '🗣️' },
        { id: 'psychology', label: 'Psychology', emoji: '🧠' },
        { id: 'business', label: 'Business', emoji: '📊' },
        { id: 'health', label: 'Health & Fitness', emoji: '🏃' },
        { id: 'cooking', label: 'Cooking', emoji: '🍳' },
        { id: 'astronomy', label: 'Astronomy', emoji: '🌌' },
        { id: 'philosophy', label: 'Philosophy', emoji: '💭' },
        { id: 'programming', label: 'Programming', emoji: '👨‍💻' },
        { id: 'movies', label: 'Movies & TV', emoji: '🎥' },
        { id: 'nature', label: 'Nature', emoji: '🌿' },
    ]

    const remaining = 3 - selectedTopics.length

    return (
        <div className="w-full max-w-2xl mx-auto" style={{ animation: 'fadeSlideUp 0.5s ease-out forwards' }}>
            <div className="text-center mb-9">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">
                    What are you interested in?
                </h2>
                <p className="text-sm text-dark-muted leading-relaxed">
                    Pick topics that excite you. We'll personalize your experience based on your choices.
                </p>
            </div>

            <div className="flex justify-center mb-7">
                <div className={cn(
                    'inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-300',
                    selectedTopics.length >= 3
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : 'bg-dark-card text-dark-muted border border-dark-border'
                )}>
                    {selectedTopics.length >= 3 ? (
                        <>
                            <Check className="h-3.5 w-3.5" />
                            {selectedTopics.length} topics selected — great choices!
                        </>
                    ) : (
                        <>
                            <Sparkles className="h-3.5 w-3.5" />
                            Select at least {remaining} more topic{remaining !== 1 ? 's' : ''}
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
                {topics.map((topic, index) => {
                    const isSelected = selectedTopics.includes(topic.id)
                    return (
                        <button
                            key={topic.id}
                            type="button"
                            onClick={() => onToggle(topic.id)}
                            className={cn(
                                'group flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 cursor-pointer',
                                'hover:scale-105 active:scale-95',
                                isSelected
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25 border border-primary-400/50'
                                    : 'bg-dark-card/70 text-dark-muted border border-dark-border hover:border-primary-500/30 hover:text-white hover:bg-dark-card-hover'
                            )}
                            style={{
                                animation: `fadeSlideUp 0.4s ease-out ${0.02 * index}s both`,
                            }}
                        >
                            <span className="text-base select-none">{topic.emoji}</span>
                            <span>{topic.label}</span>
                            {isSelected && (
                                <Check className="h-3.5 w-3.5 ml-0.5" style={{ animation: 'checkmarkAppear 0.2s ease-out forwards' }} />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}


function StepReady({ profileData, selectedRole }) {
    const displayName = profileData.displayName || 'Explorer'

    const teacherTips = [
        { text: 'Create your first quiz in minutes', emoji: '✨' },
        { text: 'Launch a live session and share the game PIN', emoji: '🎮' },
        { text: "Track your students' progress with Analytics", emoji: '📊' },
    ]
    const studentTips = [
        { text: 'Join a live session with a game PIN', emoji: '🎮' },
        { text: 'Compete on the global leaderboard', emoji: '🏆' },
        { text: 'Complete daily missions to earn XP', emoji: '⚡' },
    ]
    const tips = selectedRole === 'teacher' ? teacherTips : studentTips

    return (
        <div className="w-full max-w-md mx-auto text-center relative" style={{ animation: 'fadeSlideUp 0.5s ease-out forwards' }}>
            <ConfettiAnimation />

            <div className="relative z-10">
                <div className="flex justify-center mb-8">
                    <AnimatedCheckmark />
                </div>

                <h2
                    className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight"
                    style={{ animation: 'fadeSlideUp 0.6s ease-out 0.5s both' }}
                >
                    You're all set, {displayName}! 🎉
                </h2>

                <p
                    className="text-base text-dark-muted leading-relaxed mb-3 max-w-sm mx-auto"
                    style={{ animation: 'fadeSlideUp 0.6s ease-out 0.7s both' }}
                >
                    Your QuizLive account is ready. Time to explore, learn, and have fun!
                </p>

                <div
                    className="flex justify-center gap-3 mb-10 mt-8"
                    style={{ animation: 'fadeSlideUp 0.6s ease-out 0.9s both' }}
                >
                    <div className="flex items-center gap-2 rounded-full bg-primary-500/10 border border-primary-500/20 px-4 py-2">
                        <Sparkles className="h-4 w-4 text-primary-400" />
                        <span className="text-xs font-semibold text-primary-300">+100 XP Earned</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2">
                        <Award className="h-4 w-4 text-amber-400" />
                        <span className="text-xs font-semibold text-amber-300">Early Adopter</span>
                    </div>
                </div>
                <div
                    className="rounded-2xl border border-dark-border bg-dark-card/60 p-6 mb-8 text-left"
                    style={{ animation: 'fadeSlideUp 0.6s ease-out 1.1s both' }}
                >
                    <h4 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Rocket className="h-4 w-4 text-primary-400" />
                        Quick Start Tips
                    </h4>
                    <div className="space-y-3">
                        {tips.map((tip, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-lg select-none">{tip.emoji}</span>
                                <span className="text-[13px] text-dark-muted">{tip.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}


/* ═══════════════════════════════════════════════
   ═══  MAIN ONBOARDING PAGE COMPONENT  ═══
   ═══════════════════════════════════════════════ */

export function OnboardingPage() {
    const navigate = useNavigate()
    const [currentStep, setCurrentStep] = useState(1)
    const totalSteps = 4

    const [selectedRole, setSelectedRole] = useState('')
    const [profileData, setProfileData] = useState({
        displayName: '',
        username: '',
        country: '',
        bio: '',
        avatar: null,
    })
    const [selectedTopics, setSelectedTopics] = useState([])

    const handleTopicToggle = useCallback((topicId) => {
        setSelectedTopics((prev) =>
            prev.includes(topicId)
                ? prev.filter((t) => t !== topicId)
                : [...prev, topicId]
        )
    }, [])

    const canProceed = () => {
        switch (currentStep) {
            case 1: return !!selectedRole
            case 2: return profileData.displayName.trim() && profileData.username.trim() && profileData.country
            case 3: return selectedTopics.length >= 3
            case 4: return true
            default: return false
        }
    }

    const handleNext = () => {
        if (currentStep < totalSteps) {
            setCurrentStep((s) => s + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((s) => s - 1)
        }
    }

    const handleFinish = () => {
        if (selectedRole === 'student') {
            navigate('/student')
        } else {
            navigate('/dashboard')
        }
    }

    return (
        <div className="flex flex-col items-center min-h-screen px-4 py-8 sm:py-12 relative">
            <FloatingParticles />
            <Link to="/" className="flex items-center gap-3 mb-10 group relative z-10"
                style={{ animation: 'fadeSlideUp 0.5s ease-out forwards' }}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary-500/50">
                    <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">QuizLive</span>
            </Link>

            <div className="w-full max-w-lg mb-12 relative z-10"
                style={{ animation: 'fadeSlideUp 0.5s ease-out 0.1s both' }}
            >
                <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
            </div>

            <div className="flex-1 w-full flex items-start justify-center relative z-10 mb-8" key={currentStep}>
                {currentStep === 1 && (
                    <StepRoleSelection selectedRole={selectedRole} onSelect={setSelectedRole} />
                )}
                {currentStep === 2 && (
                    <StepProfileSetup profileData={profileData} onChange={setProfileData} />
                )}
                {currentStep === 3 && (
                    <StepTopics selectedTopics={selectedTopics} onToggle={handleTopicToggle} />
                )}
                {currentStep === 4 && (
                    <StepReady profileData={profileData} selectedRole={selectedRole} />
                )}
            </div>

            <div
                className="w-full max-w-lg flex items-center justify-between gap-4 relative z-10 pt-4 pb-6"
                style={{ animation: 'fadeSlideUp 0.5s ease-out 0.2s both' }}
            >
                {currentStep > 1 && currentStep < 4 ? (
                    <button
                        type="button"
                        onClick={handleBack}
                        className={cn(
                            'flex items-center gap-2 rounded-xl border border-dark-border px-5 py-3 text-sm font-medium text-white transition-all duration-250 cursor-pointer',
                            'hover:border-primary-500/40 hover:bg-dark-card-hover active:scale-[0.98]'
                        )}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                ) : (
                    <div />
                )}

                {currentStep < 4 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className={cn(
                            'flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-semibold text-white transition-all duration-250 cursor-pointer',
                            'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500',
                            'hover:shadow-xl hover:shadow-primary-500/25 hover:brightness-110',
                            'active:scale-[0.98]',
                            'disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none'
                        )}
                    >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleFinish}
                        className={cn(
                            'w-full flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-base font-bold text-white transition-all duration-300 cursor-pointer',
                            'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500',
                            'hover:shadow-2xl hover:shadow-primary-500/30 hover:brightness-110 hover:scale-[1.02]',
                            'active:scale-[0.98]'
                        )}
                        style={{ animation: 'fadeSlideUp 0.6s ease-out 1.3s both' }}
                    >
                        <Rocket className="h-5 w-5" />
                        Go to Dashboard
                        <ArrowRight className="h-5 w-5" />
                    </button>
                )}
            </div>
        </div>
    )
}
