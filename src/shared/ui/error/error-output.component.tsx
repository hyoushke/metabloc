import clsx from 'clsx'

interface IErrorOutput {
  message?: string
  className?: string
}

export const ErrorOutput = ({ message, className }: IErrorOutput) => {
  return (
    message && <div className={clsx('text-sm text-red-600', className)}>{message}</div>
  )
}
