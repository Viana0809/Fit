import * as React from "react";
import { cn } from "@/lib/utils";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-10 w-full rounded-md border border-white/10 bg-slate-950/70 px-3 text-sm text-white outline-none transition-all focus:border-fit-cyan/70 focus:ring-2 focus:ring-fit-cyan/15",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
