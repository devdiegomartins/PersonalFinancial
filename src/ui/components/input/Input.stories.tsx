import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button/ButtonComponent'
import { Icon } from '../Icon/IconComponent'
import { Input } from './InputComponent'

const meta = {
  title: 'UI/Forms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { sort: 'requiredFirst' },
    docs: {
      description: {
        component:
          'Input component with colorful shadow effects on hover and focus. Supports icons, prepend/append elements, multiple variants, and loading states. Features smooth animations and accessibility support.',
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
      ],
      description: 'Visual variant with colored shadows.',
      table: {
        type: {
          summary:
            'default | primary | secondary | success | warning | danger | info | accent',
        },
        defaultValue: { summary: 'default' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Size of the input.',
      table: {
        type: { summary: 'sm | default | lg' },
        defaultValue: { summary: 'default' },
      },
    },
    fontSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lg'],
      description: 'Font size of the input text.',
      table: {
        type: { summary: 'xs | sm | base | lg' },
        defaultValue: { summary: 'sm' },
      },
    },
    icon: {
      control: { type: 'select' },
      options: [
        undefined,
        'RiUser3Line',
        'RiMailLine',
        'RiLockLine',
        'RiSearchLine',
        'RiEyeLine',
        'RiEyeOffLine',
        'RiPhoneLine',
        'RiMapPinLine',
      ],
      description: 'Icon to display on the left side.',
      table: { type: { summary: 'IconsNames' } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: { type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Whether the input is read-only.',
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Whether to show password toggle for password inputs.',
      table: { defaultValue: { summary: 'true' } },
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Visual state of the input (overrides variant colors).',
      table: {
        type: { summary: 'default | success | warning | danger | info' },
        defaultValue: { summary: 'default' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text to display above the input.',
      table: { type: { summary: 'ReactNode' } },
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the input.',
      table: { type: { summary: 'ReactNode' } },
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (shows * indicator in label).',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows skeleton loading state.',
    },
    prepend: { control: false },
    append: { control: false },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the input.',
    },
    wrapperClassName: {
      control: 'text',
      description: 'Additional CSS classes for the wrapper.',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    placeholder: 'Enter text...',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

// Playground (default exported args) ----------------------------------------
export const Playground: Story = {}

// Variants ------------------------------------------------------------------
export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: 'Default input',
  },
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    placeholder: 'Primary input',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Secondary input',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    placeholder: 'Success input',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    placeholder: 'Warning input',
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    placeholder: 'Danger input',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    placeholder: 'Info input',
  },
}

export const Accent: Story = {
  args: {
    variant: 'accent',
    placeholder: 'Accent input',
  },
}

// States --------------------------------------------------------------------
export const DefaultState: Story = {
  args: {
    state: 'default',
    placeholder: 'Default state',
    label: 'Default state',
  },
}

export const SuccessState: Story = {
  args: {
    state: 'success',
    placeholder: 'Success state',
    label: 'Success state',
    helperText: 'This field is valid',
  },
}

export const WarningState: Story = {
  args: {
    state: 'warning',
    placeholder: 'Warning state',
    label: 'Warning state',
    helperText: 'Please check this field',
  },
}

export const DangerState: Story = {
  args: {
    state: 'danger',
    placeholder: 'Danger state',
    label: 'Danger state',
    helperText: 'This field has an error',
  },
}

export const InfoState: Story = {
  args: {
    state: 'info',
    placeholder: 'Info state',
    label: 'Info state',
    helperText: 'Additional information about this field',
  },
}

// With Labels and Helper Text -----------------------------------------------
export const WithLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    variant: 'secondary',
  },
}

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    helperText: 'We will never share your email with anyone',
    variant: 'primary',
  },
}

export const RequiredField: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    required: true,
    type: 'password',
    state: 'danger',
    helperText: 'Password is required',
  },
}

// Sizes ---------------------------------------------------------------------
export const Small: Story = {
  args: {
    size: 'sm',
    placeholder: 'Small input',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    placeholder: 'Large input',
  },
}

// With Icons ----------------------------------------------------------------
export const WithUserIcon: Story = {
  args: {
    icon: 'RiUser3Line',
    placeholder: 'Username',
    variant: 'secondary',
  },
}

export const WithEmailIcon: Story = {
  args: {
    icon: 'RiMailLine',
    placeholder: 'Email address',
    variant: 'primary',
  },
}

export const WithSearchIcon: Story = {
  args: {
    icon: 'RiSearchLine',
    placeholder: 'Search...',
    variant: 'accent',
  },
}

export const WithLockIcon: Story = {
  args: {
    icon: 'RiLockLine',
    placeholder: 'Password',
    variant: 'danger',
    type: 'password',
  },
}

