import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert } from './AlertComponent'

const meta = {
  title: 'UI/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'success',
    title: 'Alert',
  },
}
