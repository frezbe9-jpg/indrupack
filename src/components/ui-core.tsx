"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// --- Card (Pro Max Glassmorphism) ---
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("glass rounded-4xl", className)} {...props} />
  )
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-2 p-10", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-3xl font-black uppercase tracking-tighter leading-none", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-gray-400 font-medium leading-relaxed", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-10 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardDescription, CardContent };

// --- Button (Systematic Variants) ---
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-2xl shadow-primary/20 hover:bg-orange-500",
        outline: "border border-border hover:bg-white/[0.05] hover:border-white/20",
        secondary: "bg-white text-background hover:bg-gray-100",
        ghost: "hover:bg-white/5",
        destructive: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-11 px-6",
        lg: "h-18 px-10 text-[12px]",
        xl: "h-24 px-12 text-[14px]",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };

// --- Input & Textarea ---
const inputStyles = "flex w-full rounded-2xl border border-border bg-white/[0.03] px-6 py-4 text-base font-medium ring-offset-primary transition-all duration-300 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/[0.06]";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input type={type} className={cn(inputStyles, "h-16", className)} ref={ref} {...props} />
  )
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea className={cn(inputStyles, "min-h-[160px] py-6", className)} ref={ref} {...props} />
  )
);
Textarea.displayName = "Textarea";
