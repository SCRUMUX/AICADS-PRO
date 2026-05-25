/** Shared surface tokens for enterprise navbar sub-regions. */

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
    overlay: 'bg-transparent',
    solid:
      'bg-[var(--color-surface-1)]/95 shadow-elevation-1 backdrop-blur-[var(--effect-blur-background)]',
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
    overlay: 'border-b border-[var(--color-text-on-brand)]/25',
    solid: 'border-b border-[var(--color-border-base)]',
  },
} as const;

/** Measured chrome fallback until ResizeObserver runs (min-h-56 + vertical padding). */
export const NAVBAR_CHROME_HEIGHT_FALLBACK = 'calc(var(--space-56) + var(--space-4) * 2)';

const SCROLL_ROOT_IDS = ['storybook-root', 'root'] as const;

function readScrollTop(target: Element | Window): number {
  if (target === window) {
    return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  }
  return (target as HTMLElement).scrollTop || 0;
}

function collectScrollRoots(): (Element | Window)[] {
  if (typeof document === 'undefined') return [window];

  return [
    window,
    document.documentElement,
    document.body,
    ...(SCROLL_ROOT_IDS.map((id) => document.getElementById(id)).filter(Boolean) as Element[]),
  ];
}

export function getScrollRoot(): Element | Window {
  for (const root of collectScrollRoots()) {
    const el = root as HTMLElement;
    if (root !== window && el.scrollHeight > el.clientHeight) return root;
  }
  return window;
}

export function getScrollTop(): number {
  for (const root of collectScrollRoots()) {
    const top = readScrollTop(root);
    if (top > 0) return top;
  }
  return 0;
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
