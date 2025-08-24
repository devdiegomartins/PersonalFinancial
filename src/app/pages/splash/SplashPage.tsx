import { BrandAsset } from '~/ui/assets/BrandAsset'
import { Text } from '~/ui/components/Text/TextComponent'

export const SplashPage = () => {
  return (
    <div className="flex flex-col gap-4 items-stretch justify-between h-full bg-amber-500">
      <div className="flex flex-row gap-4 items-center w-full ">
        <BrandAsset size={90} />

        <Text element="h1" style="heading32">
          Texto novo
        </Text>
      </div>

      <div>Progress Location</div>
    </div>
  )
}
