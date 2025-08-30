import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from './SpinnerComponent'

const meta = {
  title: 'UI/Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Indicador de carregamento simples. Suporta tamanhos (xs, sm, md, lg) e tons semânticos (primary, accent, success, warning, destructive, muted, white, inherit).',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    tone: {
      control: { type: 'select' },
      options: [
        'inherit',
        'primary',
        'accent',
        'success',
        'warning',
        'destructive',
        'muted',
        'white',
      ],
    },
    label: {
      control: 'text',
    },
  },
  args: {
    size: 'sm',
    tone: 'inherit',
    label: 'Carregando...',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  name: 'Tamanhos',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex items-center gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map(s => (
        <div key={s} className="flex flex-col items-center text-xs gap-1">
          <Spinner {...args} size={s} />
          <span>{s}</span>
        </div>
      ))}
    </div>
  ),
}

export const Tones: Story = {
  name: 'Tons',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-wrap items-center gap-6">
      {(
        [
          'inherit',
          'primary',
          'accent',
          'success',
          'warning',
          'destructive',
          'muted',
          'white',
        ] as const
      ).map(t => (
        <div key={t} className="flex flex-col items-center text-xs gap-1">
          <div className={t === 'white' ? 'bg-gray-900 p-2 rounded' : ''}>
            <Spinner {...args} tone={t} />
          </div>
          <span>{t}</span>
        </div>
      ))}
    </div>
  ),
}

export const NoLabel: Story = {
  args: { label: '' },
  name: 'Sem label (decorativo)',
}
