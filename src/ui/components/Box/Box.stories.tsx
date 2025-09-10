import type { Meta, StoryObj } from '@storybook/react'
import { Box } from './BoxComponent'

const meta = {
  title: 'UI/Layout/Box',
  component: Box,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Box is a generic wrapper component with card-like appearance. It provides a slightly lighter background than the app background and responds to hover/focus states. Perfect for creating layout containers, content wrappers, and interactive areas.',
      },
    },
  },
  argTypes: {
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
        'transparent',
        'elevated',
      ],
      description: 'Visual style of the box.',
      table: {
        type: {
          summary:
            'default | primary | secondary | success | warning | danger | info | accent | transparent | elevated',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl', 'none'],
      description: 'Padding size preset.',
      table: {
        type: { summary: 'xs | sm | default | lg | xl | none' },
      },
    },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'default', 'lg', 'xl', 'full'],
      description: 'Border radius preset.',
      table: {
        type: { summary: 'none | sm | default | lg | xl | full' },
      },
    },
    element: {
      control: { type: 'select' },
      options: ['div', 'section', 'article', 'aside', 'main', 'header', 'footer', 'nav'],
      description: 'Underlying HTML element.',
      table: {
        type: {
          summary: 'div | section | article | aside | main | header | footer | nav',
        },
        defaultValue: { summary: 'div' },
      },
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the box should have interactive hover/focus effects.',
    },
    clickable: {
      control: 'boolean',
      description: 'Shorthand for interactive with cursor pointer.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the box and reduces opacity.',
    },
    children: {
      control: 'text',
      description: 'Content rendered inside the box.',
      table: { type: { summary: 'ReactNode' } },
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    radius: 'default',
    element: 'div',
    children: 'Box content goes here',
  },
} satisfies Meta<typeof Box>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// Variants ------------------------------------------------------------------
export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Default box with subtle background',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary box with amber tones',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary box with blue tones',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Success box with green tones',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'Warning box with orange tones',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger box with red tones',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Info box with cyan tones',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Accent box with violet tones',
  },
}

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    children: 'Transparent box with no background',
  },
}

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated box with shadow and stronger background',
  },
}

// Sizes ---------------------------------------------------------------------
export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra small padding',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small padding',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large padding',
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra large padding',
  },
}

export const NoPadding: Story = {
  args: {
    size: 'none',
    children: 'No padding - content touches edges',
  },
}

// Radius --------------------------------------------------------------------
export const NoRadius: Story = {
  args: {
    radius: 'none',
    children: 'Sharp corners',
  },
}

export const SmallRadius: Story = {
  args: {
    radius: 'sm',
    children: 'Small border radius',
  },
}

export const LargeRadius: Story = {
  args: {
    radius: 'lg',
    children: 'Large border radius',
  },
}

export const ExtraLargeRadius: Story = {
  args: {
    radius: 'xl',
    children: 'Extra large border radius',
  },
}

export const FullRadius: Story = {
  args: {
    radius: 'full',
    size: 'lg',
    children: 'Fully rounded',
  },
}

// Interactive states -------------------------------------------------------
export const Interactive: Story = {
  args: {
    interactive: true,
    children: 'Hover over me to see the effect',
  },
}

export const Clickable: Story = {
  args: {
    clickable: true,
    children: 'I have pointer cursor and hover effects',
    onClick: () => alert('Box clicked!'),
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled box with reduced opacity',
  },
}

// Different elements -------------------------------------------------------
export const AsSection: Story = {
  args: {
    element: 'section',
    children: 'I am rendered as a <section> element',
  },
}

export const AsArticle: Story = {
  args: {
    element: 'article',
    children: 'I am rendered as an <article> element',
  },
}

export const AsMain: Story = {
  args: {
    element: 'main',
    size: 'lg',
    children: 'I am rendered as a <main> element',
  },
}

// Content examples ----------------------------------------------------------
export const WithComplexContent: Story = {
  args: {
    variant: 'elevated',
    size: 'lg',
    children: (
      <div>
        <h3 className="text-lg font-semibold text-neutral-100 mb-2">Card Title</h3>
        <p className="text-neutral-300 mb-4">
          This box contains complex content with multiple elements and proper spacing.
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Action
          </button>
          <button
            type="button"
            className="px-3 py-1 bg-slate-600 text-white rounded text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
  },
}

export const AsCard: Story = {
  args: {
    variant: 'default',
    interactive: true,
    size: 'lg',
    children: (
      <div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
          <div>
            <h4 className="text-neutral-100 font-medium">User Profile</h4>
            <p className="text-neutral-400 text-sm">@username</p>
          </div>
        </div>
        <p className="text-neutral-300 text-sm">
          This box is being used as a card component with interactive hover effects.
        </p>
      </div>
    ),
  },
}

// Composite: all variants ---------------------------------------------------
export const AllVariants: Story = {
  name: 'All variants',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {(
        [
          'default',
          'primary',
          'secondary',
          'success',
          'warning',
          'danger',
          'info',
          'accent',
          'transparent',
          'elevated',
        ] as const
      ).map(variant => (
        <Box key={variant} variant={variant} size="sm" className="text-center">
          {variant}
        </Box>
      ))}
    </div>
  ),
}

// Composite: size comparison ------------------------------------------------
export const AllSizes: Story = {
  name: 'All sizes',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <div className="space-y-4">
      {(['xs', 'sm', 'default', 'lg', 'xl'] as const).map(size => (
        <Box key={size} size={size} variant="elevated">
          Size: {size}
        </Box>
      ))}
    </div>
  ),
}