// Font Sizes ----------------------------------------------------------------
export const FontSizeXS: Story = {
  args: {
    fontSize: 'xs',
    placeholder: 'Extra small text',
    variant: 'secondary',
  },
}

export const FontSizeSM: Story = {
  args: {
    fontSize: 'sm',
    placeholder: 'Small text (default)',
    variant: 'secondary',
  },
}

export const FontSizeBase: Story = {
  args: {
    fontSize: 'base',
    placeholder: 'Base text size',
    variant: 'secondary',
  },
}

export const FontSizeLG: Story = {
  args: {
    fontSize: 'lg',
    placeholder: 'Large text',
    variant: 'secondary',
  },
}

// Password Input ------------------------------------------------------------
export const PasswordWithToggle: Story = {
  args: {
    type: 'password',
    icon: 'RiLockLine',
    placeholder: 'Enter password',
    variant: 'danger',
    showPasswordToggle: true,
  },
}

export const PasswordWithoutToggle: Story = {
  args: {
    type: 'password',
    icon: 'RiLockLine',
    placeholder: 'Enter password',
    variant: 'danger',
    showPasswordToggle: false,
  },
}

// With Prepend/Append -------------------------------------------------------
export const WithPrepend: Story = {
  args: {
    variant: 'primary',
    placeholder: '0.00',
    prepend: '$',
  },
}

export const WithAppend: Story = {
  args: {
    variant: 'success',
    placeholder: 'Enter amount',
    append: 'USD',
  },
}

export const WithBothPrependAppend: Story = {
  args: {
    variant: 'accent',
    placeholder: '0.00',
    prepend: '$',
    append: 'USD',
  },
}

export const WithButtonAppend: Story = {
  args: {
    variant: 'secondary',
    placeholder: 'Search...',
    append: (
      <Button size="sm" variant="secondary">
        <Icon name="RiSearchLine" />
      </Button>
    ),
  },
}

export const WithIconPrepend: Story = {
  args: {
    variant: 'info',
    placeholder: 'Phone number',
    prepend: <Icon name="RiPhoneLine" />,
  },
}

// States --------------------------------------------------------------------
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
    icon: 'RiUser3Line',
  },
}

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 'This is read-only text',
    icon: 'RiUser3Line',
    variant: 'info',
  },
}

export const Loading: Story = {
  args: {
    isLoading: true,
  },
}

export const LoadingLarge: Story = {
  args: {
    isLoading: true,
    size: 'lg',
  },
}

// Form Examples -------------------------------------------------------------
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Username"
        icon="RiUser3Line"
        placeholder="Enter your username"
        variant="secondary"
        required
      />
      <Input
        label="Password"
        icon="RiLockLine"
        placeholder="Enter your password"
        type="password"
        variant="secondary"
        showPasswordToggle={true}
        required
        helperText="Password must be at least 8 characters"
      />
      <Button variant="secondary" fullWidth>
        Sign In
      </Button>
    </div>
  ),
}

export const FormWithValidation: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input
        label="Email"
        icon="RiMailLine"
        placeholder="Enter your email"
        state="success"
        helperText="Email is valid"
        required
      />
      <Input
        label="Username"
        icon="RiUser3Line"
        placeholder="Choose a username"
        state="danger"
        helperText="Username is already taken"
        required
      />
      <Input
        label="Phone (optional)"
        icon="RiPhoneLine"
        placeholder="Enter your phone number"
        state="info"
        helperText="We'll use this for account verification"
      />
    </div>
  ),
}

export const SearchWithFilters: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input
        variant="accent"
        icon="RiSearchLine"
        placeholder="Search products..."
        size="lg"
      />
      <div className="flex gap-2">
        <Input variant="primary" placeholder="Min price" prepend="$" size="sm" />
        <Input variant="primary" placeholder="Max price" prepend="$" size="sm" />
      </div>
    </div>
  ),
}

export const PaymentForm: Story = {
  render: () => (
    <div className="space-y-4 max-w-sm">
      <Input variant="success" placeholder="0.00" prepend="$" append="USD" />
      <Input variant="info" icon="RiMailLine" placeholder="Recipient email" />
      <Input variant="warning" placeholder="Description (optional)" />
    </div>
  ),
}

// All Variants Showcase -----------------------------------------------------
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Input variant="default" placeholder="Default" />
      <Input variant="primary" placeholder="Primary" />
      <Input variant="secondary" placeholder="Secondary" />
      <Input variant="success" placeholder="Success" />
      <Input variant="warning" placeholder="Warning" />
      <Input variant="danger" placeholder="Danger" />
      <Input variant="info" placeholder="Info" />
      <Input variant="accent" placeholder="Accent" />
    </div>
  ),
}
