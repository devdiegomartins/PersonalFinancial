import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Animated from './AnimatedComponent'
import { enteringPresets, exitingPresets } from './AnimatedTypes'

const enteringOptions = Object.keys(enteringPresets)
const exitingOptions = Object.keys(exitingPresets)

type EnteringName = keyof typeof enteringPresets
type ExitingName = keyof typeof exitingPresets

interface StoryArgs {
  enteringName: EnteringName
  exitingName: ExitingName
  delay: number
  visible: boolean
  children: string
  as: string
  enteringDuration?: number
  exitingDuration?: number
  enteringDelay?: number
  exitingDelay?: number
  zIndex?: number
  onlyWhenVisible?: boolean
}

const meta: Meta<StoryArgs> = {
  title: 'UI/Feedback/Animated',
  // component intentionally omitted since we wrap inside render
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Centralizes enter/exit animations using framer-motion. Use the `entering` and `exiting` props to apply predefined presets.',
      },
    },
  },
  argTypes: {
    enteringName: { control: { type: 'select' }, options: enteringOptions },
    exitingName: { control: { type: 'select' }, options: exitingOptions },
    delay: { control: { type: 'number', min: 0, step: 0.05 } },
    visible: { control: 'boolean' },
    children: { control: 'text' },
    as: { control: { type: 'text' } },
    enteringDuration: { control: { type: 'number', min: 0, step: 0.05 } },
    exitingDuration: { control: { type: 'number', min: 0, step: 0.05 } },
    enteringDelay: { control: { type: 'number', min: 0, step: 0.05 } },
    exitingDelay: { control: { type: 'number', min: 0, step: 0.05 } },
    zIndex: { control: { type: 'number', min: -10, max: 9999 } },
    onlyWhenVisible: { control: 'boolean' },
  } satisfies Meta<StoryArgs>['argTypes'],
  args: {
    enteringName: 'FadeIn',
    exitingName: 'SlideOutBottom',
    children: 'Animated content',
    visible: true,
    delay: 0,
    as: 'div',
    onlyWhenVisible: false,
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Helper mapping story args to component props.
const resolvePreset = <T extends object>(
  name: string | undefined,
  map: Record<string, T>
) => (name && map[name]) || undefined

export const Playground: Story = {
  render: ({
    enteringName,
    exitingName,
    children,
    delay,
    visible,
    as,
    enteringDuration,
    exitingDuration,
    enteringDelay,
    exitingDelay,
    zIndex,
    onlyWhenVisible,
  }) => {
    return (
      <Animated
        entering={resolvePreset(enteringName, enteringPresets)}
        exiting={resolvePreset(exitingName, exitingPresets)}
        delay={delay}
        visible={visible}
        as={as as keyof JSX.IntrinsicElements}
        enteringDuration={enteringDuration}
        exitingDuration={exitingDuration}
        enteringDelay={enteringDelay}
        exitingDelay={exitingDelay}
        zIndex={zIndex}
        onlyWhenVisible={onlyWhenVisible}
      >
        <div className="rounded-md bg-blue-600/10 border border-blue-600/30 p-6 text-sm text-blue-900 dark:text-blue-200 dark:border-blue-400/40 dark:bg-blue-400/10">
          {children}
        </div>
      </Animated>
    )
  },
}

export const ToggleVisibility: Story = {
  args: {
    enteringName: 'FadeIn',
    exitingName: 'FadeOut',
    delay: 0,
    visible: true,
    children: '',
  },
  render: args => {
    const [open, setOpen] = useState(true)
    return (
      <div className="space-y-4">
        <button
          type="button"
          className="px-4 py-2 rounded-md bg-gray-800 text-white text-xs"
          onClick={() => setOpen(o => !o)}
        >
          Toggle
        </button>
        <Animated
          visible={open}
          entering={resolvePreset(args.enteringName, enteringPresets)}
          exiting={resolvePreset(args.exitingName, exitingPresets)}
        >
          <div className="rounded-md bg-emerald-600/10 border border-emerald-600/40 p-4 text-emerald-900 dark:text-emerald-200 dark:border-emerald-400/40 dark:bg-emerald-400/10">
            Appears and disappears
          </div>
        </Animated>
      </div>
    )
  },
}

export const DirectionExamples: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-2">
      {[
        'FadeInLeft',
        'FadeInRight',
        'FadeInTop',
        'FadeInBottom',
        'SlideInTop',
        'SlideInBottom',
      ].map(n => (
        <Animated
          key={n}
          entering={enteringPresets[n]}
          exiting={exitingPresets['FadeOut']}
        >
          <div className="h-20 flex items-center justify-center rounded bg-gray-100 dark:bg-gray-800 text-xs font-medium">
            {n}
          </div>
        </Animated>
      ))}
    </div>
  ),
}

export const WithDelay: Story = {
  args: {
    enteringName: 'SlideIn',
    exitingName: 'SlideOut',
    delay: 0,
    visible: true,
    children: '',
    as: 'div',
  },
  render: args => (
    <div className="space-y-4">
      {[0, 0.1, 0.2, 0.3].map(d => (
        <Animated
          key={d}
          delay={d}
          entering={resolvePreset(args.enteringName, enteringPresets)}
          exiting={resolvePreset(args.exitingName, exitingPresets)}
        >
          <div className="rounded bg-purple-600/10 border border-purple-500/40 p-3 text-xs">
            Delay {d}s
          </div>
        </Animated>
      ))}
    </div>
  ),
}

export const KeyExtractor: Story = {
  args: {
    enteringName: 'FadeIn',
    exitingName: 'FadeOut',
    delay: 0,
    visible: true,
    children: '',
    as: 'div',
  },
  render: args => {
    const [items, setItems] = useState(() => Array.from({ length: 3 }, (_, i) => i))
    return (
      <div className="space-y-4">
        <button
          type="button"
          className="px-3 py-1 rounded bg-gray-700 text-white text-xs"
          onClick={() => setItems(prev => [...prev, prev.length])}
        >
          Add Item
        </button>
        <div className="space-y-2">
          {items.map(i => (
            <Animated
              key={i}
              entering={resolvePreset(args.enteringName, enteringPresets)}
              exiting={resolvePreset(args.exitingName, exitingPresets)}
              key_extractor={id => `${id}-${i}`}
              zIndex={items.length - i}
            >
              <div className="p-3 rounded bg-indigo-600/10 border border-indigo-500/40 text-xs">
                Item {i}
              </div>
            </Animated>
          ))}
        </div>
      </div>
    )
  },
}

export const OnlyWhenVisibleList: Story = {
  args: {
    enteringName: 'SlideInBottom',
    exitingName: 'FadeOut',
    delay: 0,
    visible: true,
    children: '',
    as: 'div',
  },
  render: args => {
    const items = Array.from({ length: 15 }, (_, i) => i)
    return (
      <div
        className="h-96 overflow-y-auto space-y-4 pr-2"
        style={{ border: '1px solid #333' }}
      >
        {items.map(i => (
          <Animated
            key={i}
            entering={resolvePreset(args.enteringName, enteringPresets)}
            exiting={resolvePreset(args.exitingName, exitingPresets)}
            onlyWhenVisible
          >
            <div className="p-4 rounded bg-teal-600/10 border border-teal-500/30 text-xs">
              Visible item {i}
            </div>
          </Animated>
        ))}
      </div>
    )
  },
}
