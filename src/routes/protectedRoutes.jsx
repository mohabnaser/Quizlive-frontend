import { DashboardLayout } from '@/layouts/DashboardLayout'
import { StudentLayout } from '@/layouts/StudentLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PlaceholderPage } from '@/components/shared/placeholder-page'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { TeacherDashboard } from '@/pages/dashboard/TeacherDashboard'
import { StudentDashboard } from '@/pages/dashboard/StudentDashboard'

export const protectedRoutes = [
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <TeacherDashboard /> },
            { path: 'quizzes', element: <PlaceholderPage title="My Quizzes" /> },
            { path: 'quiz-builder', element: <PlaceholderPage title="Quiz Builder" /> },
            { path: 'sessions', element: <PlaceholderPage title="Quiz Sessions" /> },
            { path: 'leaderboard', element: <PlaceholderPage title="Leaderboard" /> },
            { path: 'classes', element: <PlaceholderPage title="Classes" /> },
            { path: 'certificates', element: <PlaceholderPage title="Certificates" /> },
            { path: 'profile', element: <PlaceholderPage title="Profile" /> },
            { path: 'settings', element: <PlaceholderPage title="Settings" /> },
            { path: 'analytics', element: <PlaceholderPage title="Analytics" /> },
            { path: 'marketplace', element: <PlaceholderPage title="Marketplace" /> },
            { path: 'notifications', element: <PlaceholderPage title="Notifications" /> },
        ],
    },

    {
        path: '/student',
        element: <StudentLayout />,
        children: [
            { index: true, element: <StudentDashboard /> },
            { path: 'join', element: <PlaceholderPage title="Join Quiz" /> },
            { path: 'history', element: <PlaceholderPage title="Quiz History" /> },
            { path: 'leaderboard', element: <PlaceholderPage title="Leaderboard" /> },
            { path: 'achievements', element: <PlaceholderPage title="Achievements" /> },
            { path: 'challenges', element: <PlaceholderPage title="Challenges" /> },
            { path: 'notifications', element: <PlaceholderPage title="Notifications" /> },
            { path: 'profile', element: <PlaceholderPage title="Profile" /> },
            { path: 'settings', element: <PlaceholderPage title="Settings" /> },
        ],
    },

    {
        path: '/admin',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <PlaceholderPage title="Admin Panel" /> },
        ],
    },

    {
        element: <AuthLayout />,
        children: [
            { path: '/login', element: <LoginPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/onboarding', element: <OnboardingPage /> },
        ],
    },
]
