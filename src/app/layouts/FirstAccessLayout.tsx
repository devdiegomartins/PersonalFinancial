import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'
import { useText } from '~/shared/hooks/useText/useText'
import { BrandAsset } from '~/ui/assets/BrandAsset'
import { Box } from '~/ui/components/Box/BoxComponent'
import { Text } from '~/ui/components/Text/TextComponent'

export const FirstAccessLayout = () => {
  const [tApp] = useText(['app'])
  useWindowSettings('user')

  return (
    <div className="flex justify-center w-full py-8">
      <Box className="flex flex-col w-11/12 sm:w-3/6 md:3/5 lg:2/6" variant="elevated">
        <div className="flex flex-col gap-2 items-center justify-center w-full p-8">
          <BrandAsset size={120} />

          <div>
            <Text element="h1" style="heading32" align="center">
              {tApp('title')}
            </Text>

            <Text element="p" style="caption" align="center">
              {tApp('slogan')}
            </Text>
          </div>
        </div>

        <Outlet />
      </Box>
    </div>
  )
}
