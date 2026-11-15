import type { ReactNode } from "react";

type SectionLabelProps = {
  children: ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <span className="text-sm font-semibold uppercase tracking-widest text-brand-text">
      {children}
    </span>
  );
}
