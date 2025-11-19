import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import {
  type CreateProfileFormData,
  createProfileSchema,
} from '../schemas/createProfileSchema'

type UseCreateProfileProps = {
  service?: <D, R>(data?: D) => Promise<R>
  onMutationSuccess?: () => void
}

export const useCreateProfile = (props: UseCreateProfileProps = {}) => {
  const { service, onMutationSuccess } = props

  const { isPending, mutateAsync } = useMutation({
    mutationFn: service,
    onSuccess: () => {
      onMutationSuccess?.()
    },
  })

  const methods = useForm<CreateProfileFormData>({
    resolver: zodResolver(createProfileSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      id: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: CreateProfileFormData) {
    await mutateAsync(data)
  }

  return { ...methods, isPending, onSubmit }
}
