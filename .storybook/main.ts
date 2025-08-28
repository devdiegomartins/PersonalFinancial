import type { StorybookConfig } from '@storybook/react-vite'
import path from 'node:path'

// Configuração do Storybook alinhada ao Vite do app para garantir:
// - TailwindCSS (v4) processando @import "tailwindcss" nos estilos globais
// - Mesmos aliases de path usados no app
// - Acesso a arquivos estáticos (locales) via /locales/ para i18next
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    // Garante aliases iguais ao vite.config.ts
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '~': path.resolve(__dirname, '../src'),
      '~config': path.resolve(__dirname, '../src/config'),
      '~shared': path.resolve(__dirname, '../src/shared'),
      '~ui': path.resolve(__dirname, '../src/ui'),
      '~hooks': path.resolve(__dirname, '../src/shared/hooks'),
      '~providers': path.resolve(__dirname, '../src/shared/providers'),
      '~services': path.resolve(__dirname, '../src/services'),
    }
    // Importa plugin Tailwind de forma dinâmica para contornar erro de exports com Bun / Storybook
    if (!config.plugins) config.plugins = []
    try {
      let imported: unknown
      try {
        imported = (await import('@tailwindcss/vite')).default
      } catch {}
      if (typeof imported === 'function') {
        type TailwindPluginFactory = () => unknown
        const pluginFactory = imported as TailwindPluginFactory
        const pluginInstance = pluginFactory()
        // @ts-expect-error Vite plugin tipagem flexível
        config.plugins.push(pluginInstance)
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          '[storybook][tailwind] Plugin não carregado; classes utilitárias podem falhar.'
        )
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[storybook][tailwind] Erro ao registrar plugin:', err)
    }

    // Força HMR ativo (útil se rodando em ambientes onde possa ser desativado)
    // Storybook já ativa por padrão, mas deixamos explícito.
  config.server = { ...(config.server || {}), hmr: config.server?.hmr ?? true }

    return config
  },
}
export default config
