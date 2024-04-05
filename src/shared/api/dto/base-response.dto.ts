export type BaseResponse<T> = {
  data: T
  errors: string[]
  status: number
}
