import { useChatStore } from '@entities/chat'
import { signUp } from '@entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  userEmailSchema,
  userNameSchema,
  userPasswordSchema,
} from '@shared/lib/constants'
import { ErrorOutput, TextInput } from '@shared/ui'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

export const signUpSchema = z.object({
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
})
export type SignUpData = z.infer<typeof signUpSchema>

export const SignUpForm = () => {
  const { setIsAuth } = useChatStore()
  const navigate = useNavigate()

  const methods = useForm<SignUpData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(signUpSchema),
  })

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = methods

  const onSubmitHandler: SubmitHandler<SignUpData> = async (data) => {
    try {
      await signUp(data)
      setIsAuth(true)
      navigate('/')
    } catch {
      setError('root', { type: 'custom', message: 'Unexpected error' })
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="mb-2 space-y-4">
        <div className="space-y-2">
          <TextInput name="name" placeholder="Name" />
          <TextInput name="email" placeholder="Email" type="email" autoComplete="email" />
          <TextInput
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </div>
        <button
          type="submit"
          className="block w-full rounded-xl bg-primary p-2 text-white transition-all hover:opacity-90"
        >
          Get started
        </button>
        <ErrorOutput message={errors.root?.message} className="text-center" />
      </form>
    </FormProvider>
  )
}
