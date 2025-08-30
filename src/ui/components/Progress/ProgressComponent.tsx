import { forwardRef, useMemo } from 'react'
import { cn } from '~/ui/utils'
import {
  barIndicatorVariants,
  barTrackVariants,
  circularSizeVariants,
  circularToneClasses,
  progressWrapperVariants,
} from './ProgressStyles'
import type { ProgressProps } from './ProgressTypes'

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      variant = 'bar',
      size = 'md',
      tone = 'primary',
      indeterminate,
      label = 'Progresso',
      showLabel = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const clamped = Math.min(Math.max(value, 0), max)
    const percent = (clamped / max) * 100

    const indicatorStyle = useMemo(() => {
      if (indeterminate) return { width: '40%' }
      return { width: `${percent}%` }
    }, [percent, indeterminate])

    if (variant === 'circular') {
      const cfg = circularSizeVariants[size]
      const radius = (cfg.size - cfg.stroke * 2) / 2
      const circumference = 2 * Math.PI * radius
      const offset = indeterminate
        ? circumference * 0.6
        : circumference - (percent / 100) * circumference

      return (
        <div
          ref={ref}
          className={cn(
            progressWrapperVariants({ variant, size }),
            className,
            'relative'
          )}
          role="progressbar"
          aria-label={label}
          aria-valuemin={indeterminate ? undefined : 0}
          aria-valuemax={indeterminate ? undefined : max}
          aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
          {...rest}
          style={style}
        >
          <svg
            className={cn(
              'block',
              circularToneClasses[tone],
              indeterminate && 'animate-spin'
            )}
            width={cfg.size}
            height={cfg.size}
            viewBox={`0 0 ${cfg.size} ${cfg.size}`}
          >
            <circle
              className="text-gray-200 dark:text-gray-700"
              stroke="currentColor"
              strokeWidth={cfg.stroke}
              fill="transparent"
              cx={cfg.size / 2}
              cy={cfg.size / 2}
              r={radius}
            />
            <circle
              className="transition-[stroke-dashoffset] duration-300 ease-out"
              stroke="currentColor"
              strokeWidth={cfg.stroke}
              strokeLinecap="round"
              fill="transparent"
              cx={cfg.size / 2}
              cy={cfg.size / 2}
              r={radius}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          {showLabel && !indeterminate && (
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )
    }

    // Bar variant -----------------------------------------------------------

    return (
      <div
        ref={ref}
        className={cn(progressWrapperVariants({ variant, size }), className)}
        role="progressbar"
        aria-label={label}
        aria-valuemin={indeterminate ? undefined : 0}
        aria-valuemax={indeterminate ? undefined : max}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        {...rest}
        style={style}
      >
        <div className={cn(barTrackVariants({ size }), 'relative overflow-hidden')}>
          {indeterminate ? (
            <div
              className={cn(
                barIndicatorVariants({ tone }),
                'absolute top-0 h-full w-[30%] -left-[30%] animate-progress-indeterminate'
              )}
            />
          ) : (
            <div className={cn(barIndicatorVariants({ tone }))} style={indicatorStyle} />
          )}
        </div>
        {showLabel && !indeterminate && (
          <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
            {Math.round(percent)}%
          </span>
        )}
      </div>
    )
  }
)

Progress.displayName = 'Progress'
