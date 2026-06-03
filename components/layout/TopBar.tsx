"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
  className?: string;
};

export function TopBar({ title, showBack, right, className }: Props) {
  const router = useRouter();
  return (
    <div className={cn("sticky top-0 z-20 bg-bg/95 backdrop-blur-md border-b border-border", className)}>
      <div className="h-14 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 w-10">
          {showBack && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Back"
              className="p-1 -ml-1 text-secondary active:text-primary"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </div>
        <h1 className="text-base font-semibold text-primary">{title}</h1>
        <div className="w-10 flex items-center justify-end">{right}</div>
      </div>
    </div>
  );
}
