import React, { createContext, type ReactNode, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

interface TooltipContextValue {
  isPortalSupported: boolean
  tooltipRoot: HTMLElement | null
}

const TooltipContext = createContext<TooltipContextValue>({
  isPortalSupported: false,
  tooltipRoot: null,
})

export const useTooltipContext = () => {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('useTooltipContext must be used within a TooltipProvider')
  }
  return context
}

interface TooltipProviderProps {
  children: ReactNode
  /** Custom container element for tooltip portals. Defaults to document.body */
  container?: HTMLElement
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  container,
}) => {
  const [tooltipRoot, setTooltipRoot] = useState<HTMLElement | null>(null)

  // Initialize tooltip root on mount
  React.useEffect(() => {
    if (typeof window === 'undefined') return

    const root = container || document.body
    setTooltipRoot(root)

    // Create a dedicated tooltip container div if none exists
    let tooltipContainer = document.getElementById('tooltip-root')
    if (!tooltipContainer) {
      tooltipContainer = document.createElement('div')
      tooltipContainer.id = 'tooltip-root'
      tooltipContainer.style.position = 'absolute'
      tooltipContainer.style.top = '0'
      tooltipContainer.style.left = '0'
      tooltipContainer.style.pointerEvents = 'none'
      tooltipContainer.style.zIndex = 'var(--z-tooltip)'
      root.appendChild(tooltipContainer)
    }

    setTooltipRoot(tooltipContainer)

    return () => {
      // Cleanup on unmount
      tooltipContainer?.parentNode?.removeChild(tooltipContainer)
    }
  }, [container])

  const contextValue: TooltipContextValue = {
    isPortalSupported: typeof window !== 'undefined' && !!tooltipRoot,
    tooltipRoot,
  }

  return (
    <TooltipContext.Provider value={contextValue}>{children}</TooltipContext.Provider>
  )
}

/**
 * Hook to create tooltip portals
 * @param children - Content to render in the portal
 * @returns Portal element or null if portal is not supported
 */
export const useTooltipPortal = (children: ReactNode) => {
  const { isPortalSupported, tooltipRoot } = useTooltipContext()

  if (!isPortalSupported || !tooltipRoot) {
    return null
  }

  return children ? createPortal(children, tooltipRoot) : null
}

/**
 * Higher-order component to automatically wrap components with TooltipProvider
 */
export const withTooltipProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent = (props: P & { tooltipContainer?: HTMLElement }) => {
    const { tooltipContainer, ...componentProps } = props
    return (
      <TooltipProvider container={tooltipContainer}>
        <Component {...(componentProps as P)} />
      </TooltipProvider>
    )
  }

  WrappedComponent.displayName = `withTooltipProvider(${Component.displayName || Component.name})`
  return WrappedComponent
}
