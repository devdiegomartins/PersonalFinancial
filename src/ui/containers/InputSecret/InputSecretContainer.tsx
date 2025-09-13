import { Button } from '~/ui/components/Button/ButtonComponent'
import { Icon } from '~/ui/components/Icon/IconComponent'
import { Input } from '~/ui/components/input/InputComponent'
import { Tooltip } from '~/ui/components/Tooltip/TooltipComponent'

export const InputSecretContainer = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div className="flex-1">
        <Input
          placeholder="Senha mestra"
          prepend={
            <Tooltip value="Copiar para área de transferência">
              <Button variant="ghost">
                <Icon name="RiClipboardLine" />
              </Button>
            </Tooltip>
          }
        />
      </div>
      <Tooltip value="Gerar nova chave mestra" variant="primary">
        <Button>
          <Icon name="RiRefreshLine" />
        </Button>
      </Tooltip>
    </div>
  )
}
