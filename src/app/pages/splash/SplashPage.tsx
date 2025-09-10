import { useEffect } from 'react'
import { useProcessInitialData } from '~/domain/app/hooks/useProcessInitialData'
import { useText } from '~/shared/hooks/useText/useText'
import { BrandAsset } from '~/ui/assets/BrandAsset'
import { Progress } from '~/ui/components/Progress/ProgressComponent'
import { Text } from '~/ui/components/Text/TextComponent'

export const SplashPage = () => {
  const [tApp] = useText(['app'])
  const { runProcess, loadingDescriptionText } = useProcessInitialData()

  useEffect(() => {
    runProcess()
  }, [])

  return (
    <div className="flex flex-col gap-4 items-stretch justify-between h-full p-10">
      <div className="flex flex-row gap-4 items-center justify-center w-full">
        <BrandAsset size={90} />

        <div>
          <Text element="h1" style="heading32">
            {tApp('title')}
          </Text>

          <Text element="p" style="caption">
            {tApp('slogan')}
          </Text>
        </div>
      </div>

      <div>
        <Progress indeterminate label="Carregando dados" />
        <Text align="center" element="p" style="overline">
          {loadingDescriptionText}
        </Text>
      </div>
    </div>
  )
}
