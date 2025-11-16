import { invoke } from '@tauri-apps/api/core'
import type { ResponseService } from '~/types/services'

export type LoadingInitialUsersResponse = {
  id: string
  name: string
  surname: string
  email: string
  login: string
  created_at: string
  updated_at: string
}

export async function loadingInitialUsersService(): Promise<
  ResponseService<LoadingInitialUsersResponse[]>
> {
  return await invoke('loading_users')
}
