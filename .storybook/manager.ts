import { addons } from '@storybook/manager-api'
import { personalFinancialDark } from './theme'

addons.setConfig({
  theme: personalFinancialDark,
  panelPosition: 'right',
  enableShortcuts: true,
})
