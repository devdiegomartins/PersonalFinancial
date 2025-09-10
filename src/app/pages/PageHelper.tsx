import { lazyWithRetry } from '~/services/utils/lazyWithRetry'

//#region Splash Pages
export const LazySplashPage = lazyWithRetry(() =>
  import('./splash/SplashPage').then(module => ({
    default: module.SplashPage,
  }))
)

// #region Auth Pages
export const LazyLoginPage = lazyWithRetry(() =>
  import('./auth/LoginPage').then(module => ({
    default: module.LoginPage,
  }))
)

export const LazyRecoverPage = lazyWithRetry(() =>
  import('./auth/RecoverPage').then(module => ({
    default: module.RecoverPage,
  }))
)

export const LazyResetPage = lazyWithRetry(() =>
  import('./auth/ResetPage').then(module => ({
    default: module.ResetPage,
  }))
)

// #region Dashboard Pages
export const LazyHomePage = lazyWithRetry(() =>
  import('./dashboard/HomePage').then(module => ({
    default: module.HomePage,
  }))
)
