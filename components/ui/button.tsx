import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fit-green/70 disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      variant: {
        default:
          "bg-fit-green text-slate-950 shadow-[0_0_26px_rgba(61,255,145,0.22)] hover:bg-emerald-300",
        secondary:
          "border border-white/10 bg-white/8 text-white hover:border-fit-cyan/50 hover:bg-white/12",
        ghost:
          "text-slate-300 hover:bg-white/8 hover:text-white",
        outline:
          "border border-fit-line bg-transparent text-slate-200 hover:border-fit-green/50 hover:bg-fit-green/10",
        danger:
          "border border-rose-400/30 bg-rose-500/12 text-rose-100 hover:border-rose-300/60 hover:bg-rose-500/18",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    />
  );
}
