import { LogicalSize } from '@tauri-apps/api/dpi'
import { useEffect } from 'react'
import {
  getPercentualWindowSizeByMonitorSize,
  setWindowConfig,
} from '~/shared/helpers/windowHelper'

type WindowPreconfigOptionsType = 'user' | 'initialize' | 'close'

export const useWindowSettings = (type: WindowPreconfigOptionsType) => {
  const exec: Record<WindowPreconfigOptionsType, () => Promise<void>> = {
    user: userWindow,
    initialize: initializeWindow,
    close: closeWindow,
  }

  async function userWindow() {
    const size = await getPercentualWindowSizeByMonitorSize(70)
    console.log({ size })
    await setWindowConfig({
      isResizable: true,
      isAlwaysOnTop: false,
      isClosable: true,
      showDecorations: true,
      size,
    })
  }

  async function initializeWindow() {
    await setWindowConfig({
      isResizable: false,
      isAlwaysOnTop: true,
      isClosable: false,
      showDecorations: false,
      size: new LogicalSize({ width: 600, height: 240 }),
    })
  }

  async function closeWindow() {
    await closeWindow()
  }

  useEffect(() => {
    Promise.resolve(exec[type]())
  }, [])
}
