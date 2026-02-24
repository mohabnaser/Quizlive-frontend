import { PublicLayout } from '@/layouts/PublicLayout'
import { HomePage } from '@/pages/HomePage'
import { PlaceholderPage } from '@/components/shared/placeholder-page'

export const publicRoutes = [
    {
        element: <PublicLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'pricing', element: <PlaceholderPage title="Pricing" /> },
            { path: 'about', element: <PlaceholderPage title="About" /> },
            { path: 'contact', element: <PlaceholderPage title="Contact" /> },
        ],
    },
]
