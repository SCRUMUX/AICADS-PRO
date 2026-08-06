import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SectionShell } from '../../_shared/SectionShell';
import {
  BLOG_DESKTOP_TRACK_CLASS,
  BLOG_DESKTOP_TRACK_VIEWPORT_CLASS,
  BLOG_HEADER_ROW_CLASS,
  BLOG_HEADER_TITLE_GROUP_CLASS,
  BLOG_SCROLL_STRIP_CLASS,
  BLOG_SCROLL_VIEWPORT_CLASS,
  BLOCK_BLOG_CHROME_CONTROL_CLASS,
  BLOCK_CHROME_SQUARE_CONTROL_CLASS,
} from '../../_shared/blockLayout';
import { cn } from '../../../components/primitives/_shared';
import { useMinBreakpoint } from '../../../hooks/useBreakpoint';
import { BlogChevronLeftIcon, BlogChevronRightIcon, BlogViewAllIcon } from './BlogBlockIcons';
import { BlogPostCard } from './BlogPostCard';
import type { BlogBlockProps } from './BlogBlock.types';

export type { BlogBlockProps, BlogPostItem, BlogViewAllAction } from './BlogBlock.types';

const blogNavButtonClass = (onBrand: boolean) =>
  cn(
    onBrand
      ? 'border border-solid border-[var(--color-text-on-brand)]/40 bg-transparent text-[var(--color-text-on-brand)] hover:border-transparent hover:bg-[var(--color-text-on-brand)]/15'
      : cn(BLOCK_CHROME_SQUARE_CONTROL_CLASS, 'text-[var(--color-text-primary)] hover:bg-[var(--color-brand-primary)] hover:text-[var(--color-text-on-brand)]'),
    'inline-flex h-[var(--space-40)] w-[var(--space-40)] shrink-0 items-center justify-center rounded-[var(--radius-pill)]',
    'transition-[colors,transform] duration-200 ease-out hover:scale-105',
    'disabled:pointer-events-none disabled:opacity-40',
    'min-[1024px]:h-[var(--space-56)] min-[1024px]:w-[var(--space-56)]',
  );

const blogViewAllClass = (onBrand: boolean) =>
  cn(
    onBrand
      ? 'border border-solid border-[var(--color-text-on-brand)]/40 bg-transparent text-[var(--color-text-on-brand)] hover:bg-[var(--color-text-on-brand)]/10'
      : cn(BLOCK_BLOG_CHROME_CONTROL_CLASS, 'text-[var(--color-text-primary)]'),
    'inline-flex min-h-[var(--space-56)] items-center gap-[var(--space-section-stack-s)]',
    'px-[var(--space-inset-xl)] text-style-body no-underline',
    'min-[1024px]:min-h-[var(--space-56)]',
  );

const blogViewAllIconChipClass = (onBrand: boolean) =>
  cn(
    onBrand ? 'bg-[var(--color-text-on-brand)]/15' : 'bg-[var(--color-surface-2)]',
    'inline-flex items-center justify-center rounded-[var(--radius-medium)]',
    'h-[var(--space-24)] w-[var(--space-24)] min-[1024px]:h-[var(--space-28)] min-[1024px]:w-[var(--space-28)]',
  );

function BlogNavigation({
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  onBrand,
}: {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  onBrand: boolean;
}) {
  const navButtonClass = blogNavButtonClass(onBrand);
  return (
    <div className="flex items-center" style={{ gap: 'var(--space-section-stack-s)' }} aria-label="Навигация по статьям">
      <button
        type="button"
        disabled={!canPrevious}
        onClick={onPrevious}
        aria-label="Предыдущая статья"
        className={navButtonClass}
      >
        <BlogChevronLeftIcon />
      </button>
      <button
        type="button"
        disabled={!canNext}
        onClick={onNext}
        aria-label="Следующая статья"
        className={navButtonClass}
      >
        <BlogChevronRightIcon />
      </button>
    </div>
  );
}

