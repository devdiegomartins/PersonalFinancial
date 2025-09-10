import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { AuthLayout } from '~/app/layouts/AuthLayout'
import { LazyLoginPage, LazyRecoverPage, LazyResetPage } from '~/app/pages/PageHelper'
import { Loading } from '~/ui/containers/Loading'

export const authRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyLoginPage />
          </Suspense>
        ),
      },
      {
        path: 'recover',
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyRecoverPage />
          </Suspense>
        ),
      },
      {
        path: 'reset',
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyResetPage />
          </Suspense>
        ),
      },
    ],
  },
]
