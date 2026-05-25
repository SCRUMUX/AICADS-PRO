import React from 'react';
import { BLOCK_CARD_COMPACT_CLASS } from '../../_shared/blockLayout';
import { cn } from '../../../components/primitives/_shared';
import { ArrowUpRightIcon } from './TrustBlockIcons';
import type { TrustStandardItem } from './TrustBlock.types';

export interface TrustStandardLinkProps extends TrustStandardItem {
  className?: string;
}

const LINK_ARROW_CLASS = cn(
  'inline-flex shrink-0 items-center justify-center',
  'h-[var(--space-24)] w-[var(--space-24)] min-[1024px]:h-[var(--space-32)] min-[1024px]:w-[var(--space-32)]',
  BLOCK_CARD_COMPACT_CLASS,
  'text-[var(--color-text-primary)] transition-colors duration-200',
  'group-hover:border-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-[var(--color-text-on-brand)]',
);

export const TrustStandardLink: React.FC<TrustStandardLinkProps> = ({
  title,
  description,
  href,
  className,
}) => {
  const label = (
    <>
      <span
        className={cn(
          'font-medium text-style-body transition-colors duration-200 min-[1024px]:text-style-h4',
          href && 'group-hover:text-[var(--color-brand-primary)]',
        )}
      >
        {title}
      </span>
      {href ? (
        <span className={LINK_ARROW_CLASS} aria-hidden="true">
          <ArrowUpRightIcon />
        </span>
      ) : null}
    </>
  );

  return (
    <div className={cn('flex w-full min-w-0 max-w-[var(--space-320)] flex-col', className)}>
      {href ? (
        <a
          href={href}
          className="group inline-flex w-fit max-w-full items-center gap-[var(--space-section-stack-s)] no-underline text-inherit min-[1024px]:gap-[var(--space-section-stack-m)]"
        >
          {label}
        </a>
      ) : (
        <div className="inline-flex w-fit max-w-full items-center gap-[var(--space-section-stack-s)] min-[1024px]:gap-[var(--space-section-stack-m)]">
          {label}
        </div>
      )}
      <p
        className={cn(
          'm-0 mt-[var(--space-section-stack-s)] max-w-[var(--space-200)]',
          'text-style-caption text-[var(--color-text-secondary)] min-[1024px]:mt-[var(--space-section-stack-m)]',
        )}
      >
        {description}
      </p>
    </div>
  );
};

TrustStandardLink.displayName = 'TrustStandardLink';
