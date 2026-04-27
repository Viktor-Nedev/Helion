import type { ReactNode } from "react";

import { StatusPill } from "./StatusPill";

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, badge, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        {badge ? <StatusPill label={badge} /> : null}
        <div>
          <h1 className="text-3xl font-bold text-white md:text-4xl">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">{description}</p>
        </div>
      </div>
      {actions}
    </div>
  );
}
