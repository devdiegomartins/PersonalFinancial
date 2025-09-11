import { addons } from '@storybook/manager-api'
import { personalFinanceDark } from './theme'

addons.setConfig({
  theme: personalFinanceDark,
  panelPosition: 'right',
  enableShortcuts: true,
})
