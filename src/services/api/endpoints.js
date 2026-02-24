export const endpoints = {
    auth: {
        login: '/auth/login', register: '/auth/register',
        logout: '/auth/logout', refresh: '/auth/refresh', me: '/auth/me',
    },
    quizzes: {
        list: '/quizzes', create: '/quizzes',
        get: (id) => `/quizzes/${id}`, update: (id) => `/quizzes/${id}`,
        delete: (id) => `/quizzes/${id}`, publish: (id) => `/quizzes/${id}/publish`,
    },
    sessions: {
        create: '/sessions', join: (code) => `/sessions/join/${code}`,
        get: (id) => `/sessions/${id}`,
    },
    leaderboard: {
        get: (sessionId) => `/leaderboard/${sessionId}`, global: '/leaderboard/global',
    },
    users: { profile: '/users/profile', update: '/users/profile' },
    analytics: {
        dashboard: '/analytics/dashboard', quiz: (id) => `/analytics/quiz/${id}`,
    },
}
