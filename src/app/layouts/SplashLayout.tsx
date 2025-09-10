import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'

export const SplashLayout = () => {
  useWindowSettings('initialize')
  return <Outlet />
}
