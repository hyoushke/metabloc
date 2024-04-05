import { IconComponent } from '@shared/ui'

interface IHeaderProperties extends React.ComponentProps<'header'> {
  isAuth: boolean
  logout: () => void
}

export const Header = ({ isAuth, logout, ...props }: IHeaderProperties) => {
  return (
    <header className="bg-bg pt-5" {...props}>
      <div className="mx-auto flex w-[900px] max-w-[80%] items-center justify-between rounded-2xl bg-primary px-8 py-2">
        <IconComponent name="logo" width={84} height={60} />
        {isAuth && (
          <button
            type="button"
            className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-black transition-all hover:opacity-90"
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  )
}
