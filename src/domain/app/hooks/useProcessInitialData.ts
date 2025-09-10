import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppStatusEnum, type AppStatusEnumType } from '~/domain/enums/App'
import { useCreateState } from '~/shared/hooks/useCreateState/useCreateState'
import { useText } from '~/shared/hooks/useText/useText'

const statusTextKey = {
  [AppStatusEnum.INITIALIZING]: 'initializing',
  [AppStatusEnum.LOADING_USERS]: 'loading_users',
  [AppStatusEnum.LOADING_DATA]: 'loading_data',
  [AppStatusEnum.FIRST_ACCESS]: 'first_access',
  [AppStatusEnum.READY]: 'ready',
}

export const useProcessInitialData = () => {
  const [state, dispatch] = useCreateState<{ status: AppStatusEnumType | null }>({
    status: null,
  })
  const [tAppStatus] = useText(['loading.app_status'])
  const navigate = useNavigate()

  const exec = {
    [AppStatusEnum.INITIALIZING]: initialSetup,
    [AppStatusEnum.LOADING_USERS]: () => {},
    [AppStatusEnum.LOADING_DATA]: () => {},
    [AppStatusEnum.FIRST_ACCESS]: () => {},
    [AppStatusEnum.READY]: readyToUse,
  }

  async function initialSetup() {
    setTimeout(() => {
      dispatch({ status: AppStatusEnum.READY })
    }, 1000)
  }

  async function readyToUse() {
    navigate('/auth', {
      replace: true,
    })
  }

  async function runProcess() {
    dispatch({ status: AppStatusEnum.INITIALIZING })
  }

  useEffect(() => {
    exec[state.status as AppStatusEnumType]?.()
  }, [state.status])

  return {
    runProcess,
    loadingDescriptionText: tAppStatus(
      statusTextKey[state.status as AppStatusEnumType] || 'initializing'
    ),
  }
}
