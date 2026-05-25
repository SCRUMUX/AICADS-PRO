/** Shared surface tokens for enterprise navbar sub-regions. */

import {
  BLOCK_GLASS_CHROME_NAVBAR_OVERLAY_CLASS,
  BLOCK_GLASS_CHROME_NAVBAR_SOLID_CLASS,
} from '../../_shared/blockLayout';

export type NavbarSurface = 'overlay' | 'solid';

export function resolveNavbarSurface(
  overlay: boolean,
  scrolled: boolean,
  servicesOpen: boolean,
): NavbarSurface {
  return overlay && !scrolled && !servicesOpen ? 'overlay' : 'solid';
}

export const NAVBAR_SURFACE = {
  header: {
    overlay: BLOCK_GLASS_CHROME_NAVBAR_OVERLAY_CLASS,
    solid: BLOCK_GLASS_CHROME_NAVBAR_SOLID_CLASS,
  },
  text: {
    overlay: 'text-[var(--color-text-on-brand)]',
    solid: 'text-[var(--color-text-primary)]',
  },
  socialRail: {
    overlay: 'bg-transparent text-[var(--color-text-on-brand)]',
    solid: 'bg-transparent text-[var(--color-text-primary)]',
  },
  socialIcon: {
    overlay: 'text-[var(--color-text-on-brand)] hover:opacity-80',
    solid: 'text-[var(--color-text-primary)] hover:opacity-80',
  },
  divider: {
    overlay:
      'linear-gradient(90deg, transparent 0%, var(--color-text-on-brand) 50%, transparent 100%)',
    solid:
      'linear-gradient(90deg, transparent 0%, var(--color-border-base) 50%, transparent 100%)',
  },
  textAction: {
    overlay: 'text-[var(--color-text-on-brand)] hover:opacity-80',
    solid:
      'text-[var(--color-text-primary)] rounded-[var(--radius-medium)] hover:bg-[var(--color-surface-2)]',
  },
  chromeBorder: {
    overlay: '',
    solid: '',
  },
} as const;

/** Measured chrome fallback until ResizeObserver runs (min-h-56 + vertical padding). */
export const NAVBAR_CHROME_HEIGHT_FALLBACK = 'calc(var(--space-56) + var(--space-4) * 2)';

/** Minimum fixed chrome height — mirrors `--space-64` for JS scroll/fold math. */
export const NAVBAR_CHROME_MIN_HEIGHT = 64;

/** Brand bleed extension below measured chrome — mirrors `--space-2`. */
export const NAVBAR_BRAND_BLEED_EXTRA = 'var(--space-2)';

const SCROLL_ROOT_IDS = ['storybook-root', 'root'] as const;
const SCROLL_ROOT_SELECTORS = ['.sb-show-main', '.sb-main-padded', '[data-is-storybook="true"]'] as const;

function readScrollTop(target: Element | Window): number {
  if (target === window) {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  return (target as HTMLElement).scrollTop || 0;
}

function collectScrollRoots(): (Element | Window)[] {
  if (typeof document === 'undefined') return [window];

  const roots: (Element | Window)[] = [window, document.documentElement, document.body];

  for (const id of SCROLL_ROOT_IDS) {
    const el = document.getElementById(id);
    if (el) roots.push(el);
  }

  for (const selector of SCROLL_ROOT_SELECTORS) {
    document.querySelectorAll(selector).forEach((el) => roots.push(el));
  }

  return roots;
}

export function getScrollRoot(): Element | Window {
  for (const root of collectScrollRoots()) {
    if (root === window) continue;
    const el = root as HTMLElement;
    if (el.scrollHeight > el.clientHeight + 1) return root;
  }
  return window;
}

/** Max scroll offset across Storybook iframe roots and window. */
export function getScrollTop(): number {
  let max = 0;
  for (const root of collectScrollRoots()) {
    max = Math.max(max, readScrollTop(root));
  }
  return max;
}

export function bindScroll(onScroll: () => void): () => void {
  const opts = { passive: true, capture: true } as const;
  const roots = collectScrollRoots();

  for (const root of roots) {
    root.addEventListener('scroll', onScroll, opts);
  }

  return () => {
    for (const root of roots) {
      root.removeEventListener('scroll', onScroll, opts);
    }
  };
}

export function lockScrollRoot(lock: boolean): () => void {
  if (typeof document === 'undefined') return () => undefined;

  const root = getScrollRoot();
  if (root === window) {
    const prev = document.body.style.overflow;
    document.body.style.overflow = lock ? 'hidden' : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }

  const el = root as HTMLElement;
  const prev = el.style.overflow;
  el.style.overflow = lock ? 'hidden' : prev;
  return () => {
    el.style.overflow = prev;
  };
}
