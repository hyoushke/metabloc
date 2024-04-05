export type SignInRequestDto = {
  email: string
  password: string
}

export type AuthResponseDto = {
  accessToken: string
  refreshToken: string
}

export type AuthResponseError = {
  message: string
  status: number
}
