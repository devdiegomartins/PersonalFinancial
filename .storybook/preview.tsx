import { LanguageProvider } from '../src/shared/providers/Language/LanguageProvider'
import '../src/ui/styles/globals.css'
import { personalFinanceDark } from './theme'

type StoryFnLike = (args?: Record<string, unknown>) => JSX.Element
const withProviders = (Story: StoryFnLike) => {
  return (
    <LanguageProvider>
      <Story />
    </LanguageProvider>
  )
}

const preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    docs: { theme: personalFinanceDark },
  },
}

export default preview
