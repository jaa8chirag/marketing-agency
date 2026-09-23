import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}