function BlogCardList({ posts }: Pick<BlogBlockProps, 'posts'>) {
  return (
    <>
      {posts.map((post) => (
        <div key={post.id ?? post.title} data-blog-card className="shrink-0">
          <BlogPostCard {...post} />
        </div>
      ))}
    </>
  );
}

export const BlogBlock: React.FC<BlogBlockProps> = ({
  title = 'Блог',
  subtitle,
  posts,
  viewAll,
  showNavigation = true,
  embeddedInPhotoHero = false,
  className,
}) => {
  const isDesktop = useMinBreakpoint('desktop');
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepPx, setStepPx] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const measureDesktopMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('[data-blog-card]');
    if (!viewport || !track || !card) return;

    const gap = parseInt(getComputedStyle(track).gap || '12', 10) || 12;
    const step = card.offsetWidth + gap;
    const visibleCount = Math.max(1, Math.floor((viewport.clientWidth + gap) / step));

    setStepPx(step);
    setMaxIndex(Math.max(0, posts.length - visibleCount));
    setActiveIndex((index) => Math.min(index, Math.max(0, posts.length - visibleCount)));
  }, [posts.length]);

  useEffect(() => {
    if (!isDesktop) return undefined;

    measureDesktopMetrics();
    window.addEventListener('resize', measureDesktopMetrics);
    return () => window.removeEventListener('resize', measureDesktopMetrics);
  }, [isDesktop, measureDesktopMetrics, posts.length]);

  const canPrevious = activeIndex > 0;
  const canNext = activeIndex < maxIndex;

  const goPrevious = useCallback(() => {
    setActiveIndex((index) => Math.max(0, index - 1));
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((index) => Math.min(maxIndex, index + 1));
  }, [maxIndex]);

  if (posts.length === 0) return null;

  const viewAllLabel = viewAll?.label ?? 'Смотреть все статьи';
  const onBrand = embeddedInPhotoHero;

  return (
    <SectionShell
      recipe="section.blog"
      appearance="muted"
      className={cn(onBrand && '!bg-transparent', className)}
      aria-label="Blog"
    >
      <div className={BLOG_HEADER_ROW_CLASS}>
        <div className={BLOG_HEADER_TITLE_GROUP_CLASS}>
          <h2
            className={cn(
              'm-0 font-medium text-style-h1',
              onBrand ? 'text-[var(--color-text-on-brand)]' : 'text-[var(--color-text-primary)]',
            )}
          >
            {title}
          </h2>
          {subtitle ? (
            <p
              className={cn(
                'm-0 max-w-[var(--space-545)] text-style-body min-[1024px]:text-style-body-lg',
                onBrand ? 'text-[var(--color-text-on-brand)] opacity-85' : 'text-[var(--color-text-secondary)]',
              )}
            >
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="hidden items-center min-[1024px]:flex" style={{ gap: 'var(--space-section-content-m)' }}>
          {viewAll ? (
            <a href={viewAll.href} className={blogViewAllClass(onBrand)}>
              <span className={blogViewAllIconChipClass(onBrand)}>
                <BlogViewAllIcon />
              </span>
              {viewAllLabel}
            </a>
          ) : null}
          {showNavigation ? (
            <BlogNavigation
              onPrevious={goPrevious}
              onNext={goNext}
              canPrevious={canPrevious}
              canNext={canNext}
              onBrand={onBrand}
            />
          ) : null}
        </div>
      </div>

      <div className={BLOG_SCROLL_VIEWPORT_CLASS}>
        {isDesktop ? (
          <div ref={viewportRef} className={BLOG_DESKTOP_TRACK_VIEWPORT_CLASS}>
            <div
              ref={trackRef}
              className={BLOG_DESKTOP_TRACK_CLASS}
              style={{ transform: stepPx ? `translateX(-${activeIndex * stepPx}px)` : undefined }}
            >
              <BlogCardList posts={posts} />
            </div>
          </div>
        ) : (
          <div ref={scrollRef} className={BLOG_SCROLL_STRIP_CLASS}>
            <BlogCardList posts={posts} />
          </div>
        )}
      </div>
    </SectionShell>
  );
};

BlogBlock.displayName = 'BlogBlock';
