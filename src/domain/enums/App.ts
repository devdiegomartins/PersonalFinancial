export const AppStatusEnum = {
  INITIALIZING: 'initializing',
  LOADING_USERS: 'loading_users',
  LOADING_DATA: 'loading_data',
  FIRST_ACCESS: 'first_access',
  READY: 'ready',
} as const

export type AppStatusEnumType = (typeof AppStatusEnum)[keyof typeof AppStatusEnum]
