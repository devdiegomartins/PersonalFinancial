import type { Meta, StoryObj } from '@storybook/react'
import { useRef } from 'react'
import { Button } from '../Button/ButtonComponent'
import { Tooltip } from './TooltipComponent'
import type { TooltipRef } from './TooltipTypes'

const meta = {
  title: 'UI/Overlays/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Tooltips provide contextual information when users hover or focus on an element. They support multiple variants, sizes, smart positioning, and imperative control via refs. The tooltip uses a portal system for optimal z-layering and positioning.',
      },
    },
  },
  decorators: [
    Story => (
      <div className="p-20 flex justify-center items-center min-h-[200px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: [
        'default',
        'primary',
        'light',
        'success',
        'warning',
        'destructive',
        'accent',
        'subtle',
        'inverse',
      ],
      description: 'Visual variant of the tooltip.',
      table: {
        type: {
          summary:
            'default | primary | light | success | warning | destructive | accent | subtle | inverse',
        },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'default', 'lg', 'xl'],
      description: 'Size preset for the tooltip.',
      table: {
        type: { summary: 'xs | sm | default | lg | xl' },
      },
    },
    position: {
      control: { type: 'object' },
      description:
        'Position priority array. Tooltip tries positions in order until one fits.',
      table: {
        type: { summary: 'TooltipPosition[]' },
        defaultValue: { summary: "['top', 'bottom', 'right', 'left']" },
      },
    },
    value: {
      control: 'text',
      description: 'Simple text content for the tooltip.',
    },
    content: {
      control: false,
      description: 'JSX content for more complex tooltip displays.',
    },
    isVisible: {
      control: 'boolean',
      description: 'Control tooltip visibility programmatically.',
    },
    showDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Delay in milliseconds before showing tooltip on hover.',
      table: { defaultValue: { summary: '500' } },
    },
    hideDelay: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Delay in milliseconds before hiding tooltip.',
      table: { defaultValue: { summary: '150' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable hover/focus interactions.',
    },
    offset: {
      control: { type: 'number', min: 0, max: 50, step: 2 },
      description: 'Distance from the target element in pixels.',
      table: { defaultValue: { summary: '8' } },
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the tooltip (CSS value: "200px", "12rem", etc.)',
    },
    children: {
      control: false,
      description: 'Trigger element that shows the tooltip.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    value: 'This is a tooltip',
    children: <Button>Hover me</Button>,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// Variants ------------------------------------------------------------------
export const Default: Story = {
  args: {
    variant: 'default',
    value: 'Default tooltip with dark theme',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    value: 'Primary tooltip matching button style',
  },
}

export const Light: Story = {
  args: {
    variant: 'light',
    value: 'Light tooltip with bright background',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    value: 'Success tooltip for positive actions',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    value: 'Warning tooltip for caution',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    value: 'Destructive tooltip for dangerous actions',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    value: 'Accent tooltip with purple theme',
  },
}

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    value: 'Subtle tooltip with muted colors',
  },
}

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    value: 'Inverse tooltip adapts to theme',
  },
}

// Sizes ---------------------------------------------------------------------
export const XSmall: Story = {
  args: {
    size: 'xs',
    value: 'Extra small tooltip',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    value: 'Small tooltip with compact text',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    value: 'Large tooltip with more padding and space for longer content',
  },
}

export const XLarge: Story = {
  args: {
    size: 'xl',
    value: 'Extra large tooltip with generous spacing and room for detailed explanations',
  },
}

// Positioning ---------------------------------------------------------------
export const PositionTop: Story = {
  args: {
    position: ['top'],
    value: 'Tooltip always appears above',
  },
}

export const PositionBottom: Story = {
  args: {
    position: ['bottom'],
    value: 'Tooltip always appears below',
  },
}

export const PositionLeft: Story = {
  args: {
    position: ['left'],
    value: 'Tooltip appears to the left',
  },
}

export const PositionRight: Story = {
  args: {
    position: ['right'],
    value: 'Tooltip appears to the right',
  },
}

