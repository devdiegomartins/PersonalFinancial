import { create } from '@storybook/theming'

export const personalFinancialDark = create({
  base: 'dark',
  brandTitle: 'Personal Financial UI',
  brandUrl: 'https://github.com/devdiegomartins',
  brandTarget: '_blank',
  colorPrimary: '#3b82f6', // tailwind blue-500
  colorSecondary: '#10b981', // tailwind emerald-500
  appBg: '#0d1117',
  appContentBg: '#0f172a',
  appBorderColor: '#1e293b',
  appBorderRadius: 8,
  textColor: '#f1f5f9',
  textInverseColor: '#0f172a',
  barTextColor: '#cbd5e1',
  barSelectedColor: '#3b82f6',
  barBg: '#1e293b',
  inputBg: '#1e293b',
  inputBorder: '#334155',
  inputTextColor: '#f1f5f9',
  inputBorderRadius: 6,
})
