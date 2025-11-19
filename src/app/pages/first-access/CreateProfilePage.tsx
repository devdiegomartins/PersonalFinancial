import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useCreateProfile } from '~/domain/users/hooks/useCreateProfile'
import { useText } from '~/shared/hooks/useText/useText'
import { Alert } from '~/ui/components/Alert/AlertComponent'
import { Button } from '~/ui/components/Button/ButtonComponent'
import { Input } from '~/ui/components/input/InputComponent'

export const CreateProfilePage = () => {
  const navigate = useNavigate()
  const [t, tFields, tButtons] = useText([
    'initialization.firstAccess',
    'fields',
    'common.buttons',
  ])
  const {
    isPending,
    control,
    handleSubmit,
    onSubmit,
    formState: { isValid },
  } = useCreateProfile({
    service: async data => {
      // TODO adicionar serviço para criação do perfil
    },
    onMutationSuccess: () => {
      navigate('/first-access/secret', { replace: true })
    },
  })

  return (
    <div className="flex flex-col gap-8">
      <Alert variant="info" title={t('title')} description={t('description')} />

      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={tFields('labels.name')}
                placeholder={tFields('placeholders.name')}
                {...field}
                disabled={isPending}
                required
                state={fieldState.error?.message ? 'danger' : 'default'}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={tFields('labels.lastName')}
                placeholder={tFields('placeholders.lastName')}
                {...field}
                disabled={isPending}
                required
                state={fieldState.error?.message ? 'danger' : 'default'}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={tFields('labels.email')}
              placeholder={tFields('placeholders.email')}
              {...field}
              disabled={isPending}
              type="email"
              required
              state={fieldState.error?.message ? 'danger' : 'default'}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="id"
          control={control}
          render={({ field, fieldState }) => (
            <Input
              label={tFields('labels.id')}
              placeholder={tFields('placeholders.id')}
              {...field}
              disabled={isPending}
              required
              state={fieldState.error?.message ? 'danger' : 'default'}
              helperText={fieldState.error?.message}
            />
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={tFields('labels.password')}
                placeholder={tFields('placeholders.password')}
                {...field}
                disabled={isPending}
                required
                showPasswordToggle
                type="password"
                state={fieldState.error?.message ? 'danger' : 'default'}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field, fieldState }) => (
              <Input
                label={tFields('labels.confirmPassword')}
                placeholder={tFields('placeholders.confirmPassword')}
                {...field}
                disabled={isPending}
                required
                showPasswordToggle
                type="password"
                state={fieldState.error?.message ? 'danger' : 'default'}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </div>

        <Button type="submit" disabled={!isValid}>
          {tButtons('continue')}
        </Button>
      </form>
    </div>
  )
}
