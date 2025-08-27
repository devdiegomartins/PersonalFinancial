import type { TimezoneLocales } from '~/domain/enums/Timezone'
import { createStore } from './create'

type AppStoreType = {
  isDrawerOpen: boolean
  timezone: TimezoneLocales | null
}

export const appStore = createStore<AppStoreType>('app_store', {
  isDrawerOpen: false,
  timezone: null,
})
