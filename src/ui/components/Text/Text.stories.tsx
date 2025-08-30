import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './TextComponent'

const styleOptions = [
  'display',
  'heading64',
  'heading48',
  'heading32',
  'heading24',
  'heading16',
  'subtitle',
  'bodyLarge',
  'body',
  'bodySmall',
  'caption',
  'overline',
  'code',
  'mono',
] as const

const elementOptions = [
  'span',
  'p',
  'div',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'label',
] as const

const toneOptions = [
  'default',
  'muted',
  'subtle',
  'danger',
  'warning',
  'success',
  'info',
  'inverted',
] as const
const weightOptions = ['regular', 'medium', 'semibold', 'bold'] as const
const alignOptions = ['left', 'center', 'right', 'justify'] as const
const transformOptions = ['none', 'uppercase', 'lowercase', 'capitalize'] as const

const meta = {
  title: 'UI/Basic/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Semantic typography component. Pick a visual style (heading sizes, body, caption) and optionally change the rendered HTML element for accessibility/SEO without altering the visual style.',
      },
    },
    weight: {
      control: { type: 'inline-radio' },
      options: weightOptions,
      description: 'Font weight override.',
      table: {
        type: { summary: weightOptions.join(' | ') },
        defaultValue: { summary: 'regular' },
      },
    },
    tone: {
      control: { type: 'select' },
      options: toneOptions,
      description: 'Semantic color tone.',
      table: {
        type: { summary: toneOptions.join(' | ') },
        defaultValue: { summary: 'default' },
      },
    },
    align: {
      control: { type: 'inline-radio' },
      options: alignOptions,
      description: 'Text alignment.',
      table: {
        type: { summary: alignOptions.join(' | ') },
        defaultValue: { summary: 'left' },
      },
    },
    transform: {
      control: { type: 'select' },
      options: transformOptions,
      description: 'Text transform utility.',
      table: {
        type: { summary: transformOptions.join(' | ') },
        defaultValue: { summary: 'none' },
      },
    },
    italic: {
      control: 'boolean',
      description: 'Italic style.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    underline: {
      control: 'boolean',
      description: 'Underline decoration.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    strike: {
      control: 'boolean',
      description: 'Strikethrough decoration.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    truncate: {
      control: 'boolean',
      description: 'Single-line truncation with ellipsis.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
  },
  argTypes: {
    style: {
      control: { type: 'select' },
      options: styleOptions,
      description: 'Visual style variant (maps to Tailwind classes).',
      table: {
        type: { summary: styleOptions.join(' | ') },
        defaultValue: { summary: 'body' },
      },
    },
    element: {
      control: { type: 'select' },
      options: elementOptions,
      description: 'Underlying HTML element to render (does not change styling).',
      table: {
        type: { summary: elementOptions.join(' | ') },
        defaultValue: { summary: 'span' },
      },
    },
    children: {
      control: 'text',
      description: 'Inline content to display.',
      table: { type: { summary: 'ReactNode' } },
    },
    className: {
      control: false,
      table: { disable: true },
    },
  },
  args: {
    style: 'body',
    element: 'span',
    weight: 'regular',
    tone: 'default',
    align: 'left',
    transform: 'none',
    italic: false,
    underline: false,
    strike: false,
    truncate: false,
    children: 'The quick brown fox jumps over the lazy dog.',
  },
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

// Playground ---------------------------------------------------------------
export const Playground: Story = {}

// Individual style examples ----------------------------------------------
export const Display: Story = {
  args: { style: 'display', element: 'h1', weight: 'bold' },
}
export const Heading64: Story = { args: { style: 'heading64', element: 'h1' } }
export const Heading48: Story = { args: { style: 'heading48', element: 'h2' } }
export const Heading32: Story = { args: { style: 'heading32', element: 'h3' } }
export const Heading24: Story = { args: { style: 'heading24', element: 'h4' } }
export const Heading16: Story = { args: { style: 'heading16', element: 'h5' } }
export const Subtitle: Story = {
  args: { style: 'subtitle', element: 'h6', weight: 'medium' },
}
export const BodyLarge: Story = { args: { style: 'bodyLarge', element: 'p' } }
export const Body: Story = { args: { style: 'body', element: 'p' } }
export const BodySmall: Story = { args: { style: 'bodySmall', element: 'p' } }
export const Caption: Story = {
  args: { style: 'caption', element: 'span', children: 'Caption text' },
}
export const Overline: Story = {
  args: { style: 'overline', element: 'span', children: 'OVERLINE LABEL' },
}
export const Code: Story = {
  args: { style: 'code', element: 'code', children: 'npm run build' },
}
export const Mono: Story = {
  args: { style: 'mono', element: 'code', children: 'const x = 42' },
}

// Different element without changing style --------------------------------
export const BodyAsDiv: Story = {
  name: 'Body style rendered as <div>',
  args: { style: 'body', element: 'div' },
}

// Tone matrix -------------------------------------------------------------
export const Tones: Story = {
  name: 'Tones',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="grid grid-cols-2 gap-2">
      {toneOptions.map(t => (
        <Text key={t} {...args} tone={t}>
          {t}: The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
}

// Weight comparison -------------------------------------------------------
export const Weights: Story = {
  name: 'Weights',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-2">
      {weightOptions.map(w => (
        <Text key={w} {...args} weight={w}>
          {w}: The quick brown fox jumps over the lazy dog.
        </Text>
      ))}
    </div>
  ),
}

// Decor & transform ------------------------------------------------------
export const Decorations: Story = {
  name: 'Decorations & transform',
  parameters: { controls: { exclude: /.*/ } },
  render: () => (
    <div className="flex flex-col gap-2">
      <Text underline>Underlined text sample</Text>
      <Text strike>Strikethrough text sample</Text>
      <Text italic>Italic text sample</Text>
      <Text transform="uppercase">Uppercase transform sample</Text>
      <Text transform="capitalize">capitalize transform sample</Text>
      <Text transform="lowercase">LOWERCASE TRANSFORM SAMPLE</Text>
      <Text underline italic strike>
        Combined underline + italic + strike
      </Text>
    </div>
  ),
}

// Composite: all visual styles --------------------------------------------
export const AllStyles: Story = {
  name: 'All styles',
  parameters: { controls: { exclude: /.*/ } },
  render: args => (
    <div className="flex flex-col gap-3">
      {styleOptions.map(s => (
        <div key={s} className="flex flex-col">
          <Text
            style={s}
            element={s.startsWith('heading') || s === 'display' ? 'h2' : 'span'}
          >
            {s} – {args.children}
          </Text>
        </div>
      ))}
    </div>
  ),
}
