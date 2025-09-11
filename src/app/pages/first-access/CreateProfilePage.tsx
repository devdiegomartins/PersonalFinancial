import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert } from '~/ui/components/Alert/AlertComponent'
import { Button } from '~/ui/components/Button/ButtonComponent'
import { Input } from '~/ui/components/input/InputComponent'

export const CreateProfilePage = () => {
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/first-access/secret', { replace: true })
  }

  return (
    <div className="flex flex-col gap-8">
      <Alert
        variant="info"
        title="Seu primeiro acesso"
        description="Em seu primeiro acesso é necessário realizar algumas configurações iniciais para o aplicativo. Vamos começar com os seus dados de perfil."
      />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome" />
          <Input label="Último nome" />
        </div>

        <Input label="Email" />

        <Input label="ID" />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Senha" type="password" showPasswordToggle />
          <Input label="Repita a Senha" type="password" showPasswordToggle />
        </div>

        <Button type="submit">Continuar</Button>
      </form>
    </div>
  )
}
