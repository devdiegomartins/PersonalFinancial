import { type InvokeArgs, invoke } from '@tauri-apps/api/core'

export async function get<Payload extends InvokeArgs, Response = unknown>(
  path: string,
  data?: Payload
): Promise<Response> {
  return await invoke<Response>(path, data)
}
