import { DashboardLayout } from '@/layouts/DashboardLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { PlaceholderPage } from '@/components/shared/placeholder-page'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'

export const protectedRoutes = [
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            { index: true, element: <PlaceholderPage title="Dashboard" /> },
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
        ],
    },
]
