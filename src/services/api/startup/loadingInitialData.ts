import { invoke } from '@tauri-apps/api/core'
import type { ResponseService } from '~/types/services'

export type LoadingInitialDataResponse = null

export async function loadingInitialDataService(): Promise<
  ResponseService<LoadingInitialDataResponse>
> {
  return await invoke('loading_initial_data')
}
