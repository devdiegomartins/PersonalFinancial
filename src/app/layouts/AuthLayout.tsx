import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'

export const AuthLayout = () => {
  useWindowSettings('user')
  return <Outlet />
}
