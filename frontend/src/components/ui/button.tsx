import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "default", children, ...props }, ref) => {
    // Base styles all buttons share
    let baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    // Variant styles
    const variantStyles = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow",
      secondary: "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600",
      outline: "border border-gray-300 dark:border-gray-600 bg-white dark:bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100",
      destructive: "bg-red-600 text-white hover:bg-red-700",
      link: "text-indigo-600 dark:text-indigo-400 underline-offset-4 hover:underline bg-transparent p-0 shadow-none"
    };
    
    // Size styles
    const sizeStyles = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-8 px-3 py-1 text-xs",
      lg: "h-12 px-8 py-3 text-base",
      icon: "h-10 w-10 p-0"
    };
    
    // Combine all styles
    const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button
        className={styles}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";