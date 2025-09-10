import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './AvatarComponent'

const meta = {
  title: 'UI/Basic/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Avatar displays user profile images, initials, or fallback icons. It supports multiple sizes (xs, sm, default, lg, xl, 2xl, 3xl), shapes (circle, square), and color variants. The component follows a hierarchy: image (if src provided) → initials (from name) → fallback user icon.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl', '2xl', '3xl'],
      description: 'Size of the avatar.',
      table: {
        type: { summary: 'xs | sm | default | lg | xl | 2xl | 3xl' },
        defaultValue: { summary: 'default' },
      },
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square'],
      description: 'Shape of the avatar.',
      table: {
        type: { summary: 'circle | square' },
        defaultValue: { summary: 'circle' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'accent',
      ],
      description: 'Color variant for the avatar background.',
      table: {
        type: {
          summary:
            'default | primary | secondary | success | warning | danger | info | accent',
        },
        defaultValue: { summary: 'default' },
      },
    },
    src: {
      control: 'text',
      description: 'Image source URL. Takes highest priority in the display hierarchy.',
      table: { type: { summary: 'string' } },
    },
    alt: {
      control: 'text',
      description: 'Alt text for the image.',
      table: { type: { summary: 'string' } },
    },
    name: {
      control: 'text',
      description:
        'User name. Used to generate initials (first + last name initials, or single initial if one name).',
      table: { type: { summary: 'string' } },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes.',
      table: { type: { summary: 'string' } },
    },
  },
  args: {
    size: 'default',
    shape: 'circle',
    variant: 'default',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// With Image -----------------------------------------------------------------
export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    name: 'John Doe',
  },
}

// With Initials --------------------------------------------------------------
export const WithInitials: Story = {
  args: {
    name: 'John Doe',
  },
}

export const WithSingleName: Story = {
  args: {
    name: 'John',
  },
}

export const WithLongName: Story = {
  args: {
    name: 'João Pedro da Silva Santos',
  },
}

// Fallback Icon --------------------------------------------------------------
export const FallbackIcon: Story = {
  args: {},
}

// Sizes ----------------------------------------------------------------------
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    name: 'John Doe',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    name: 'John Doe',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    name: 'John Doe',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    name: 'John Doe',
  },
}

export const Size2XL: Story = {
  args: {
    size: '2xl',
    name: 'John Doe',
  },
}

export const Size3XL: Story = {
  args: {
    size: '3xl',
    name: 'John Doe',
  },
}

// Shapes ---------------------------------------------------------------------
export const Circle: Story = {
  args: {
    shape: 'circle',
    name: 'John Doe',
  },
}

export const Square: Story = {
  args: {
    shape: 'square',
    name: 'John Doe',
  },
}

// Variants -------------------------------------------------------------------
export const Default: Story = {
  args: {
    variant: 'default',
    name: 'John Doe',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    name: 'John Doe',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    name: 'John Doe',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    name: 'John Doe',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    name: 'John Doe',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    name: 'John Doe',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    name: 'John Doe',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    name: 'John Doe',
  },
}

// Combinations ---------------------------------------------------------------
export const SquareWithImage: Story = {
  args: {
    shape: 'square',
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    name: 'John Doe',
  },
}

export const LargeSquareWithInitials: Story = {
  args: {
    size: 'xl',
    shape: 'square',
    variant: 'accent',
    name: 'Maria Silva',
  },
}

export const SmallCircleWithIcon: Story = {
  args: {
    size: 'sm',
    shape: 'circle',
    variant: 'secondary',
  },
}

// Group Example --------------------------------------------------------------
export const Group: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Avatar
        size="sm"
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        alt="John"
      />
      <Avatar size="sm" name="Maria Silva" variant="success" />
      <Avatar size="sm" name="Pedro" variant="warning" />
      <Avatar size="sm" variant="secondary" />
    </div>
  ),
}
