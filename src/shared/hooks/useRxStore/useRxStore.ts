import { useSyncExternalStore } from 'react'
import { shallow } from 'zustand/shallow'
import type { CreatedStore } from '~/stores/create'

export function useRxStore<T extends object, U>(
  store: CreatedStore<T>,
  selector: (state: T) => U,
  equalityFn: (a: U, b: U) => boolean = shallow
): U {
  return useSyncExternalStore(
    onChange =>
      store.subscribe(
        selector,
        (_sel, _prev) => {
          onChange()
        },
        { equalityFn }
      ),
    () => selector(store.getState()),
    () => selector(store.getState())
  )
}
