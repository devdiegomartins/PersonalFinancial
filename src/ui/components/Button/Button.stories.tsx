import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from '../Icon/IconComponent'
import { Button } from './ButtonComponent'

// Storybook meta configuration -------------------------------------------------
const meta = {
  title: 'UI/Basic/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Buttons trigger actions. They support multiple visual variants (default, destructive, outline, secondary, ghost, link), sizes (default, sm, lg, icon) and can render as either a native button or an anchor when element="a".',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'destructive',
        'success',
        'warning',
        'accent',
        'secondary',
        'outline',
        'subtle',
        'elevated',
        'ghost',
        'link',
        'gradient',
        'gradient-success',
        'gradient-warning',
      ],
      description: 'Visual / semantic style of the button.',
      table: {
        type: {
          summary:
            'default | destructive | success | warning | accent | secondary | outline | subtle | elevated | ghost | link | gradient | gradient-success | gradient-warning',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg'],
      description: 'Button size preset.',
      table: {
        type: { summary: 'xs | sm | default | lg | xl | icon | icon-sm | icon-lg' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['default', 'pill', 'square'],
      description: 'Corner shape / geometry.',
      table: { type: { summary: 'default | pill | square' } },
    },
    element: {
      control: { type: 'select' },
      options: ['button', 'a'],
      description: 'Underlying element. Use "a" for navigation links.',
      table: { type: { summary: 'button | a' }, defaultValue: { summary: 'button' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button (native button only).',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables the button.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Expands button to full container width.',
    },
    startIcon: { control: false },
    endIcon: { control: false },
    children: {
      control: 'text',
      description: 'Content rendered inside the button.',
      table: { type: { summary: 'ReactNode' } },
    },
    href: {
      control: 'text',
      if: { arg: 'element', eq: 'a' },
      description: 'Destination URL when rendering as an anchor (element="a").',
    },
    onClick: { action: 'clicked', table: { category: 'Events' } },
  },
  args: {
    variant: 'default',
    size: 'default',
    element: 'button',
    children: 'Button',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// Variants ------------------------------------------------------------------
export const Default: Story = { args: { variant: 'default' } }
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete' } }
export const Success: Story = { args: { variant: 'success', children: 'Success' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } }
export const Accent: Story = { args: { variant: 'accent', children: 'Accent' } }
export const Outline: Story = { args: { variant: 'outline' } }
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Subtle: Story = { args: { variant: 'subtle', children: 'Subtle' } }
export const Elevated: Story = { args: { variant: 'elevated', children: 'Elevated' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Link: Story = { args: { variant: 'link', children: 'Learn more' } }
export const Gradient: Story = { args: { variant: 'gradient', children: 'Gradient' } }
export const GradientSuccess: Story = {
  args: { variant: 'gradient-success', children: 'Success gradient' },
}
export const GradientWarning: Story = {
  args: { variant: 'gradient-warning', children: 'Warning gradient' },
}

// Sizes ---------------------------------------------------------------------
export const XSmall: Story = { args: { size: 'xs', children: 'XS' } }
export const Small: Story = { args: { size: 'sm', children: 'Small' } }
export const Large: Story = { args: { size: 'lg', children: 'Large' } }
export const XLarge: Story = { args: { size: 'xl', children: 'XLarge' } }
export const IconOnly: Story = {
  args: {
    size: 'icon',
    children: <Icon name="RiStarLine" />,
    'aria-label': 'Favorite',
  },
  name: 'Icon size',
}
export const IconSmall: Story = {
  args: {
    size: 'icon-sm',
    children: <Icon name="RiStarLine" />,
    'aria-label': 'Favorite small',
  },
}
export const IconLarge: Story = {
  args: {
    size: 'icon-lg',
    children: <Icon name="RiStarLine" />,
    'aria-label': 'Favorite large',
  },
}

// Anchor render --------------------------------------------------------------
export const AsAnchor: Story = {
  args: {
    element: 'a',
    href: '#',
    children: 'Anchor button',
  },
  name: 'As anchor (<a>)',
}

// Disabled ------------------------------------------------------------------
export const Disabled: Story = {
  args: { disabled: true },
}

// Loading -------------------------------------------------------------------
export const Loading: Story = { args: { isLoading: true } }

// With start / end icons ----------------------------------------------------
export const WithStartIcon: Story = {
  args: { startIcon: <Icon name="RiDownloadLine" />, children: 'Download' },
}
export const WithEndIcon: Story = {
  args: { endIcon: <Icon name="RiArrowRightLine" />, children: 'Continue' },
}
export const WithBothIcons: Story = {
  args: {
    startIcon: <Icon name="RiArrowLeftLine" />,
    endIcon: <Icon name="RiArrowRightLine" />,
    children: 'Navigate',
  },
}

// With leading icon ---------------------------------------------------------
export const PillShape: Story = { args: { shape: 'pill', children: 'Pill shape' } }
export const SquareShape: Story = {
  args: {
    shape: 'square',
    size: 'icon',
    children: <Icon name="RiHeartLine" />,
    'aria-label': 'Love',
  },
}

// Full width ---------------------------------------------------------------
export const FullWidth: Story = {
  args: { fullWidth: true, children: 'Full width button' },
}

// Composite: all variants ---------------------------------------------------
export const AllVariants: Story = {
  name: 'All variants',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-wrap gap-3">
      {(
        [
          'default',
          'destructive',
          'success',
          'warning',
          'accent',
          'secondary',
          'outline',
          'subtle',
          'elevated',
          'ghost',
          'link',
          'gradient',
          'gradient-success',
          'gradient-warning',
        ] as const
      ).map(v => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
}

// Composite: size comparison ------------------------------------------------
export const AllSizes: Story = {
  name: 'All sizes',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-wrap items-end gap-3">
      {(['xs', 'sm', 'default', 'lg', 'xl'] as const).map(s => (
        <Button key={s} {...args} size={s}>
          {s}
        </Button>
      ))}
      {(['icon-sm', 'icon', 'icon-lg'] as const).map(s => (
        <Button key={s} {...args} size={s} aria-label={s}>
          <Icon name="RiStarLine" />
        </Button>
      ))}
    </div>
  ),
}
