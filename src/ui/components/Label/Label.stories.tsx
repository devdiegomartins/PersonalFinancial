import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './LabelComponent'

const meta = {
  title: 'UI/Forms/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Label component for form inputs with support for required indicators and various states. Designed to work seamlessly with form inputs and provide clear visual hierarchy.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the label text.',
      table: {
        type: { summary: 'sm | default | lg' },
        defaultValue: { summary: 'default' },
      },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Visual state of the label.',
      table: {
        type: { summary: 'default | success | warning | danger | info' },
        defaultValue: { summary: 'default' },
      },
    },
    weight: {
      control: { type: 'select' },
      options: ['normal', 'medium', 'semibold'],
      description: 'Font weight of the label.',
      table: {
        type: { summary: 'normal | medium | semibold' },
        defaultValue: { summary: 'medium' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows indicator).',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the label appears disabled.',
    },
    requiredIndicator: {
      control: 'text',
      description: 'Custom required indicator (defaults to "*").',
      table: { defaultValue: { summary: '"*"' } },
    },
    htmlFor: {
      control: 'text',
      description: 'ID of the associated form input.',
    },
    children: {
      control: 'text',
      description: 'Label text content.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  args: {
    size: 'default',
    state: 'default',
    weight: 'medium',
    children: 'Label text',
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// Sizes ---------------------------------------------------------------------
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small label',
  },
}

export const Default: Story = {
  args: {
    size: 'default',
    children: 'Default label',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large label',
  },
}

// States --------------------------------------------------------------------
export const DefaultState: Story = {
  args: {
    state: 'default',
    children: 'Default state',
  },
}

export const Success: Story = {
  args: {
    state: 'success',
    children: 'Success state',
  },
}

export const Warning: Story = {
  args: {
    state: 'warning',
    children: 'Warning state',
  },
}

export const Danger: Story = {
  args: {
    state: 'danger',
    children: 'Danger state',
  },
}

export const Info: Story = {
  args: {
    state: 'info',
    children: 'Info state',
  },
}

// Weights -------------------------------------------------------------------
export const Normal: Story = {
  args: {
    weight: 'normal',
    children: 'Normal weight',
  },
}

export const Medium: Story = {
  args: {
    weight: 'medium',
    children: 'Medium weight',
  },
}

export const Semibold: Story = {
  args: {
    weight: 'semibold',
    children: 'Semibold weight',
  },
}

// Required ------------------------------------------------------------------
export const Required: Story = {
  args: {
    required: true,
    children: 'Required field',
  },
}

export const RequiredCustomIndicator: Story = {
  args: {
    required: true,
    requiredIndicator: ' (required)',
    children: 'Required field',
  },
}

export const RequiredDanger: Story = {
  args: {
    required: true,
    state: 'danger',
    children: 'Required field with error',
  },
}

// Disabled ------------------------------------------------------------------
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled label',
  },
}

export const DisabledRequired: Story = {
  args: {
    disabled: true,
    required: true,
    children: 'Disabled required field',
  },
}

// Examples ------------------------------------------------------------------
export const FormLabels: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Label htmlFor="username" required>
        Username
      </Label>
      <Label htmlFor="email" state="info">
        Email Address
      </Label>
      <Label htmlFor="password" required state="danger">
        Password
      </Label>
      <Label htmlFor="bio" weight="normal">
        Bio (optional)
      </Label>
    </div>
  ),
}

export const AllStates: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <Label state="default">Default state</Label>
      <Label state="success">Success state</Label>
      <Label state="warning">Warning state</Label>
      <Label state="danger">Danger state</Label>
      <Label state="info">Info state</Label>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-sm">
      <Label size="sm">Small label</Label>
      <Label size="default">Default label</Label>
      <Label size="lg">Large label</Label>
    </div>
  ),
}