export const SmartPositioning: Story = {
  args: {
    position: ['top', 'right', 'bottom', 'left'],
    value: 'Smart tooltip - tries top first, then right, bottom, left',
  },
  parameters: {
    docs: {
      description: {
        story:
          'This tooltip tries to position itself in the order: top → right → bottom → left, choosing the first position that fits in the viewport.',
      },
    },
  },
}

// Content Types -------------------------------------------------------------
export const WithJSXContent: Story = {
  args: {
    content: (
      <div className="space-y-1">
        <div className="font-semibold text-sm">Rich Content</div>
        <div className="text-xs opacity-90">
          Tooltips can contain complex JSX content with multiple elements.
        </div>
      </div>
    ),
    children: <Button variant="accent">Rich Content</Button>,
  },
}

export const LongText: Story = {
  args: {
    size: 'lg',
    value:
      'This is a very long tooltip that demonstrates how the component handles longer text content. The tooltip will wrap appropriately and maintain good readability.',
  },
}

export const CustomMaxWidth: Story = {
  args: {
    maxWidth: '200px',
    value:
      'This tooltip has a custom maximum width of 200px, which makes it wrap text nicely even with shorter content.',
    children: <Button>Custom Max Width</Button>,
  },
}

export const NarrowTooltip: Story = {
  args: {
    maxWidth: '120px',
    value: 'This is a narrow tooltip that wraps text in a compact format',
    children: <Button>Narrow Tooltip</Button>,
  },
}

export const WideTooltip: Story = {
  args: {
    maxWidth: '400px',
    value:
      'This is a very wide tooltip that can accommodate longer text without wrapping too much. Perfect for detailed explanations or instructions.',
    children: <Button>Wide Tooltip</Button>,
  },
}

export const ResponsiveWidth: Story = {
  args: {
    maxWidth: '50vw',
    value:
      'This tooltip uses viewport width units (50vw) so it adapts to different screen sizes while maintaining readability.',
    children: <Button>Responsive Width</Button>,
  },
}

