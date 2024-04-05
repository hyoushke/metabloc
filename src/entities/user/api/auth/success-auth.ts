import { LocalStorageKeys } from '@shared/lib/enums'
import toast from 'react-hot-toast'

export const successAuth = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(LocalStorageKeys.accessToken, accessToken)
  localStorage.setItem(LocalStorageKeys.refreshToken, refreshToken)

  toast.success('Successful authorization')
}
