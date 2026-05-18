import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full resize-none rounded-md border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-fit-green/70 focus:ring-2 focus:ring-fit-green/15",
        className,
      )}
      {...props}
    />
  );
}
