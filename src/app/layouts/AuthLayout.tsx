import { Outlet } from 'react-router-dom'
import { useWindowSettings } from '~/domain/window/hooks/useWindowSettings'
import { useText } from '~/shared/hooks/useText/useText'
import { BrandAsset } from '~/ui/assets/BrandAsset'
import { Text } from '~/ui/components/Text/TextComponent'

export const AuthLayout = () => {
  const [tApp] = useText(['app'])
  useWindowSettings('user')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-slate-800 shadow-2xl rounded-2xl flex flex-col min-w-2/5">
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
      </div>
    </div>
  )
}
