import React from 'react';
import { cn } from '../../../components/primitives/_shared';
import { ArrowUpRightIcon, SolutionCategoryIcon } from './SolutionsBlockIcons';
import type { SolutionItem } from './SolutionsBlock.types';

export interface SolutionCardProps extends SolutionItem {
  className?: string;
}

const CATEGORY_PILL_CLASS = cn(
  'inline-flex w-fit max-w-full items-center text-nowrap',
  'rounded-[var(--radius-large)] bg-[var(--color-surface-2)]',
  'text-style-caption-xs text-[var(--color-text-secondary)]',
  'h-[var(--space-28)] px-[var(--space-3)] gap-[var(--space-1)]',
  'transition-colors duration-200',
  'min-[1024px]:group-hover:bg-[var(--color-surface-1)] min-[1024px]:group-hover:text-[var(--color-brand-primary)]',
);

const META_PILL_CLASS = cn(
  'inline-flex w-fit max-w-full items-center text-nowrap',
  'rounded-[var(--radius-large)] bg-[var(--color-surface-2)]',
  'text-style-caption-xs text-[var(--color-text-secondary)]',
  'h-[var(--space-22)] px-[var(--space-3)]',
  'transition-colors duration-200',
  'min-[1024px]:group-hover:bg-[var(--color-surface-1)] min-[1024px]:group-hover:text-[var(--color-text-primary)]',
);

const CARD_SHELL_CLASS = cn(
  'group relative flex h-full w-full min-w-0 cursor-pointer overflow-hidden',
  'rounded-[var(--radius-section)] border border-[var(--color-border-base)] bg-[var(--color-surface-1)]',
  'p-[var(--space-inset-l)]',
  'transition-[border-color,box-shadow] duration-200 ease-out',
  'hover:border-transparent',
  'no-underline text-inherit',
);

const ARROW_BUTTON_CLASS = cn(
  'inline-flex shrink-0 items-center justify-center',
  'h-[var(--space-32)] w-[var(--space-32)]',
  'rounded-[var(--radius-large)] border border-transparent',
  'bg-[var(--color-brand-primary)] text-[var(--color-text-on-brand)]',
  'transition-colors duration-200',
  'min-[1024px]:group-hover:border-[var(--color-border-base)] min-[1024px]:group-hover:bg-[var(--color-surface-1)] min-[1024px]:group-hover:text-[var(--color-brand-primary)]',
);

const CATEGORY_ICON_CLASS = cn(
  'h-[var(--space-16)] w-[var(--space-16)] text-[var(--color-brand-primary)]',
  'transition-colors duration-200',
  'min-[1024px]:group-hover:text-[var(--color-brand-primary)]',
);

function SolutionCardCover({
  imageSrc,
  imageAlt,
  cover,
}: Pick<SolutionItem, 'imageSrc' | 'imageAlt' | 'cover'>) {
  return (
    <>
      <div
        className={cn(
          'absolute inset-0 z-0 bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-hover)]',
          'opacity-0 transition-opacity duration-200',
          'min-[1024px]:group-hover:opacity-100',
        )}
        aria-hidden="true"
      />
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={imageAlt ?? ''}
          className={cn(
            'absolute inset-0 z-[1] h-full w-full object-cover mix-blend-overlay',
            'opacity-0 transition-opacity duration-200',
            'min-[1024px]:group-hover:opacity-60',
          )}
        />
      ) : null}
      {cover ? (
        <div
          className={cn(
            'absolute inset-0 z-[1] opacity-0 transition-opacity duration-200',
            'min-[1024px]:group-hover:opacity-100',
          )}
        >
          {cover}
        </div>
      ) : null}
    </>
  );
}

function SolutionCardBody({ item }: { item: SolutionItem }) {
  const bodyLines = item.highlights ?? (item.description ? [item.description] : []);

  return (
    <>
      <div className={CATEGORY_PILL_CLASS}>
        {item.categoryIcon ?? <SolutionCategoryIcon className={CATEGORY_ICON_CLASS} />}
        <span>{item.category}</span>
      </div>

      <h3
        className={cn(
          'm-0 mt-[var(--space-section-stack-m)] font-medium text-[var(--color-text-primary)]',
          'text-style-h3 min-[1024px]:text-style-h4',
          'transition-colors duration-200',
          'min-[1024px]:group-hover:text-[var(--color-text-on-brand)]',
        )}
      >
        {item.title}
      </h3>

      {bodyLines.length > 0 ? (
        <div
          className={cn(
            'mt-[var(--space-section-stack-m)] overflow-hidden text-[var(--color-text-secondary)]',
            'text-style-body-sm min-[1024px]:max-h-[var(--space-80)] min-[1024px]:text-style-body',
            'min-[1024px]:group-hover:hidden',
          )}
        >
          {bodyLines.map((line, index) => (
            <p key={`${line}-${index}`} className="m-0">
              {line}
            </p>
          ))}
        </div>
      ) : null}
    </>
  );
}

function SolutionCardFooter({ client, date }: Pick<SolutionItem, 'client' | 'date'>) {
  return (
    <div className="flex w-full items-end justify-between gap-[var(--space-section-stack-s)]">
      <div className="flex min-w-0 flex-wrap items-center" style={{ gap: 'var(--space-1)' }}>
        <span className={META_PILL_CLASS}>{client}</span>
        <time className={META_PILL_CLASS} dateTime={date}>
          {date}
        </time>
      </div>
      <span className={ARROW_BUTTON_CLASS} aria-hidden="true">
        <ArrowUpRightIcon />
      </span>
    </div>
  );
}

export const SolutionCard: React.FC<SolutionCardProps> = (props) => {
  const {
    category,
    categoryIcon,
    title,
    description,
    highlights,
    client,
    date,
    href,
    imageSrc,
    imageAlt,
    cover,
    className,
    id,
  } = props;

  const item: SolutionItem = {
    id,
    category,
    categoryIcon,
    title,
    description,
    highlights,
    client,
    date,
    href,
    imageSrc,
    imageAlt,
    cover,
  };

  const content = (
    <>
      <SolutionCardCover imageSrc={imageSrc} imageAlt={imageAlt} cover={cover} />
      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-[2] bg-[var(--color-surface-1)]',
          'opacity-100 transition-opacity duration-200',
          'min-[1024px]:group-hover:opacity-0',
        )}
        aria-hidden="true"
      />
      <div className="relative z-[3] flex h-full min-h-0 flex-col justify-between">
        <div>
          <SolutionCardBody item={item} />
        </div>
        <div className="mt-[var(--space-section-content-m)]">
          <SolutionCardFooter client={client} date={date} />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn(CARD_SHELL_CLASS, className)}>
        {content}
      </a>
    );
  }

  return <article className={cn(CARD_SHELL_CLASS, className)}>{content}</article>;
};

SolutionCard.displayName = 'SolutionCard';
