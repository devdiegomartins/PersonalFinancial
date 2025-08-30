import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from './ProgressComponent'

const meta = {
  title: 'UI/Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Indicador de progresso linear (barra) ou circular. Suporta tamanhos, tons e modo indeterminate (intermitente).',
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['bar', 'circular'] },
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] },
    tone: {
      control: { type: 'select' },
      options: ['primary', 'accent', 'success', 'warning', 'destructive', 'muted'],
    },
    value: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
    indeterminate: { control: 'boolean' },
    showLabel: { control: 'boolean' },
  },
  args: {
    variant: 'bar',
    size: 'md',
    tone: 'primary',
    value: 45,
    max: 100,
    indeterminate: false,
    showLabel: false,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Bar: Story = { args: { variant: 'bar', value: 60 } }
export const Circular: Story = {
  args: { variant: 'circular', value: 60, showLabel: true },
}
export const IndeterminateBar: Story = { args: { variant: 'bar', indeterminate: true } }
export const IndeterminateCircular: Story = {
  args: { variant: 'circular', indeterminate: true },
}

export const Sizes: Story = {
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-4 w-80">
      {(['sm', 'md', 'lg'] as const).map(s => (
        <Progress key={s} {...args} size={s} value={30 + Math.random() * 40} />
      ))}
    </div>
  ),
}

export const Tones: Story = {
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-4 w-80">
      {(['primary', 'accent', 'success', 'warning', 'destructive', 'muted'] as const).map(
        t => (
          <Progress key={t} {...args} tone={t} value={65} />
        )
      )}
    </div>
  ),
}

export const CircularTones: Story = {
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-row flex-wrap gap-6 items-center">
      {(['primary', 'accent', 'success', 'warning', 'destructive', 'muted'] as const).map(
        t => (
          <div key={t} className="flex flex-col items-center gap-2">
            <Progress {...args} variant="circular" tone={t} value={70} showLabel />
            <span className="text-xs">{t}</span>
          </div>
        )
      )}
    </div>
  ),
}
