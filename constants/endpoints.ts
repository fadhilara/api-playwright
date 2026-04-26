export const ENDPOINTS = {
    carts: {
        byUser: (userId: number) => `/carts/user/${userId}`,
    },
    auth: {
        login: '/auth/login',
    },
} as const