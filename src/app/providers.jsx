import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/theme/theme-provider'
import { SocketProvider } from '@/services/socket/socketProvider'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { staleTime: 5 * 60 * 1000, retry: 1, refetchOnWindowFocus: false },
    },
})

export function Providers({ children }) {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="dark">
                <SocketProvider>
                    {children}
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            style: { background: '#12122a', border: '1px solid #2a2a4a', color: '#e2e2f0' },
                        }}
                    />
                </SocketProvider>
            </ThemeProvider>
        </QueryClientProvider>
    )
}
