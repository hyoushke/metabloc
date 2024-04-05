import clsx from 'clsx'
import { type DetailedHTMLProps, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { ErrorOutput } from '../error'
import { IconComponent } from '../icon'

interface IInputProperties
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string
  label?: string
  type?: 'email' | 'password' | 'text'
}

export const TextInput = (props: IInputProperties) => {
  const {
    label,
    name,
    required,
    placeholder,
    autoComplete,
    className,
    type = 'text',
  } = props

  const [isOpenPass, setIsOpenPass] = useState(false)

  function toggleIsOpen() {
    setIsOpenPass((previous) => !previous)
  }

  const {
    register,
    formState: { errors },
  } = useFormContext()

  const inputType = type === 'password' ? (isOpenPass ? 'text' : 'password') : type

  return (
    <div>
      <div className={className}>
        {label && (
          <label
            className={clsx(
              'mb-1 block w-fit',
              errors[name] ? 'text-red' : 'text-gray-48',
            )}
            htmlFor={name}
          >
            {label}
            {required && <span className="text-red ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            {...register(name)}
            className={clsx(
              'border-gray-16 w-full rounded-lg border border-solid py-2 pl-3 pr-8 text-base text-black',
              errors[name] && 'border-red',
            )}
            placeholder={placeholder}
            autoComplete={autoComplete ?? 'off'}
            type={inputType}
          />
          {type === 'password' && (
            <button
              className="r-5 absolute right-3 top-1/2 z-10 translate-y-[-50%] p-1"
              type="button"
              onClick={toggleIsOpen}
            >
              <IconComponent
                width={20}
                height={20}
                name={isOpenPass ? 'eyeClosed' : 'eyeOpen'}
              />
            </button>
          )}
        </div>
      </div>
      <ErrorOutput
        message={errors[name]?.message as string | undefined}
        className="mt-1"
      />
    </div>
  )
}
