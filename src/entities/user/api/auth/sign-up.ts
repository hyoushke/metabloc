/* eslint-disable sonarjs/no-useless-catch */
/* eslint-disable no-useless-catch */
import { authClient } from '@shared/api'
import type { AxiosResponse } from 'axios'

import type { AuthResponseDto, SignUpRequestDto } from '../dto'
import { successAuth } from './success-auth'

export const signUp = async (payload: SignUpRequestDto) => {
  try {
    const response = await authClient.post<
      AuthResponseDto,
      AxiosResponse<AuthResponseDto, SignUpRequestDto>,
      SignUpRequestDto
    >('/auth/register', payload)

    if (!response) throw new Error('Unexpected error')

    successAuth(response.data.accessToken, response.data.refreshToken)
  } catch (error) {
    throw error
  }
}
