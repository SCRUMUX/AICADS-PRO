import React from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockAction } from '../../_shared/BlockAction';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { BlockGrid } from '../../_shared/BlockGrid';
import {
  BLOCK_ACTIONS_ROW_CLASS,
  BLOCK_GRID_BASE_CLASS,
  BLOCK_SPLIT_CLASS,
} from '../../_shared/blockLayout';
import { Badge } from '../../../components/primitives/Badge';
import { cn } from '../../../components/primitives/_shared';
import { HeroMetricsBand } from './HeroMetricsBand';
import { HeroBreadcrumb, type HeroBreadcrumbItem } from './HeroBreadcrumb';

export interface HeroBlockAction {
  label: string;
  onClick?: () => void;
  href?: string;
}

export interface HeroStat {
  value: string;
  label: string;
}

export type { HeroBreadcrumbItem } from './HeroBreadcrumb';

export interface HeroBlockProps {
  title: string;
  subtitle?: string;
  badge?: string;
  /** Inner-page hero — breadcrumb trail above badge and title. */
  breadcrumbs?: HeroBreadcrumbItem[];
  align?: 'center' | 'left';
  /**
   * `centered` — classic SaaS hero (badge → title → subtitle → CTAs).
   * `split` — two-column hero with media.
   * `enterprise` — Cortel-style B2B hero: split stage + bottom metrics band.
   * `page` — inner page hero: breadcrumbs → badge → title (Cortel case study).
   */
  variant?: 'centered' | 'split' | 'enterprise' | 'page';
  /** Full-bleed section background — use `brand` with overlay enterprise navbar. */
  appearance?: 'base' | 'surface' | 'muted' | 'brand' | 'inverse';
  /** Shown in split / enterprise layout (right column on desktop). */
  media?: React.ReactNode;
  stats?: HeroStat[];
  primaryAction?: HeroBlockAction;
  secondaryAction?: HeroBlockAction;
  className?: string;
}

function HeroActions({
  primaryAction,
  secondaryAction,
  centered,
  onBrand,
  enterprise,
}: {
  primaryAction?: HeroBlockAction;
  secondaryAction?: HeroBlockAction;
  centered?: boolean;
  onBrand?: boolean;
  enterprise?: boolean;
}) {
  if (!primaryAction && !secondaryAction) return null;

  const primaryAppearance = enterprise && onBrand ? 'outline' : 'brand';

  return (
    <div
      className={cn(BLOCK_ACTIONS_ROW_CLASS, centered && 'justify-center')}
      style={{ gap: 'var(--space-section-stack-m)' }}
    >
      {primaryAction ? (
        <BlockAction
          label={primaryAction.label}
          onClick={primaryAction.onClick}
          href={primaryAction.href}
          appearance={primaryAppearance}
          size="lg"
          onBrand={onBrand}
        />
      ) : null}
      {secondaryAction ? (
        <BlockAction
          label={secondaryAction.label}
          onClick={secondaryAction.onClick}
          href={secondaryAction.href}
          appearance="outline"
          size="lg"
          onBrand={onBrand}
        />
      ) : null}
    </div>
  );
}

function HeroPageLayout({
  title,
  badge,
  breadcrumbs = [],
  onBrand,
}: {
  title: string;
  badge?: string;
  breadcrumbs?: HeroBreadcrumbItem[];
  onBrand: boolean;
}) {
  return (
    <div
      className="flex w-full min-w-0 flex-col items-start text-left"
      style={{ gap: 'var(--space-section-content-m)' }}
    >
      {breadcrumbs.length > 0 ? (
        <HeroBreadcrumb items={breadcrumbs} onBrand={onBrand} />
      ) : null}

      {badge ? (
        <Badge appearance={onBrand ? 'outline' : 'brand'} size="md">
          {badge}
        </Badge>
      ) : null}

      <h1
        className={cn(
          'm-0 max-w-[var(--space-800)] text-style-display font-semibold tracking-tight',
          onBrand ? 'text-inherit' : 'text-[var(--color-text-primary)]',
        )}
      >
        {title}
      </h1>
    </div>
  );
}

