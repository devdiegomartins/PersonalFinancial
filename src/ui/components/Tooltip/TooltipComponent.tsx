import { AnimatePresence, motion } from 'framer-motion'
import React, {
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '~/ui/utils'
import { tooltipArrowVariants, tooltipVariants } from './TooltipStyles'
import type { TooltipPosition, TooltipProps, TooltipRef } from './TooltipTypes'

const Tooltip = React.forwardRef<TooltipRef, TooltipProps>(
  (
    {
      children,
      value,
      content,
      position = ['top', 'bottom', 'right', 'left'],
      variant,
      size,
      isVisible: controlledIsVisible,
      showDelay = 500,
      hideDelay = 150,
      disabled = false,
      offset = 8,
      maxWidth,
      className,
      arrowClassName,
      ...rest
    },
    ref
  ) => {
    const tooltipId = useId()
    const [internalIsVisible, setInternalIsVisible] = useState(false)
    const [currentPosition, setCurrentPosition] = useState<TooltipPosition>(position[0])
    const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0 })
    const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null)

    const triggerRef = useRef<HTMLElement | null>(null)
    const tooltipRef = useRef<HTMLDivElement>(null)
    const showTimeoutRef = useRef<NodeJS.Timeout>()
    const hideTimeoutRef = useRef<NodeJS.Timeout>()

    // Setup portal root
    useEffect(() => {
      const tooltipContainer = document.createElement('div')
      tooltipContainer.id = `tooltip-root-${tooltipId}`
      tooltipContainer.className = 'tooltip-portal-container'
      tooltipContainer.style.position = 'absolute'
      tooltipContainer.style.top = '0'
      tooltipContainer.style.left = '0'
      tooltipContainer.style.pointerEvents = 'none'
      tooltipContainer.style.zIndex = '1000'
      document.body.appendChild(tooltipContainer)
      setPortalRoot(tooltipContainer)

      return () => {
        if (tooltipContainer.parentNode) {
          document.body.removeChild(tooltipContainer)
        }
      }
    }, [tooltipId])

    // Determine if tooltip is controlled or uncontrolled
    const isControlled = controlledIsVisible !== undefined
    const isVisible = isControlled ? controlledIsVisible : internalIsVisible

    const show = useCallback(() => {
      if (disabled) return
      clearTimeout(hideTimeoutRef.current)
      if (!isVisible) {
        setInternalIsVisible(true)
      }
    }, [disabled, isVisible])

    const hide = useCallback(() => {
      if (disabled) return
      clearTimeout(showTimeoutRef.current)
      if (isVisible) {
        setInternalIsVisible(false)
      }
    }, [disabled, isVisible])

    const toggle = useCallback(() => {
      isVisible ? hide() : show()
    }, [isVisible, show, hide])

    // Calculate tooltip position
    const calculatePosition = useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return

      const trigger = triggerRef.current.getBoundingClientRect()
      const tooltip = tooltipRef.current.getBoundingClientRect()
      const scrollX = window.pageXOffset || document.documentElement.scrollLeft
      const scrollY = window.pageYOffset || document.documentElement.scrollTop
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      // Test each position in priority order
      for (const pos of position) {
        let x = 0
        let y = 0
        let fits = false

        // Calculate absolute coordinates including scroll offset
        switch (pos) {
          case 'top':
            x = trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2
            y = trigger.top + scrollY - tooltip.height - offset
            fits =
              trigger.top - tooltip.height - offset >= 0 &&
              trigger.left + trigger.width / 2 - tooltip.width / 2 >= 0 &&
              trigger.left + trigger.width / 2 + tooltip.width / 2 <= viewport.width
            break
          case 'bottom':
            x = trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2
            y = trigger.top + scrollY + trigger.height + offset
            fits =
              trigger.top + trigger.height + tooltip.height + offset <= viewport.height &&
              trigger.left + trigger.width / 2 - tooltip.width / 2 >= 0 &&
              trigger.left + trigger.width / 2 + tooltip.width / 2 <= viewport.width
            break
          case 'left':
            x = trigger.left + scrollX - tooltip.width - offset
            y = trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2
            fits =
              trigger.left - tooltip.width - offset >= 0 &&
              trigger.top + trigger.height / 2 - tooltip.height / 2 >= 0 &&
              trigger.top + trigger.height / 2 + tooltip.height / 2 <= viewport.height
            break
          case 'right':
            x = trigger.left + scrollX + trigger.width + offset
            y = trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2
            fits =
              trigger.left + trigger.width + tooltip.width + offset <= viewport.width &&
              trigger.top + trigger.height / 2 - tooltip.height / 2 >= 0 &&
              trigger.top + trigger.height / 2 + tooltip.height / 2 <= viewport.height
            break
        }

        if (fits) {
          setCurrentPosition(pos)
          setTooltipCoords({ x, y })
          return
        }
      }

      // Fallback to first position with boundary constraints
      const fallbackPos = position[0]
      let x = 0
      let y = 0

      switch (fallbackPos) {
        case 'top':
          x = Math.max(
            8 + scrollX,
            Math.min(
              trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2,
              viewport.width - tooltip.width - 8 + scrollX
            )
          )
          y = Math.max(8 + scrollY, trigger.top + scrollY - tooltip.height - offset)
          break
        case 'bottom':
          x = Math.max(
            8 + scrollX,
            Math.min(
              trigger.left + scrollX + trigger.width / 2 - tooltip.width / 2,
              viewport.width - tooltip.width - 8 + scrollX
            )
          )
          y = Math.min(
            viewport.height - tooltip.height - 8 + scrollY,
            trigger.top + scrollY + trigger.height + offset
          )
          break
        case 'left':
          x = Math.max(8 + scrollX, trigger.left + scrollX - tooltip.width - offset)
          y = Math.max(
            8 + scrollY,
            Math.min(
              trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2,
              viewport.height - tooltip.height - 8 + scrollY
            )
          )
          break
        case 'right':
          x = Math.min(
            viewport.width - tooltip.width - 8 + scrollX,
            trigger.left + scrollX + trigger.width + offset
          )
          y = Math.max(
            8 + scrollY,
            Math.min(
              trigger.top + scrollY + trigger.height / 2 - tooltip.height / 2,
              viewport.height - tooltip.height - 8 + scrollY
            )
          )
          break
      }

      setCurrentPosition(fallbackPos)
      setTooltipCoords({ x, y })
    }, [position, offset])

    // Update position when visible or on scroll/resize
    useLayoutEffect(() => {
      if (!isVisible || !triggerRef.current) return

      const updatePosition = () => {
        requestAnimationFrame(calculatePosition)
      }

      // Initial position calculation with small delay to ensure DOM is ready
      const timeoutId = setTimeout(updatePosition, 1)

      // Listen for scroll and resize events
      const handleScroll = () => updatePosition()
      const handleResize = () => updatePosition()

      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleResize, { passive: true })
      document.addEventListener('scroll', handleScroll, { passive: true, capture: true })

      return () => {
        clearTimeout(timeoutId)
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
        document.removeEventListener('scroll', handleScroll, true)
      }
    }, [isVisible, calculatePosition])

    // Handle mouse events for hover behavior
    const handleMouseEnter = useCallback(() => {
      if (disabled || isControlled) return
      clearTimeout(hideTimeoutRef.current)
      showTimeoutRef.current = setTimeout(show, showDelay)
    }, [disabled, isControlled, show, showDelay])

    const handleMouseLeave = useCallback(() => {
      if (disabled || isControlled) return
      clearTimeout(showTimeoutRef.current)
      hideTimeoutRef.current = setTimeout(hide, hideDelay)
    }, [disabled, isControlled, hide, hideDelay])

    // Handle focus events for accessibility
    const handleFocus = useCallback(() => {
      if (disabled || isControlled) return
      show()
    }, [disabled, isControlled, show])

    const handleBlur = useCallback(() => {
      if (disabled || isControlled) return
      hide()
    }, [disabled, isControlled, hide])

    // Cleanup timeouts on unmount
    useEffect(() => {
      return () => {
        clearTimeout(showTimeoutRef.current)
        clearTimeout(hideTimeoutRef.current)
      }
    }, [])

    // Expose imperative handle
    useImperativeHandle(
      ref,
      () => ({
        show,
        hide,
        toggle,
        isVisible,
      }),
      [show, hide, toggle, isVisible]
    )

    // Clone children to add event handlers and ref
    const triggerElement = React.cloneElement(
      React.Children.only(children) as React.ReactElement,
      {
        ref: (node: HTMLElement) => {
          triggerRef.current = node
        },
        onMouseEnter: (e: React.MouseEvent) => {
          handleMouseEnter()
          const childElement = children as React.ReactElement
          const existingHandler = childElement.props?.onMouseEnter
          existingHandler?.(e)
        },
        onMouseLeave: (e: React.MouseEvent) => {
          handleMouseLeave()
          const childElement = children as React.ReactElement
          const existingHandler = childElement.props?.onMouseLeave
          existingHandler?.(e)
        },
        onFocus: (e: React.FocusEvent) => {
          handleFocus()
          const childElement = children as React.ReactElement
          const existingHandler = childElement.props?.onFocus
          existingHandler?.(e)
        },
        onBlur: (e: React.FocusEvent) => {
          handleBlur()
          const childElement = children as React.ReactElement
          const existingHandler = childElement.props?.onBlur
          existingHandler?.(e)
        },
      }
    )

    // Tooltip content
    const tooltipContent = content || value

    // Animation variants
    const fadeVariants = {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    }

    // Render tooltip portal
    const tooltipPortal =
      portalRoot && tooltipContent
        ? createPortal(
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  key={`tooltip-${tooltipId}`}
                  ref={tooltipRef}
                  className={cn(
                    tooltipVariants({
                      variant,
                      size,
                    }),
                    'pointer-events-auto',
                    // Remove w-max quando maxWidth é definido para permitir quebra de linha
                    maxWidth && '!w-auto',
                    className
                  )}
                  style={{
                    position: 'absolute',
                    left: tooltipCoords.x,
                    top: tooltipCoords.y,
                    ...(maxWidth && {
                      maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
                    }),
                  }}
                  role="tooltip"
                  variants={fadeVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{
                    duration: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  {...rest}
                >
                  {tooltipContent}
                  {/* Arrow */}
                  <div
                    className={cn(
                      tooltipArrowVariants({
                        variant,
                        position: currentPosition,
                      }),
                      arrowClassName
                    )}
                  />
                </motion.div>
              )}
            </AnimatePresence>,
            portalRoot
          )
        : null

    return (
      <>
        {triggerElement}
        {tooltipPortal}
      </>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip }
