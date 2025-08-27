import { useReducer } from 'react'

export const useCreateState = <T extends Record<string | number, unknown>>(
  initialState: T
) => {
  return useReducer((prev: T, next: Partial<T>) => ({ ...prev, ...next }), initialState)
}
