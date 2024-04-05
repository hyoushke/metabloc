/* eslint-disable import/no-extraneous-dependencies */
import { SignInForm, SignUpForm } from '@features/auth'
import {
  userEmailSchema,
  userNameSchema,
  userPasswordSchema,
} from '@shared/lib/constants'
import { IconComponent } from '@shared/ui'
import { useState } from 'react'
import { z } from 'zod'

export const signInSchema = z.object({
  name: userNameSchema,
  email: userEmailSchema,
  password: userPasswordSchema,
})
export type SignInData = z.infer<typeof signInSchema>

export const AuthBlock = () => {
  const [formType, setFormType] = useState<'signin' | 'signup'>('signin')

  return (
    <div className="flex md:min-w-[370px]">
      <div className="flex-1 space-y-4 rounded-2xl p-4 text-bot-msg-text">
        {formType === 'signin' ? (
          <>
            <div className="mb-2 flex items-center justify-center space-x-2 text-xl text-black">
              <IconComponent name="botHead" />
              <span>Sign in</span>
            </div>
            <SignInForm />
            <div className="text-center text-sm text-gray">
              Don&apos;t have an account yet?{' '}
              <span
                className="cursor-pointer text-black hover:underline"
                onClick={() => setFormType('signup')}
              >
                Sign up!
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="mb-2 flex items-center justify-center space-x-2  text-xl text-black">
              <IconComponent name="botHead" />
              <span>Sign up</span>
            </div>
            <SignUpForm />
            <div className="text-center text-sm text-gray">
              Already have an account?{' '}
              <span
                className="cursor-pointer text-black hover:underline"
                onClick={() => setFormType('signin')}
              >
                Sign in!
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
