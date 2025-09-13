import { Alert } from '~/ui/components/Alert/AlertComponent'
import { Button } from '~/ui/components/Button/ButtonComponent'
import { InputSecretContainer } from '~/ui/containers/InputSecret/InputSecretContainer'

export const SecretPage = () => {
  return (
    <div className="gap-4 flex flex-col">
      <Alert
        variant="info"
        title="Segurança dos seus dados"
        customDescription={
          <div className="flex flex-col gap-2">
            <p>
              Todos os dados armazenados no aplicativo são <strong>criptografados</strong>{' '}
              utilizando a sua senha mestra.
            </p>
            <p>
              Para garantir a segurança dos seus dados, é fundamental que você anote e
              guarde sua senha mestra em um local seguro, pois ela não poderá ser
              recuperada caso seja esquecida.
            </p>
          </div>
        }
      />

      <form className="flex flex-col gap-4">
        <InputSecretContainer />
      </form>

      <Button>Continuar</Button>
    </div>
  )
}
