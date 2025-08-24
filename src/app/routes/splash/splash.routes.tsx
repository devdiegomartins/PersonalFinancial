import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { SplashLayout } from '~/app/layouts/SplashLayout'
import { LazySplashPage } from '~/app/pages/PageHelper'
import { Loading } from '~/ui/containers/Loading'

export const splashRoutes: RouteObject[] = [
  {
    path: '/',
    element: <SplashLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazySplashPage />
          </Suspense>
        ),
      },
    ],
  },
]
