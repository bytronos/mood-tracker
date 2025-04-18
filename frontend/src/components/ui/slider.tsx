import * as React from "react";
import { cn } from "../../lib/utils";

export interface SliderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  minLabel?: string;
  maxLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, label, minLabel, maxLabel, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && <div className="font-medium text-sm">{label}</div>}
        <div className="flex items-center gap-2">
          {minLabel && <span className="text-xs text-muted-foreground">{minLabel}</span>}
          <input
            type="range"
            className={cn(
              "w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer",
              "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
              "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0",
              className
            )}
            ref={ref}
            {...props}
          />
          {maxLabel && <span className="text-xs text-muted-foreground">{maxLabel}</span>}
        </div>
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };