import { LanguageProvider } from './Language/LanguageProvider'
import { QueryProvider } from './QueryProvider'
import { RouterProvider } from './RouterProvider'

export const AppProvider = () => {
  return (
    <LanguageProvider>
      <QueryProvider>
        <RouterProvider />
      </QueryProvider>
    </LanguageProvider>
  )
}
