import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-fit-green/70 focus:ring-2 focus:ring-fit-green/15",
        className,
      )}
      {...props}
    />
  );
}
