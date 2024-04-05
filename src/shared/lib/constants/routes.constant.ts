export const ROUTES = {
  HOME: '',
  AUTH: '/auth',
} as const

export type RoutesType = keyof typeof ROUTES
