import type { TimezoneLocalesEnumType } from '~/domain/enums/Timezone'
import { createStore } from './create'

type AppStoreType = {
  isDrawerOpen: boolean
  timezone: TimezoneLocalesEnumType | null
}

export const appStore = createStore<AppStoreType>('app_store', {
  isDrawerOpen: false,
  timezone: null,
})
