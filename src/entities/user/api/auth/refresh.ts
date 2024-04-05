import { authClient } from '@shared/api'
import { LocalStorageKeys } from '@shared/lib/enums'
import type { AxiosResponse } from 'axios'

import type { AuthResponseDto, RefreshRequestDto } from '../dto'

export const refreshToken = async () => {
  try {
    const oldRefreshToken = localStorage.getItem(LocalStorageKeys.refreshToken)
    if (!oldRefreshToken) throw new Error('Incorrect refresh token')
    const response = await authClient.get<
      AuthResponseDto,
      AxiosResponse<AuthResponseDto, RefreshRequestDto>,
      RefreshRequestDto
    >(`/auth/refresh?refreshToken=${oldRefreshToken}`)

    if (!response) throw new Error('Error on refresh')

    localStorage.setItem(LocalStorageKeys.accessToken, response.data.accessToken)
    localStorage.setItem(LocalStorageKeys.refreshToken, response.data.refreshToken)
  } catch (error: any) {
    throw error
  }
}
