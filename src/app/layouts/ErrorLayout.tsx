import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'

export const ErrorLayout = () => {
  useWindowSettings('user')
  return <Outlet />
}
