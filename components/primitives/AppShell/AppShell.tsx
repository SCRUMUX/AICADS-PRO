import React from 'react';
import type { AppShellProps } from './AppShell.types';
import { cn, findClasses, type VR } from '../_shared';
import contract from '../../../contracts/components/AppShell.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>((props, ref) => {
  const { sidebar, children, className, ...rest } = props;
  const layoutClasses = findClasses(rules, {});

  return (
    <div
      ref={ref}
      className={cn(
        'min-h-screen w-full grid grid-cols-1 tablet:grid-cols-[var(--space-sidebar)_minmax(0,1fr)]',
        'bg-[var(--color-bg-base)] bg-[image:var(--gradient-glow)] bg-no-repeat',
        ...layoutClasses,
        className,
      )}
      {...rest}
    >
      {sidebar}
      <div className="min-w-0">{children}</div>
    </div>
  );
});

AppShell.displayName = 'AppShell';
