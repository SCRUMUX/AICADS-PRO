import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { SOLUTIONS_DESKTOP_GRID_CLASS, SOLUTIONS_SCROLL_STRIP_CLASS } from '../../_shared/blockLayout';
import { cn } from '../../../components/primitives/_shared';
import { SolutionCard } from './SolutionCard';
import { getSolutionGridSpanClass } from './solutionsGrid';
import type { SolutionsBlockProps } from './SolutionsBlock.types';

export type {
  SolutionsBlockProps,
  SolutionItem,
  SolutionsViewAllAction,
} from './SolutionsBlock.types';

export const SolutionsBlock: React.FC<SolutionsBlockProps> = ({
  title = 'Реализованные решения',
  subtitle,
  solutions,
  desktopVisibleCount = 6,
  viewAll,
  className,
}) => {
  if (solutions.length === 0) return null;

  const desktopItems = solutions.slice(0, desktopVisibleCount);
  const viewAllLabel = viewAll?.label ?? 'Смотреть все паттерны';

  return (
    <SectionShell
      recipe="section.solutions"
      appearance="muted"
      className={className}
      aria-label="Solutions"
    >
      <div
        className={cn(
          'flex w-full min-w-0 items-center justify-between',
          'mb-[var(--space-section-content-m)] min-[1024px]:mb-[var(--space-64)]',
        )}
      >
        <div className="flex min-w-0 flex-col" style={{ gap: 'var(--space-section-stack-s)' }}>
          <h2 className="m-0 font-medium text-style-h1 text-[var(--color-text-primary)]">{title}</h2>
          {subtitle ? (
            <p className="m-0 max-w-[var(--space-640)] text-style-body-lg text-[var(--color-text-secondary)]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {viewAll ? (
          <BlockAction
            label={viewAllLabel}
            href={viewAll.href}
            appearance="outline"
            size="lg"
            className="hidden min-[1024px]:inline-flex"
          />
        ) : null}
      </div>

      <div className={cn(SOLUTIONS_DESKTOP_GRID_CLASS, 'hidden min-[1024px]:grid')}>
        {desktopItems.map((item, index) => (
          <SolutionCard
            key={item.id ?? `${item.client}-${item.title}`}
            {...item}
            className={getSolutionGridSpanClass(index)}
          />
        ))}
      </div>

      <div className={cn(SOLUTIONS_SCROLL_STRIP_CLASS, 'min-[1024px]:hidden')}>
        {solutions.map((item) => (
          <SolutionCard key={item.id ?? `${item.client}-${item.title}`} {...item} />
        ))}
      </div>

      {viewAll ? (
        <div className="mt-[var(--space-section-content-m)] min-[1024px]:hidden">
          <BlockAction label={viewAllLabel} href={viewAll.href} appearance="outline" size="lg" />
        </div>
      ) : null}
    </SectionShell>
  );
};

SolutionsBlock.displayName = 'SolutionsBlock';
