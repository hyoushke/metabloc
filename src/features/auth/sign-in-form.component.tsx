import { useChatStore } from '@entities/chat'
import { signIn } from '@entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { userEmailSchema, userPasswordSchema } from '@shared/lib/constants'
import { ErrorOutput, TextInput } from '@shared/ui'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export const signInSchema = z.object({
  email: userEmailSchema,
  password: userPasswordSchema,
})
export type SignInData = z.infer<typeof signInSchema>

export const SignInForm = () => {
  const { setIsAuth } = useChatStore()
  const navigate = useNavigate()

  const methods = useForm<SignInData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(signInSchema),
  })

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods

  const onSubmitHandler: SubmitHandler<SignInData> = async (data) => {
    try {
      await signIn(data)
      setIsAuth(true)
      navigate('/')
    } catch {
      setError('root', { type: 'custom', message: 'Wrong email or password' })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-2 space-y-4">
        <div className="space-y-2">
          <TextInput name="email" placeholder="Email" type="email" autoComplete="email" />
          <TextInput
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="block w-full rounded-xl bg-primary p-2 text-white transition-all hover:opacity-90"
        >
          Login
        </button>
        <ErrorOutput message={errors.root?.message} className="text-center" />
      </form>
    </FormProvider>
  )
}
