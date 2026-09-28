import type { ReactNode } from "react";

export function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14 ${className}`}>
      {children}
    </div>
  );
}
