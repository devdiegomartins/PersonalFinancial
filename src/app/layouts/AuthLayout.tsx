import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'
import { Avatar } from '~/ui/components/Avatar/AvatarComponent'
import { Box } from '~/ui/components/Box/BoxComponent'
import { Text } from '~/ui/components/Text/TextComponent'

export const AuthLayout = () => {
  useWindowSettings('user')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Box className="flex flex-col min-w-2/5">
        <div className="flex flex-col gap-2 items-center justify-center w-full p-8">
          <Avatar size="3xl" name="User Name" />

          <Text element="h1" style="heading32" align="center">
            User Name
          </Text>
        </div>

        <Outlet />
      </Box>
    </div>
  )
}
