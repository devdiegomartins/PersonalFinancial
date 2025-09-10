import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { FirstAccessLayout } from '~/app/layouts/FirstAccessLayout'
import {
  LazyFirstAccessCreateProfilePage,
  LazyFirstAccessSecretPage,
} from '~/app/pages/PageHelper'
import { Loading } from '~/ui/containers/Loading'

export const firstAccessRoutes: RouteObject[] = [
  {
    path: '/first-access',
    element: <FirstAccessLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyFirstAccessCreateProfilePage />
          </Suspense>
        ),
      },
      {
        path: 'secret',
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyFirstAccessSecretPage />
          </Suspense>
        ),
      },
    ],
  },
]
