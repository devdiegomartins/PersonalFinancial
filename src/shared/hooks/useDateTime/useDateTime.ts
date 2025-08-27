import { DateTime } from 'luxon'
import { useCallback } from 'react'
import { appStore } from '~/stores/appStore'
import { useLanguage } from '../useLanguage/useLanguage'
import { useRxStore } from '../useRxStore/useRxStore'
import { useText } from '../useText/useText'
import type { FnFormatDateType } from './useDateTimeTypes'

export const useDateTime = () => {
  const [t] = useText(['format.datetime'])
  const { language } = useLanguage()

  const timezone = useRxStore(
    appStore,
    state => state.timezone,
    (a, b) => a === b
  )

  const formatUTCDate = useCallback<FnFormatDateType>(
    (date, format = t('datetime_short')) => {
      const dt =
        typeof date === 'string'
          ? DateTime.fromISO(date, { zone: 'utc' })
          : DateTime.fromJSDate(date, { zone: 'utc' })

      dt.setLocale(language)

      return timezone ? dt.setZone(timezone).toFormat(format) : dt.toFormat(format)
    },
    [timezone]
  )

  return { formatUTCDate }
}
