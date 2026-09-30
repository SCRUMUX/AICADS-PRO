import React from 'react';
import type { SidebarNavProps } from './SidebarNav.types';
import { cn, findClasses, type VR } from '../_shared';
import contract from '../../../contracts/components/SidebarNav.contract.json';
import { Link } from '../Link/Link';

const rules = (contract.variantRules || []) as unknown as VR[];

export const SidebarNav = React.forwardRef<HTMLElement, SidebarNavProps>((props, ref) => {
  const {
    brand,
    brandHref = '/',
    brandMark,
    brandName,
    brandSub,
    items = [],
    footer,
    className,
    ...rest
  } = props;
  const layoutClasses = findClasses(rules, {});

  const brandBlock = brand ?? (
    <a href={brandHref} className="flex items-center gap-[var(--space-content-m)] no-underline text-inherit">
      <span
        className={cn(
          'flex h-[var(--space-32)] w-[var(--space-32)] shrink-0 items-center justify-center',
          'rounded-[var(--radius-medium)] bg-[image:var(--gradient-brand)]',
          'text-[var(--color-text-on-brand)] shadow-brand text-style-body-strong',
        )}
        aria-hidden="true"
      >
        {brandMark ?? '⌁'}
      </span>
      <span className="min-w-0">
        {brandName ? (
          <span className="block text-style-h3 text-[var(--color-text-primary)]">{brandName}</span>
        ) : null}
        {brandSub ? (
          <span className="block text-style-caption-xs uppercase tracking-wide text-[var(--color-text-muted)]">
            {brandSub}
          </span>
        ) : null}
      </span>
    </a>
  );

  return (
    <aside
      ref={ref}
      className={cn(
        'flex flex-col gap-[var(--space-content-l)]',
        'p-[var(--space-inset-l)] tablet:sticky tablet:top-0 tablet:h-screen tablet:self-start',
        'bg-[var(--color-surface-1)] border-r border-[var(--color-border-base)]',
        ...layoutClasses,
        className,
      )}
      aria-label="Primary"
      {...rest}
    >
      <div>{brandBlock}</div>
      <nav className="flex flex-col gap-[var(--space-layout-s)]" aria-label="Sections">
        {items.map((item) => (
          <Link
            key={`${item.href}-${item.label}`}
            href={item.href}
            showRightIcon={false}
            size="sm"
            className={cn(
              'min-h-[var(--space-40)] px-[var(--space-inset-m)] rounded-[var(--radius-medium)] no-underline',
              item.active
                ? 'bg-[image:var(--gradient-brand)] text-[var(--color-text-on-brand)] shadow-brand'
                : 'text-[var(--color-text-secondary)]',
            )}
            aria-current={item.active ? 'page' : undefined}
          >
            <span className="inline-flex items-center gap-[var(--space-content-s)]">
              {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      {footer ? <div className="mt-auto">{footer}</div> : null}
    </aside>
  );
});

SidebarNav.displayName = 'SidebarNav';
