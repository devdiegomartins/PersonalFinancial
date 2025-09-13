import type { Meta, StoryObj } from '@storybook/react-vite'
import { icons } from '../Icon/icons'
import { Alert } from './AlertComponent'

// A curated list of a few icons to avoid flooding Storybook controls with the entire Remix Icon set.

const meta = {
  title: 'UI/Basic/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Alerts communicate contextual feedback (success, danger, warning, info). Optionally provide a custom icon and description. The color & icon default to the selected variant.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'danger', 'warning', 'info'],
      description: 'Semantic style of the alert (defines colors & default icon).',
      table: {
        type: { summary: 'success | danger | warning | info' },
      },
    },
    title: {
      control: 'text',
      description: 'Short, prominent heading for the alert.',
      table: { type: { summary: 'string' } },
    },
    description: {
      control: 'text',
      description: 'Optional supporting text. Hidden when empty.',
      table: { type: { summary: 'string | undefined' } },
    },
    customDescription: {
      control: false,
      description:
        'Custom ReactNode for description. Takes priority over description prop.',
      table: { type: { summary: 'React.ReactNode | undefined' } },
    },
    customIcon: {
      control: { type: 'select' },
      options: Object.keys(icons),
      description:
        'Override the default icon. Pick from a small curated subset of Remix Icons.',
      table: {
        defaultValue: { summary: 'variant based' },
      },
    },
  },
  args: {
    variant: 'success',
    title: 'Operation completed',
    description: 'Everything went according to plan. You can proceed safely.',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Playground (implicit via args) -------------------------------------------
export const Playground: Story = {}

// Individual variant examples ---------------------------------------------
export const Success: Story = { args: { variant: 'success' } }
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error detected',
    description: 'We were unable to process your request.',
  },
}
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Be careful',
    description: 'Double‑check the information before continuing.',
  },
}
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    description: 'New updates are available for review.',
  },
}

// Story: without description ------------------------------------------------
export const WithoutDescription: Story = {
  args: {
    title: 'Short alert',
    description: undefined,
  },
  name: 'Without description',
}

// Story: custom icon override ----------------------------------------------
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom icon',
    customIcon: 'RiStarLine',
    description: 'This alert uses a custom icon instead of the default info icon.',
  },
  name: 'Custom icon',
}

// Story: custom description with ReactNode ---------------------------------
export const CustomDescription: Story = {
  args: {
    variant: 'warning',
    title: 'Rich content',
    customDescription: (
      <div className="text-neutral-200">
        This alert uses a <strong>custom description</strong> with <em>formatted text</em>
        .
        <br />
        It supports <strong>bold text</strong>, <em>italic text</em>, and{' '}
        <u>line breaks</u>.
        <br />
        <br />
        You can include any React components here!
      </div>
    ),
  },
  name: 'Custom description with rich content',
}

// Composite: all variants side-by-side -------------------------------------
export const AllVariants: Story = {
  name: 'All variants',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-4 max-w-xl">
      {(['success', 'danger', 'warning', 'info'] as const).map(v => (
        <Alert
          key={v}
          {...args}
          variant={v}
          title={`${v.charAt(0).toUpperCase() + v.slice(1)} alert`}
          description={`An example of the ${v} variant.`}
        />
      ))}
    </div>
  ),
}
