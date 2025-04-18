import * as React from "react";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  minLabel?: string;
  maxLabel?: string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className = "", label, minLabel, maxLabel, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <div className="font-medium text-sm">{label}</div>}
        <div className="flex items-center gap-2">
          {minLabel && <span className="text-xs text-gray-500 dark:text-gray-400">{minLabel}</span>}
          <div className="relative w-full h-2">
            <input
              type="range"
              className={`w-full h-2 rounded-lg appearance-none cursor-pointer
                bg-gray-200 dark:bg-gray-700
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 [&::-webkit-slider-thumb]:shadow
                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow
                ${className}`}
              ref={ref}
              {...props}
            />
          </div>
          {maxLabel && <span className="text-xs text-gray-500 dark:text-gray-400">{maxLabel}</span>}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";