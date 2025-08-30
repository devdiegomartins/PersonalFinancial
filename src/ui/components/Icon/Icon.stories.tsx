import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './IconComponent'
import type { IconsNames } from './IconTypes'
import { icons } from './icons'

const meta = {
  title: 'UI/Basic/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Renders a single Remix Icon (react-icons/ri). Use the name prop to choose an icon. Provide size (or width/height) to control its dimensions. For convenience a curated subset of names is exposed to Storybook controls; you can still pass any valid Remix icon name in code.',
      },
    },
  },
  argTypes: {
    name: {
      control: { type: 'select' },
      options: Object.keys(icons),
      description: 'Name of the Remix icon (key of react-icons/ri export).',
      table: {
        type: { summary: Object.keys(icons).join(' | ') },
        defaultValue: { summary: 'RiStarLine' },
      },
    },
    size: {
      control: { type: 'number', min: 8, max: 160, step: 2 },
      description:
        'Uniform size in px (maps to the react-icons size prop). Ignored if width/height provided.',
      table: { type: { summary: 'number | undefined' }, defaultValue: { summary: '32' } },
    },
    width: {
      control: { type: 'number', min: 8, max: 160, step: 2 },
      description: 'Explicit width (overrides size).',
      table: { type: { summary: 'number | undefined' } },
    },
    height: {
      control: { type: 'number', min: 8, max: 160, step: 2 },
      description: 'Explicit height (overrides size).',
      table: { type: { summary: 'number | undefined' } },
    },
  },
  args: {
    name: 'RiStarLine',
    size: 32,
  },
} satisfies Meta<typeof Icon>

export default meta
type Story = StoryObj<typeof meta>

// Playground --------------------------------------------------------------
export const Playground: Story = {}

// Story: Different sizes --------------------------------------------------
export const Sizes: Story = {
  name: 'Sizes',
  parameters: { controls: { exclude: ['size', 'width', 'height'] } },
  args: { name: 'RiStarLine' },
  render: args => (
    <div className="flex items-end gap-6">
      {[16, 24, 32, 48, 64].map(s => (
        <div key={s} className="flex flex-col items-center gap-2 text-center">
          <Icon {...args} size={s} />
          <span className="text-xs text-neutral-400">{s}px</span>
        </div>
      ))}
    </div>
  ),
}

// Story: Curated set preview grid ----------------------------------------
export const CuratedSet: Story = {
  name: 'Curated set',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4 max-w-3xl">
      {Object.keys(icons).map(iconName => (
        <div
          key={iconName}
          className="flex flex-col items-center gap-1 rounded border border-white/10 p-2 hover:bg-white/5 transition-colors"
        >
          <Icon name={iconName as IconsNames} size={28} />
          <span className="text-[10px] leading-tight text-neutral-400 text-center break-all">
            {iconName.replace(/^Ri/, '')}
          </span>
        </div>
      ))}
    </div>
  ),
}

// Story: Arbitrary name (demonstrates using any export) -------------------
export const AnyRemixIcon: Story = {
  name: 'Any Remix icon (manual name)',
  args: { name: 'RiCalendarLine', size: 40 },
  parameters: {
    docs: {
      description: {
        story:
          'You can supply ANY icon name from react-icons/ri even if it is not part of the curated control list. Just type the name in code when using the component.',
      },
    },
    controls: { exclude: ['name'] },
  },
  render: args => (
    <div className="flex flex-col items-center gap-2">
      <Icon {...args} />
      <code className="text-xs bg-black/30 px-2 py-1 rounded text-white">
        name="{args.name}"
      </code>
    </div>
  ),
}

// Story: Width/Height override -------------------------------------------
export const WidthHeight: Story = {
  name: 'Width / Height override',
  args: { name: 'RiAlertLine', width: 64, height: 32, size: undefined },
  parameters: { controls: { exclude: ['size'] } },
  render: args => (
    <div className="flex flex-col items-center gap-2">
      <Icon {...args} />
      <span className="text-xs text-neutral-400">
        width={args.width}px height={args.height}px
      </span>
    </div>
  ),
}

// Optional: All icons (omitted intentionally) -----------------------------
// NOTE: We deliberately DO NOT render every icon to avoid massive bundle & slow Storybook.
// If needed for internal dev, create a local-only story filtering icons by a search term.

// Utility (hidden) to help devs copy the curated list if they expand it later.
export const __DebugCuratedList: Story = {
  name: '— debug: curated list JSON',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <pre className="text-xs whitespace-pre-wrap max-w-xl p-4 bg-black/30 rounded">
      {JSON.stringify(icons, null, 2)}
    </pre>
  ),
  tags: ['!dev'],
}

// Make sure tree-shaking works: referencing icons ensures type inference for names.
void icons
