"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utils ---
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Card ---
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative rounded-[40px] border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-2xl text-gray-50 shadow-2xl transition-all duration-700 hover:border-white/20 hover:from-white/[0.08] hover:to-white/[0.02] overflow-hidden group/card",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-8", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-bold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400 font-medium", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-8 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-8 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };

// --- Button ---
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_0_0_1px_rgba(234,88,12,0.4),0_20px_40px_-10px_rgba(234,88,12,0.3)] hover:shadow-[0_0_0_1px_rgba(234,88,12,0.6),0_25px_50px_-12px_rgba(234,88,12,0.5)] hover:-translate-y-0.5",
        destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg",
        outline: "border-2 border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 shadow-xl",
        secondary: "bg-white text-gray-950 hover:bg-gray-100 shadow-xl",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5",
        link: "text-orange-600 underline-offset-8 hover:underline lowercase tracking-normal font-bold",
      },
      size: {
        default: "h-14 px-8 text-xs",
        sm: "h-11 px-6 text-[10px]",
        lg: "h-16 px-10 text-sm",
        xl: "h-20 px-12 text-base",
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

// --- Input & Textarea ---
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-16 w-full rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-2 text-base ring-offset-orange-600 transition-all duration-500 placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 text-white",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      className={cn(
        "flex min-h-[160px] w-full rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-6 text-base ring-offset-orange-600 transition-all duration-500 placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50 text-white",
        className
      )}
      ref={ref}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
