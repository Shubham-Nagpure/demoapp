"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress@1.1.2";

import { cn } from "./utils";

function Progress({
  className,
  value,
  variant = "default",
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  variant?: "default" | "blue" | "green" | "orange" | "purple" | "cyan";
}) {
  const getGradientClasses = (variant: string) => {
    switch (variant) {
      case "blue":
        return "bg-gradient-to-r from-blue-400 to-blue-600";
      case "green":
        return "bg-gradient-to-r from-green-400 to-green-600";
      case "orange":
        return "bg-gradient-to-r from-orange-400 to-orange-600";
      case "purple":
        return "bg-gradient-to-r from-purple-400 to-purple-600";
      case "cyan":
        return "bg-gradient-to-r from-cyan-400 to-cyan-600";
      default:
        return "bg-gradient-to-r from-blue-500 to-blue-700";
    }
  };

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-gray-200 relative h-2 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full w-full flex-1 transition-all shadow-sm",
          getGradientClasses(variant)
        )}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
