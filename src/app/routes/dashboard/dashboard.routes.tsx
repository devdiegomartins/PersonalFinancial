import { Suspense } from 'react'
import type { RouteObject } from 'react-router-dom'
import { DashboardLayout } from '~/app/layouts/DashboardLayout'
import { Loading } from '~/ui/containers/Loading'
import { LazyHomePage } from '../../pages/PageHelper'

export const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loading.Window />}>
            <LazyHomePage />
          </Suspense>
        ),
      },
    ],
  },
]
