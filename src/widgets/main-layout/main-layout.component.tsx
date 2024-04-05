import { useChatStore } from '@entities/chat'
import { LocalStorageKeys } from '@shared/lib/enums'
import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { Header } from './header'
import { Main } from './main'

export interface IMainPageLayoutProperties extends React.ComponentProps<'main'> {}

export const MainLayout = () => {
  const { isAuth, setIsAuth } = useChatStore()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem(LocalStorageKeys.accessToken)
    localStorage.removeItem(LocalStorageKeys.refreshToken)
    setIsAuth(false)
    navigate('/auth')
  }

  useEffect(() => {
    if (localStorage.getItem(LocalStorageKeys.accessToken)) {
      setIsAuth(true)
    } else {
      setIsAuth(false)
    }
  }, [setIsAuth])

  return (
    <>
      <Header isAuth={isAuth} logout={logout} />
      <Main>
        <Outlet />
      </Main>
    </>
  )
}
