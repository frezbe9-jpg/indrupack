"use client";

import React from "react";
import { cn } from "../utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

// --- Card ---
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative rounded-3xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-8", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-black leading-none tracking-tight text-white uppercase", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-gray-400 font-medium", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };

// --- Button ---
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 active:scale-95 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-orange-600 text-white shadow-2xl shadow-orange-600/20 hover:bg-orange-500",
        outline: "border border-white/10 hover:bg-white/[0.05] hover:border-white/20 text-white",
        secondary: "bg-white text-gray-950 hover:bg-gray-100",
        ghost: "hover:bg-white/5 text-white",
        destructive: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-11 px-6",
        lg: "h-16 px-10 text-[12px]",
        xl: "h-20 px-12 text-[14px]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };

// --- Input ---
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-14 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };

// --- Textarea ---
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white font-medium placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all resize-none",
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";

export { Textarea };

// --- Select ---
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-14 w-full rounded-2xl border border-white/10 bg-gray-900 px-5 py-3 text-sm text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all appearance-none cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

export { Select };

// --- Badge ---
const Badge = ({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "destructive";
  className?: string;
}) => {
  const variants = {
    default: "bg-gray-800 text-gray-300",
    success: "bg-green-900/50 text-green-400 border border-green-800/50",
    warning: "bg-yellow-900/50 text-yellow-400 border border-yellow-800/50",
    info: "bg-blue-900/50 text-blue-400 border border-blue-800/50",
    destructive: "bg-red-900/50 text-red-400 border border-red-800/50",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-black uppercase tracking-widest",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export { Badge };
