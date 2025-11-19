import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppStatusEnum, type AppStatusEnumType } from '~/domain/enums/App'
import { loadingInitialDataService } from '~/services/api/startup/loadingInitialData'
import { loadingInitialUsersService } from '~/services/api/startup/loadingInitialUsers'
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
    [AppStatusEnum.LOADING_USERS]: loadingUsers,
    [AppStatusEnum.LOADING_DATA]: () => {},
    [AppStatusEnum.FIRST_ACCESS]: firstAccess,
    [AppStatusEnum.READY]: readyToUse,
  }

  async function initialSetup() {
    try {
      await loadingInitialDataService()

      dispatch({ status: AppStatusEnum.LOADING_USERS })
    } catch (e: unknown) {
      console.error(e)
    }
  }

  async function loadingUsers() {
    try {
      const response = await loadingInitialUsersService()
      dispatch({
        status:
          response.data.length === 0 ? AppStatusEnum.FIRST_ACCESS : AppStatusEnum.READY,
      })
    } catch (e: unknown) {
      console.error(e)
    }
  }

  function firstAccess() {
    console.log('navegar para first access')
    navigate('/first-access', {
      replace: true,
    })
  }

  async function readyToUse() {}

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