function HeroEnterpriseLayout({
  title,
  subtitle,
  badge,
  stats,
  media,
  primaryAction,
  secondaryAction,
  onBrand,
}: Pick<
  HeroBlockProps,
  'title' | 'subtitle' | 'badge' | 'stats' | 'media' | 'primaryAction' | 'secondaryAction'
> & { onBrand: boolean }) {
  return (
    <div
      className="flex w-full min-w-0 flex-col"
      style={{
        minHeight: 'var(--space-360)',
        gap: 'var(--space-section-y-l)',
      }}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-start">
        <div
          className={cn(
            BLOCK_GRID_BASE_CLASS,
            'grid-cols-1 min-[1024px]:grid-cols-2 min-[1024px]:items-end',
          )}
        >
          <div
            className="flex w-full min-w-0 flex-col items-start text-left"
            style={{ gap: 'var(--space-section-content-xl)' }}
          >
            {badge ? (
              <Badge appearance={onBrand ? 'outline' : 'brand'} size="md">
                {badge}
              </Badge>
            ) : null}

            <h1
              className={cn(
                'm-0 max-w-[var(--space-640)] text-style-display font-semibold tracking-tight',
                onBrand ? 'text-inherit' : 'text-[var(--color-text-primary)]',
              )}
            >
              {title}
            </h1>

            <HeroActions
              primaryAction={primaryAction}
              secondaryAction={secondaryAction}
              onBrand={onBrand}
              enterprise
            />
          </div>

          {media ? (
            <div className="hidden w-full min-w-0 min-[1024px]:flex min-[1024px]:items-end min-[1024px]:justify-end">
              {media}
            </div>
          ) : null}
        </div>
      </div>

      <HeroMetricsBand stats={stats} description={subtitle} onBrand={onBrand} />
    </div>
  );
}

export const HeroBlock: React.FC<HeroBlockProps> = ({
  title,
  subtitle,
  badge,
  breadcrumbs,
  align = 'center',
  variant = 'centered',
  appearance = 'base',
  media,
  stats,
  primaryAction,
  secondaryAction,
  className,
}) => {
  const page = variant === 'page';
  const enterprise = variant === 'enterprise';
  const centered = !enterprise && !page && variant === 'centered' && align === 'center';
  const split = variant === 'split';
  const resolvedAppearance = page && appearance === 'base' ? 'brand' : appearance;
  const onBrandResolved = resolvedAppearance === 'brand';
  const heroRecipe = page ? 'section.hero.page' : 'section.hero';

  const actions = (
    <HeroActions
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      centered={centered}
      onBrand={onBrandResolved}
    />
  );

  const statsRow = stats && stats.length > 0 && !enterprise && !page && (
    <BlockGrid columns={Math.min(stats.length, 4) as 1 | 2 | 3 | 4}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={cn('flex flex-col', centered && 'items-center text-center')}
          style={{ gap: 'var(--space-section-stack-s)' }}
        >
          <span
            className={cn(
              'text-style-h2 font-semibold tabular-nums',
              onBrandResolved ? 'text-inherit' : 'text-[var(--color-text-primary)]',
            )}
          >
            {stat.value}
          </span>
          <span
            className={cn(
              'text-style-body-sm',
              onBrandResolved ? 'text-inherit opacity-90' : 'text-[var(--color-text-secondary)]',
            )}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </BlockGrid>
  );

  const copy = page ? (
    <HeroPageLayout
      title={title}
      badge={badge}
      breadcrumbs={breadcrumbs}
      onBrand={onBrandResolved}
    />
  ) : enterprise ? (
    <HeroEnterpriseLayout
      title={title}
      subtitle={subtitle}
      badge={badge}
      stats={stats}
      media={media}
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
      onBrand={onBrandResolved}
    />
  ) : (
    <div
      className={cn(
        'flex w-full min-w-0 flex-col',
        centered ? 'items-center text-center' : 'items-start text-left',
      )}
      style={{ gap: 'var(--space-section-content-m)' }}
    >
      {badge && !split ? (
        <Badge appearance={onBrandResolved ? 'outline' : 'brand'} size="md">
          {badge}
        </Badge>
      ) : null}
      <BlockSectionHeader
        eyebrow={split ? badge : undefined}
        title={title}
        subtitle={subtitle}
        align={centered ? 'center' : 'left'}
        titleScale="display"
        onBrand={onBrandResolved}
      />
      {actions}
      {statsRow}
    </div>
  );

  return (
    <SectionShell
      recipe={heroRecipe}
      appearance={resolvedAppearance}
      className={className}
      aria-label="Hero"
      bleedMedia={!split && !enterprise && !page && media ? media : undefined}
    >
      {split ? (
        <div className={BLOCK_SPLIT_CLASS}>
          {copy}
          {media ? (
            <div className="w-full min-w-0 overflow-hidden rounded-[var(--radius-medium)] border border-[var(--color-border-base)] bg-[var(--color-surface-2)]">
              {media}
            </div>
          ) : null}
        </div>
      ) : (
        copy
      )}
    </SectionShell>
  );
};

HeroBlock.displayName = 'HeroBlock';
