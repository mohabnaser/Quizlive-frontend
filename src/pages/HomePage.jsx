import {
    Zap,
    BrainCircuit,
    Trophy,
    ShieldCheck,
    ArrowRight,
    Play,
    Share2,
    BarChart3,
    Users,
    Clock,
    CheckCircle2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { cn } from '@/lib/utils'
import Example from '@/assets/Screenshot 2026-02-21 070232.png'


function HeroSection() {
    return (
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-primary-600/10 blur-[120px]" />
                <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-accent-500/8 blur-[100px]" />
            </div>

            <Container className="relative z-10">
                <div className="flex flex-col items-center text-center">
                    <Badge className="mb-6 gap-1.5 px-4 py-1.5 text-xs animate-fade-in">
                        <Zap className="h-3 w-3" />
                        Now with Interactive V2.0 Suite
                    </Badge>

                    <h1 className="max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl animate-slide-up">
                        The Interactive{' '}
                        <span className="text-gradient">Quiz Platform</span>
                    </h1>

                    <p className="mt-6 max-w-2xl text-base text-dark-muted leading-relaxed sm:text-lg animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Engage classrooms and teams with AI-powered quizzes, live polls,
                        and instant feedback. No coding required.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Button variant="cta" size="lg" className="gap-2 rounded-full px-8">
                            <Zap className="h-4 w-4" />
                            Create Quiz
                        </Button>
                        <div className="flex items-center gap-2 rounded-full border border-dark-border bg-dark-card px-2 py-1.5">
                            <input
                                type="text"
                                placeholder="Enter game code"
                                className="bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-dark-muted outline-none w-36 sm:w-44"
                            />
                            <Button variant="primary" size="sm" className="rounded-full px-5">
                                Join
                            </Button>
                        </div>
                    </div>

                    <div className="mt-14 w-[800px] max-w-full animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <img
                            src={Example}
                            alt="Data Dashboard Preview"
                            className="w-full h-auto rounded-2xl shadow-2xl shadow-primary-500/20 border border-dark-border bg-dark-card/50"
                        />
                    </div>

                </div>
            </Container>
        </section>
    )
}

function StatItem({ value, label }) {
    return (
        <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-white">{value}</div>
            <div className="mt-1 text-xs text-dark-muted">{label}</div>
        </div>
    )
}


const features = [
    {
        icon: BrainCircuit,
        title: 'AI Generation',
        description: 'Turn any text, PDF, or website URL into a comprehensive quiz in seconds using our advanced LLM engine.',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
    },
    {
        icon: Trophy,
        title: 'Live Leaderboards',
        description: 'Create excitement with real-time rankings, streak animations, and competitive music themes for live engagement.',
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Proctoring',
        description: 'Ensure assessment integrity with browser locking, tab-switch monitoring, and randomization options.',
        color: 'text-green-400',
        bg: 'bg-green-500/10',
    },
    {
        icon: BarChart3,
        title: 'Rich Analytics',
        description: 'Gain deep insights into learner performance with detailed reports, completion rates, and knowledge gap analysis.',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
    },
    {
        icon: Users,
        title: 'Team Collaboration',
        description: 'Organize classes, share quizzes, and collaborate with colleagues through shared workspaces and team folders.',
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
    },
    {
        icon: Clock,
        title: 'Instant Feedback',
        description: 'Provide real-time feedback with explanations, correct answers, and personalized learning recommendations.',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
    },
]

function FeaturesSection() {
    return (
        <Section id="features" background="alt">
            <Container>
                <div className="text-center mb-14">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Everything you need to engage
                    </h2>
                    <p className="text-dark-muted text-base sm:text-lg max-w-xl mx-auto">
                        Powerful features designed for educators, corporate trainers, and event organizers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature) => (
                        <Card key={feature.title} variant="solid" padding="lg" hover>
                            <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl mb-5', feature.bg)}>
                                <feature.icon className={cn('h-6 w-6', feature.color)} />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-sm text-dark-muted leading-relaxed">{feature.description}</p>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    )
}


const steps = [
    {
        step: 'STEP 1',
        title: 'Create',
        description: 'Build from scratch or paste any content to auto-generate questions instantly.',
        icon: Play,
        color: 'text-primary-400',
        bg: 'bg-primary-500/10',
    },
    {
        step: 'STEP 2',
        title: 'Share',
        description: 'Invite participants to join with a unique code, game PIN, or link – anytime, anywhere.',
        icon: Share2,
        color: 'text-accent-400',
        bg: 'bg-accent-500/10',
    },
    {
        step: 'STEP 3',
        title: 'Analyze',
        description: 'Get instant results, performance trends, and identify knowledge gaps to drive improvement.',
        icon: BarChart3,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
    },
]

function HowItWorksSection() {
    return (
        <Section>
            <Container>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-14 gap-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">How it works</h2>
                        <p className="text-dark-muted text-base">Get started in minutes. No complex setup required.</p>
                    </div>
                    <a href="#" className="text-primary-400 text-sm font-medium flex items-center gap-1 hover:underline">
                        View documentation <ArrowRight className="h-4 w-4" />
                    </a>
                </div>

                <div className="relative">
                    <div className="hidden lg:block absolute top-20 left-[16%] right-[16%] h-px bg-gradient-to-r from-primary-500/40 via-accent-500/40 to-cyan-500/40" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {steps.map((step) => (
                            <Card key={step.title} variant="solid" padding="lg" hover className="text-center relative">
                                <Badge variant="outline" className="mx-auto mb-5 text-[10px] tracking-widest uppercase">
                                    {step.step}
                                </Badge>
                                <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl mx-auto mb-5', step.bg)}>
                                    <step.icon className={cn('h-7 w-7', step.color)} />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                <p className="text-sm text-dark-muted leading-relaxed">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    )
}


function CTASection() {
    return (
        <section className="relative py-20 sm:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-cta" />
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-white/5 blur-[80px]" />
                <div className="absolute bottom-0 right-1/4 h-[200px] w-[200px] rounded-full bg-white/5 blur-[60px]" />
            </div>

            <Container className="relative z-10 text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                    Ready to gamify your learning?
                </h2>
                <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto mb-8">
                    Join over 1 million educators and companies using QuizGenius to make assessments fun.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        size="lg"
                        className="bg-white text-primary-700 hover:bg-white/90 rounded-full px-8 font-semibold shadow-xl"
                    >
                        Get Started for Free
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white hover:bg-white/10 rounded-full px-8"
                    >
                        Book a Demo
                    </Button>
                </div>
                <p className="mt-5 text-xs text-white/50">
                    No credit card required • Free trial for educators
                </p>
            </Container>
        </section>
    )
}


export function HomePage() {
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection />
        </>
    )
}
