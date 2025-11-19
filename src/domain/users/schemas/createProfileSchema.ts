import { z } from 'zod'

export const createProfileSchema = z
  .object({
    name: z.string().min(1, 'fields.required_name'),
    lastName: z.string().min(1, 'fields.required_lastName'),
    email: z
      .string()
      .min(1, 'fields.required_email')
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'fields.invalid_email'),
    id: z.string().min(1, 'fields.required_id'),
    password: z.string().min(6, 'fields.password_min_length'),
    confirmPassword: z.string().min(1, 'fields.required_confirmPassword'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'fields.passwords_do_not_match',
    path: ['confirmPassword'],
  })

export type CreateProfileFormData = z.infer<typeof createProfileSchema>
