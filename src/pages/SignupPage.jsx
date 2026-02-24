import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Zap, ArrowRight, Check, User, Mail, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'


function GoogleIcon({ className }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    )
}


function FloatingParticles() {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full bg-accent-500/20 blur-sm"
                    style={{
                        width: `${4 + Math.random() * 6}px`,
                        height: `${4 + Math.random() * 6}px`,
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                        animation: `float ${5 + Math.random() * 4}s ease-in-out infinite`,
                        animationDelay: `${i * 0.8}s`,
                    }}
                />
            ))}
        </div>
    )
}


function getPasswordStrength(password) {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
}

function PasswordStrengthBar({ password }) {
    const strength = getPasswordStrength(password)
    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent']
    const colors = ['', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-emerald-400']
    const textColors = ['', 'text-red-400', 'text-orange-400', 'text-yellow-400', 'text-green-400', 'text-emerald-400']

    if (!password) return null

    return (
        <div className="mt-3 space-y-2 animate-fade-in">
            <div className="flex gap-1.5">
                {[1, 2, 3, 4, 5].map((level) => (
                    <div
                        key={level}
                        className={cn(
                            'h-1 flex-1 rounded-full transition-all duration-500',
                            level <= strength ? colors[strength] : 'bg-dark-border/50'
                        )}
                    />
                ))}
            </div>
            <p className={cn('text-[11px] font-medium transition-colors', textColors[strength])}>
                {labels[strength]}
            </p>
        </div>
    )
}


function PasswordRequirements({ password }) {
    if (!password) return null

    const requirements = [
        { label: 'At least 8 characters', met: password.length >= 8 },
        { label: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'Contains a number', met: /[0-9]/.test(password) },
    ]

    return (
        <div className="mt-3 space-y-1.5 animate-fade-in">
            {requirements.map((req) => (
                <div key={req.label} className="flex items-center gap-2">
                    <div className={cn(
                        'flex h-4 w-4 items-center justify-center rounded-full transition-all duration-300',
                        req.met ? 'bg-green-500/20' : 'bg-dark-border/30'
                    )}>
                        <Check className={cn(
                            'h-2.5 w-2.5 transition-all duration-300',
                            req.met ? 'text-green-400' : 'text-dark-muted/40'
                        )} />
                    </div>
                    <span className={cn(
                        'text-[11px] transition-colors duration-300',
                        req.met ? 'text-green-400/80' : 'text-dark-muted/50'
                    )}>
                        {req.label}
                    </span>
                </div>
            ))}
        </div>
    )
}

export function SignupPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedField, setFocusedField] = useState(null)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword
    const isFormValid = formData.fullName && formData.email && formData.password.length >= 8 && passwordsMatch && agreedToTerms

    const handleSignUp = async (e) => {
        e.preventDefault()
        if (!isFormValid) return
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        setIsLoading(false)
        navigate('/onboarding')
    }

    const handleGoogleAuth = async () => {
        setIsLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1200))
        setIsLoading(false)
        navigate('/onboarding')
    }

    return (
        <div className="flex flex-col items-center px-4 py-8 sm:py-12 min-h-screen justify-center relative">
            <FloatingParticles />

            <Link to="/" className="flex items-center gap-3 mb-10 group relative z-10">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-lg shadow-primary-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary-500/50">
                    <Zap className="h-5.5 w-5.5 text-white" />
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">QuizLive</span>
            </Link>

            <div className="relative w-full max-w-[460px] z-10">
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-accent-500/50 via-primary-600/30 to-accent-500/50 opacity-60 blur-[1px]" />
                <div className="absolute -inset-[0.5px] rounded-2xl bg-gradient-to-b from-dark-border/80 to-dark-border/30" />

                <div className="relative rounded-2xl bg-dark-card/95 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl shadow-primary-900/20">
                    <div className="text-center mb-8">
                        <h1 className="text-[26px] font-bold text-white mb-2 tracking-tight">Create your account</h1>
                        <p className="text-sm text-dark-muted leading-relaxed">
                            Start creating engaging quizzes in minutes
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleAuth}
                        disabled={isLoading}
                        className={cn(
                            'w-full flex items-center justify-center gap-3 rounded-xl border border-dark-border bg-surface-850 px-4 py-3.5',
                            'text-sm font-medium text-white transition-all duration-250',
                            'hover:border-primary-500/40 hover:bg-dark-card-hover hover:shadow-lg hover:shadow-primary-900/10',
                            'active:scale-[0.98]',
                            'disabled:opacity-50 disabled:pointer-events-none',
                            'cursor-pointer'
                        )}
                    >
                        <GoogleIcon className="h-5 w-5" />
                        Continue with Google
                    </button>

                    <div className="relative flex items-center my-7">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
                        <span className="mx-4 text-[11px] font-semibold tracking-[0.16em] text-dark-muted uppercase select-none">
                            Or sign up with email
                        </span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-dark-border to-transparent" />
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4.5">
                        <div>
                            <label htmlFor="signup-name" className="block text-[13px] font-semibold text-white mb-2">
                                Full name
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-dark-muted/50 pointer-events-none" />
                                <input
                                    id="signup-name"
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => updateField('fullName', e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Mohab Naser"
                                    autoComplete="name"
                                    required
                                    className={cn(
                                        'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                        focusedField === 'name'
                                            ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                            : 'border-dark-border hover:border-dark-border/80'
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signup-email" className="block text-[13px] font-semibold text-white mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-dark-muted/50 pointer-events-none" />
                                <input
                                    id="signup-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => updateField('email', e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="name@company.com"
                                    autoComplete="email"
                                    required
                                    className={cn(
                                        'w-full rounded-xl border bg-surface-850 pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                        focusedField === 'email'
                                            ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                            : 'border-dark-border hover:border-dark-border/80'
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="signup-password" className="block text-[13px] font-semibold text-white mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-dark-muted/50 pointer-events-none" />
                                <input
                                    id="signup-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={(e) => updateField('password', e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    required
                                    className={cn(
                                        'w-full rounded-xl border bg-surface-850 pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                        focusedField === 'password'
                                            ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                            : 'border-dark-border hover:border-dark-border/80'
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/5"
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                                </button>
                            </div>
                            <PasswordStrengthBar password={formData.password} />
                            <PasswordRequirements password={formData.password} />
                        </div>

                        <div>
                            <label htmlFor="signup-confirm" className="block text-[13px] font-semibold text-white mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-[16px] w-[16px] text-dark-muted/50 pointer-events-none" />
                                <input
                                    id="signup-confirm"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                                    onFocus={() => setFocusedField('confirm')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Re-enter your password"
                                    autoComplete="new-password"
                                    required
                                    className={cn(
                                        'w-full rounded-xl border bg-surface-850 pl-11 pr-12 py-3.5 text-sm text-white placeholder:text-dark-muted/50 outline-none transition-all duration-250',
                                        formData.confirmPassword && !passwordsMatch
                                            ? 'border-red-500/60 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]'
                                            : focusedField === 'confirm'
                                                ? 'border-primary-500 shadow-[0_0_0_3px_rgba(124,31,255,0.1)] bg-surface-850/80'
                                                : 'border-dark-border hover:border-dark-border/80'
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white transition-colors cursor-pointer p-1 rounded-lg hover:bg-white/5"
                                    tabIndex={-1}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                                </button>
                            </div>
                            {formData.confirmPassword && !passwordsMatch && (
                                <p className="mt-2 text-[11px] text-red-400 animate-fade-in">Passwords do not match</p>
                            )}
                            {passwordsMatch && formData.confirmPassword && (
                                <p className="mt-2 text-[11px] text-green-400 flex items-center gap-1 animate-fade-in">
                                    <Check className="h-3 w-3" /> Passwords match
                                </p>
                            )}
                        </div>

                        <div className="flex items-start gap-3 pt-1">
                            <button
                                type="button"
                                onClick={() => setAgreedToTerms(!agreedToTerms)}
                                className={cn(
                                    'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-250 cursor-pointer',
                                    agreedToTerms
                                        ? 'bg-primary-500 border-primary-500 shadow-md shadow-primary-500/20'
                                        : 'border-dark-border bg-surface-850 hover:border-primary-500/40'
                                )}
                            >
                                {agreedToTerms && <Check className="h-3 w-3 text-white" />}
                            </button>
                            <p className="text-[12px] text-dark-muted leading-relaxed">
                                I agree to the{' '}
                                <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
                                    Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-primary-400 hover:text-primary-300 underline underline-offset-2 transition-colors">
                                    Privacy Policy
                                </a>
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !isFormValid}
                            className={cn(
                                'relative w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all duration-250 mt-1',
                                'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500',
                                'hover:shadow-xl hover:shadow-primary-500/25 hover:brightness-110',
                                'active:scale-[0.98]',
                                'disabled:opacity-40 disabled:pointer-events-none disabled:shadow-none',
                                'cursor-pointer'
                            )}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-[18px] w-[18px] animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <p className="mt-8 text-sm text-dark-muted relative z-10">
                Already have an account?{' '}
                <Link
                    to="/login"
                    className="font-semibold text-primary-400 hover:text-primary-300 transition-colors underline underline-offset-4 decoration-primary-400/30 hover:decoration-primary-300/50"
                >
                    Sign in
                </Link>
            </p>

            <div className="mt-6 flex items-center gap-6 text-xs text-dark-muted/60 relative z-10">
                <a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a>
                <span className="text-dark-border">·</span>
                <a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a>
                <span className="text-dark-border">·</span>
                <a href="#" className="hover:text-white transition-colors duration-200">Help Center</a>
            </div>
        </div>
    )
}
