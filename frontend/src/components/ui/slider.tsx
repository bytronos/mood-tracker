import * as React from "react";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional label above the slider */
  label?: string;
  /** Label to show at minimum end */
  minLabel?: string;
  /** Label to show at maximum end */
  maxLabel?: string;
  /** Color for the filled portion of the track (CSS color) */
  fillColor?: string;
  /** Color for the unfilled portion of the track (CSS color) */
  emptyColor?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className = "",
      label,
      minLabel,
      maxLabel,
      fillColor = '#6366f1',
      emptyColor = '#e5e7eb',
      style,
      ...props
    },
    ref
  ) => {
    // Parse numeric values
    const min = Number(props.min ?? 0);
    const max = Number(props.max ?? 100);
    const value = Number(props.value ?? min);
    // Calculate filled percentage
    const pct = max > min ? ((value - min) * 100) / (max - min) : 0;
    // Build track background: filled then empty
    const background =
      `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${pct}%, ${emptyColor} ${pct}%, ${emptyColor} 100%)`;
    // Merge user style, override background, accent-color, and set thumb CSS variable
    const inputStyle = {
      ...(style as any),
      background,
      accentColor: fillColor,
      '--thumb-color': fillColor,
    } as React.CSSProperties;

    return (
      <div className="space-y-2">
        {label && <div className="font-medium text-sm">{label}</div>}
        <div className="flex items-center gap-2">
          {minLabel && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {minLabel}
            </span>
          )}
          <div className="relative w-full h-2">
            <input
              type="range"
              ref={ref}
              style={inputStyle}
              className={
                `w-full h-2 rounded-lg appearance-none cursor-pointer bg-transparent
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:shadow
                [&::-webkit-slider-thumb]:bg-[var(--thumb-color)]
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow
                [&::-moz-range-thumb]:bg-[var(--thumb-color)]
                ${className}`
              }
              {...props}
            />
          </div>
          {maxLabel && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {maxLabel}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";