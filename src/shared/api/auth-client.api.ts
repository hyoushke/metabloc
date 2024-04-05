import { BASE_API_URL } from '@shared/lib/constants'
import axios, { HttpStatusCode } from 'axios'

const instance = axios.create({
  baseURL: BASE_API_URL,
})

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    ) {
      localStorage.clear()
      return
    }
    throw error
  },
)

export { instance as authClient }
