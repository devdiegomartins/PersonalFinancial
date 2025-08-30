import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from './SkeletonComponent'

const meta = {
  title: 'UI/Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Elemento placeholder para indicar carregamento de conteúdo. Suporta formatos (retângulo, pill, círculo), animação pulse ou shimmer e tons diferentes.',
      },
    },
  },
  argTypes: {
    shape: {
      control: { type: 'select' },
      options: ['rect', 'pill', 'circle'],
    },
    animation: {
      control: { type: 'select' },
      options: ['pulse', 'none'],
    },
    tone: {
      control: { type: 'select' },
      options: ['default', 'muted', 'contrast'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    decorative: { control: 'boolean' },
  },
  args: {
    shape: 'rect',
    animation: 'pulse',
    tone: 'default',
    width: '12rem',
    height: '1.25rem',
    decorative: true,
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Shapes: Story = {
  name: 'Formas',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex items-end gap-4">
      <Skeleton {...args} shape="rect" width="8rem" height="1rem" />
      <Skeleton {...args} shape="pill" width="8rem" height="1rem" />
      <Skeleton {...args} shape="circle" width={48} height={48} />
    </div>
  ),
}

export const Tones: Story = {
  name: 'Tons',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-3 w-64">
      {(['default', 'muted', 'contrast'] as const).map(t => (
        <Skeleton key={t} {...args} tone={t} />
      ))}
    </div>
  ),
}

export const Shimmer: Story = {
  name: 'Shimmer',
  args: { animation: 'none' },
}

export const CompositeExample: Story = {
  name: 'Layout composto',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height="0.875rem" />
          <Skeleton width="40%" height="0.75rem" />
        </div>
      </div>
      <Skeleton width="100%" height={160} />
      <div className="space-y-2">
        <Skeleton width="90%" height="0.875rem" />
        <Skeleton width="85%" height="0.875rem" />
        <Skeleton width="80%" height="0.875rem" />
      </div>
    </div>
  ),
}
