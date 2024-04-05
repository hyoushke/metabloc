import { authClient } from '@shared/api'
import type { AxiosResponse } from 'axios'

import type { AuthResponseDto, SignInRequestDto } from '../dto'
import { successAuth } from './success-auth'

export const signIn = async (payload: SignInRequestDto) => {
  try {
    const response = await authClient.post<
      AuthResponseDto,
      AxiosResponse<AuthResponseDto, SignInRequestDto>,
      SignInRequestDto
    >('/auth/login', payload)

    if (!response) throw new Error('Wrong email or password')

    successAuth(response.data.accessToken, response.data.refreshToken)
  } catch (error: any) {
    throw error
  }
}