export const ContentBasedWidth: Story = {
  name: 'Content-Based Width',
  parameters: {
    controls: { exclude: /.*/ },
    docs: {
      description: {
        story:
          'These examples show how tooltip width adapts to content length naturally.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Tooltip value="Short">
          <Button size="sm">Short text</Button>
        </Tooltip>
        <Tooltip value="Medium length tooltip text">
          <Button size="sm">Medium text</Button>
        </Tooltip>
        <Tooltip value="This is a much longer tooltip that demonstrates how content naturally expands">
          <Button size="sm">Long text</Button>
        </Tooltip>
      </div>

      <div className="flex gap-4">
        <Tooltip
          maxWidth="150px"
          value="This text will wrap because maxWidth constrains it to 150px"
        >
          <Button size="sm">150px constraint</Button>
        </Tooltip>
        <Tooltip
          maxWidth="250px"
          value="This text has more room to breathe with a 250px constraint"
        >
          <Button size="sm">250px constraint</Button>
        </Tooltip>
      </div>
    </div>
  ),
}

// Width Control Examples --------------------------------------------------
export const WidthControl: Story = {
  name: 'Width Control Examples',
  parameters: {
    controls: { exclude: /.*/ },
    docs: {
      description: {
        story:
          'These examples demonstrate different ways to control tooltip width using the maxWidth prop.',
      },
    },
  },
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold mb-2">Fixed Widths</h4>
        <div className="space-y-2">
          <Tooltip
            maxWidth="120px"
            value="Very narrow tooltip with constrained width forces text to wrap frequently"
          >
            <Button size="sm">120px max</Button>
          </Tooltip>
          <Tooltip
            maxWidth="200px"
            value="Medium width tooltip provides good balance between compactness and readability"
          >
            <Button size="sm">200px max</Button>
          </Tooltip>
          <Tooltip
            maxWidth="320px"
            value="Wider tooltip allows for longer text without excessive wrapping, making it easier to read detailed information"
          >
            <Button size="sm">320px max</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold mb-2">Responsive Widths</h4>
        <div className="space-y-2">
          <Tooltip
            maxWidth="20rem"
            value="Using rem units for tooltip width that scales with font size settings"
          >
            <Button size="sm">20rem max</Button>
          </Tooltip>
          <Tooltip
            maxWidth="30vw"
            value="Viewport width units make tooltip responsive to screen size changes automatically"
          >
            <Button size="sm">30vw max</Button>
          </Tooltip>
          <Tooltip
            maxWidth="min(300px, 40vw)"
            value="CSS functions like min() allow for adaptive width with maximum constraints"
          >
            <Button size="sm">Smart width</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

// States & Behavior ---------------------------------------------------------
export const AlwaysVisible: Story = {
  args: {
    isVisible: true,
    value: 'This tooltip is always visible',
    children: <Button>Always visible tooltip</Button>,
  },
}

export const FastTooltip: Story = {
  args: {
    showDelay: 0,
    hideDelay: 0,
    value: 'Instant tooltip with no delays',
    children: <Button>Instant tooltip</Button>,
  },
}

export const SlowTooltip: Story = {
  args: {
    showDelay: 1000,
    hideDelay: 500,
    value: 'Slow tooltip takes time to appear/disappear',
    children: <Button>Slow tooltip</Button>,
  },
}

export const DisabledTooltip: Story = {
  args: {
    disabled: true,
    value: 'This tooltip is disabled',
    children: <Button>Disabled tooltip</Button>,
  },
}

export const LargeOffset: Story = {
  args: {
    offset: 24,
    value: 'Tooltip with larger offset from trigger',
    children: <Button>Large offset</Button>,
  },
}

// Different Triggers --------------------------------------------------------
export const WithDifferentButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip value="Default button tooltip">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip value="Destructive action" variant="destructive">
        <Button variant="destructive">Delete</Button>
      </Tooltip>
      <Tooltip value="Ghost button info" variant="subtle">
        <Button variant="ghost">Ghost</Button>
      </Tooltip>
    </div>
  ),
}

export const WithInputElement: Story = {
  args: {
    value: 'Enter your email address',
    variant: 'light',
    position: ['top', 'bottom'],
    children: (
      <input
        type="email"
        placeholder="Email"
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ),
  },
}

// Imperative Control -------------------------------------------------------
export const ImperativeControl: Story = {
  render: () => {
    const tooltipRef = useRef<TooltipRef>(null)

    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => tooltipRef.current?.show()}>
            Show
          </Button>
          <Button size="sm" variant="outline" onClick={() => tooltipRef.current?.hide()}>
            Hide
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => tooltipRef.current?.toggle()}
          >
            Toggle
          </Button>
        </div>
        <Tooltip
          ref={tooltipRef}
          value="Controlled programmatically"
          variant="accent"
          disabled // Disable hover interactions
        >
          <Button>Controlled Tooltip</Button>
        </Tooltip>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          'This example shows how to control tooltips imperatively using the ref API. The tooltip interactions are disabled to prevent conflicts with programmatic control.',
      },
    },
  },
}

// Edge Cases & Complex Scenarios -------------------------------------------
export const MultipleTooltips: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <Tooltip value="Top left corner" position={['bottom', 'right']}>
          <Button>Top Left</Button>
        </Tooltip>
        <Tooltip value="Bottom left corner" position={['top', 'right']}>
          <Button>Bottom Left</Button>
        </Tooltip>
      </div>
      <div className="space-y-4">
        <Tooltip value="Top right corner" position={['bottom', 'left']}>
          <Button>Top Right</Button>
        </Tooltip>
        <Tooltip value="Bottom right corner" position={['top', 'left']}>
          <Button>Bottom Right</Button>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple tooltips can coexist and each one will position itself optimally based on its priority settings.',
      },
    },
  },
}
