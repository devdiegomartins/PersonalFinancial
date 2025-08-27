import { create, type StoreApi, type UseBoundStore } from 'zustand'
import { devtools, subscribeWithSelector, type DevtoolsOptions } from 'zustand/middleware'

/**
 * Generic store creator applying common middlewares (subscribeWithSelector + devtools)
 * and exposing a unified API plus a convenience `.use` method that defaults to shallow comparison.
 */
// Extend base store type with the overload added by subscribeWithSelector middleware
export interface SubscribeSelector<T extends object> {
  subscribe: <U>(
    selector: (state: T) => U,
    listener: (selected: U, prevSelected: U) => void,
    options?: { equalityFn?: (a: U, b: U) => boolean; fireImmediately?: boolean }
  ) => () => void
}

export type CreatedStore<T extends object> = UseBoundStore<
  StoreApi<T> & SubscribeSelector<T>
>

type Initializer<T extends object> =
  | T
  | ((set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T)

export const createStore = <T extends object>(
  name: string,
  initial: Initializer<T>,
  options: Omit<DevtoolsOptions, 'name'> = {}
): CreatedStore<T> => {
  const initializer = (
    typeof initial === 'function'
      ? (initial as (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T)
      : () => initial
  ) as (set: StoreApi<T>['setState'], get: StoreApi<T>['getState']) => T

  const store = create<T>()(
    devtools(
      subscribeWithSelector((set, get) => initializer(set, get)),
      { ...options, name }
    )
  )
  return store as CreatedStore<T>
}
