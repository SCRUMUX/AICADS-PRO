import React from 'react';
import { cn } from '../../components/primitives/_shared';
import type { HeroBlockProps } from './HeroBlock';
import type { FeaturesBlockProps } from './FeaturesBlock';
import type { PricingBlockProps } from './PricingBlock';
import type { CTABlockProps } from './CTABlock';
import type { FooterBlockProps } from './FooterBlock';
import type { EventsBlockProps } from './EventsBlock';
import type { ServicesBlockProps, ServiceItem } from './ServicesBlock';
import type { SolutionsBlockProps, SolutionItem } from './SolutionsBlock';

/** Abstract illustration slot — enterprise hero media column (Cortel-style blocks). */
export const aicadsEnterpriseHeroMedia = (
  <div
    className="relative flex h-[var(--space-280)] w-full max-w-[var(--space-480)] items-end justify-end"
    aria-hidden="true"
  >
    {[0.55, 0.78, 1].map((scale, index) => (
      <div
        key={scale}
        className={cn(
          'rounded-[var(--radius-medium)] border border-[var(--color-text-on-brand)]/30',
          'bg-[var(--color-text-on-brand)]/10',
        )}
        style={{
          width: 'var(--space-80)',
          height: `calc(var(--space-160) * ${scale})`,
          marginLeft: index > 0 ? 'calc(var(--space-4) * -2)' : undefined,
          zIndex: index,
        }}
      />
    ))}
  </div>
);

export const aicadsEnterpriseHeroDemoContent: HeroBlockProps = {
  variant: 'enterprise',
  align: 'left',
  appearance: 'brand',
  title: 'AICADS — semantic платформа интерфейсов без layout drift',
  subtitle:
    'Токены, контракты, 57 примитивов и marketing-блоки — один semantic surface для продуктов и AI-сборщиков.',
  primaryAction: { label: 'Начать интеграцию', href: '#' },
  stats: [
    { value: '57+', label: 'UI-примитивов' },
    { value: '14', label: 'Pattern blocks' },
    { value: '24/7', label: 'Storybook parity' },
    { value: 'v0.7', label: 'Stable release' },
  ],
};

/** Full hero fixture — use in render(), not Storybook args. */
export const aicadsEnterpriseHeroDemo: HeroBlockProps = {
  ...aicadsEnterpriseHeroDemoContent,
  media: aicadsEnterpriseHeroMedia,
};

export function withEnterpriseHeroMedia(hero: HeroBlockProps): HeroBlockProps {
  return hero.media ? hero : { ...hero, media: aicadsEnterpriseHeroMedia };
}

/** Inner-page hero — breadcrumbs, category badge, title (Cortel case study). */
export const aicadsPageHeroDemoContent: HeroBlockProps = {
  variant: 'page',
  appearance: 'brand',
  breadcrumbs: [
    { label: 'Главная', href: '#' },
    { label: 'Паттерны', href: '#patterns' },
    { label: 'Enterprise landing template' },
  ],
  badge: 'Pattern blocks',
  title: 'Сборка landing из @ai-ds/core без layout drift',
};

export const aicadsEnterpriseFeaturesDemo: Pick<
  FeaturesBlockProps,
  'title' | 'subtitle' | 'columns' | 'features'
> = {
  title: 'Почему AICADS',
  subtitle: 'Архитектура дизайн-системы, которую можно собирать, проверять и масштабировать.',
  columns: 3,
  features: [
    {
      title: 'Token-driven UI',
      description: 'Стили только через tokens.css → contract → findClasses — без magic numbers.',
      icon: '🎨',
    },
    {
      title: 'Pattern manifest',
      description: 'ai-patterns.json и Storybook — единый каталог для AI и команд.',
      icon: '📋',
    },
    {
      title: 'Isolation contract',
      description: 'Radix, cmdk, vaul — только в _internal/; consumer видит semantic API.',
      icon: '🛡️',
    },
  ],
};

export const aicadsEnterprisePricingDemo: Pick<
  PricingBlockProps,
  'title' | 'subtitle' | 'highlightedIndex' | 'tiers'
> = {
  title: 'Distribution',
  subtitle: 'Git install — без npm registry.',
  highlightedIndex: 1,
  tiers: [
    {
      name: 'Core',
      price: 'Free',
      period: 'OSS',
      features: ['57 primitives', 'Tokens + contracts', 'ESLint config'],
      actionLabel: 'GitHub',
    },
    {
      name: 'PRO',
      price: 'v0.7',
      period: 'tag',
      features: ['Marketing blocks', 'Storybook kit', 'Pattern manifest'],
      actionLabel: 'Install',
    },
    {
      name: 'Team',
      price: 'Custom',
      features: ['Private patterns', 'Figma plugin', 'Migration support'],
      actionLabel: 'Contact',
    },
  ],
};

export const aicadsEnterpriseCtaDemo: Pick<CTABlockProps, 'variant' | 'title' | 'description' | 'action'> = {
  variant: 'band',
  title: 'Готовы подключить AICADS?',
  description: 'Установите @ai-ds/core, импортируйте tokens и соберите landing из pattern blocks.',
  action: { label: 'Открыть документацию', href: '#' },
};

export const aicadsEnterpriseEventsDemo: Pick<EventsBlockProps, 'title' | 'events'> = {
  title: 'Ближайшие события',
  events: [
    {
      id: 'webinar-patterns',
      format: 'online',
      formatLabel: 'онлайн',
      date: '28 мая 2026',
      title:
        'Вебинар: pattern blocks и ai-patterns.json — как AI-сборщики перестают «придумывать» layout',
      href: '#events/webinar-patterns',
    },
  ],
};

export const aicadsEnterpriseEventsCarouselDemo: Pick<EventsBlockProps, 'title' | 'events'> = {
  title: 'Ближайшие события',
  events: [
    {
      id: 'webinar-patterns',
      format: 'online',
      formatLabel: 'онлайн',
      date: '28 мая 2026',
      title:
        'Вебинар: pattern blocks и ai-patterns.json — стабильный rhythm для AI-generated landing',
      href: '#events/webinar-patterns',
    },
    {
      id: 'workshop-tokens',
      format: 'offline',
      formatLabel: 'офлайн',
      date: '12 июня 2026',
      title: 'Workshop: design tokens — от Figma variables до tokens.css и Tailwind preset',
      href: '#events/workshop-tokens',
      location: 'Москва',
    },
    {
      id: 'meetup-eslint',
      format: 'hybrid',
      formatLabel: 'гибрид',
      date: '3 июля 2026',
      title: 'Meetup: isolation contract — ESLint guardrails для consumer-проектов на @ai-ds/core',
      href: '#events/meetup-eslint',
    },
  ],
};

export const aicadsEnterpriseEventsListDemo: Pick<EventsBlockProps, 'title' | 'events' | 'variant'> = {
  title: 'Ближайшие события',
  variant: 'list',
  events: [
    {
      id: 'webinar-patterns',
      format: 'online',
      formatLabel: 'онлайн',
      date: '28 мая 2026',
      title: 'Pattern blocks и Storybook parity в @ai-ds/core',
      href: '#events/webinar-patterns',
    },
    {
      id: 'workshop-tokens',
      format: 'offline',
      formatLabel: 'офлайн',
      date: '12 июня 2026',
      title: 'Workshop: design tokens — от Figma variables до tokens.css и Tailwind preset',
      href: '#events/workshop-tokens',
      location: 'Москва',
    },
    {
      id: 'meetup-eslint',
      format: 'hybrid',
      formatLabel: 'гибрид',
      date: '3 июля 2026',
      title: 'Meetup: isolation contract — ESLint guardrails для consumer-проектов на @ai-ds/core',
      href: '#events/meetup-eslint',
    },
  ],
};

function buildServiceItems(prefix: string, titles: string[], descriptions?: string[]): ServiceItem[] {
  return titles.map((title, index) => ({
    id: `${prefix}-${index + 1}`,
    title,
    description:
      descriptions?.[index] ??
      'Semantic API, spacing recipes и Storybook parity — без layout drift в consumer-проектах.',
    action: { label: 'Подробнее', href: '#' },
  }));
}

export const aicadsServicesDemoContent: Pick<ServicesBlockProps, 'title' | 'subtitle' | 'categories'> = {
  title: 'Pattern blocks для продуктовых и marketing-страниц',
  subtitle:
    'Готовые секции с фиксированным rhythm — hero, events, solutions, services, CTA и footer из одного manifest.',
  categories: [
    {
      id: 'patterns',
      label: 'Marketing blocks',
      items: buildServiceItems(
        'patterns',
        [
          'Hero enterprise + metrics band',
          'Events band с carousel',
          'Solutions mosaic + inverse hover',
          'Services catalog с tabs',
          'Navbar overlay + mega menu',
          'LandingPageTemplate composition',
        ],
        [
          'Above-the-fold для enterprise landing с overlay navbar и brand band.',
          'Brand band после hero — carousel, format/date tags, event title.',
          'Кейсы внедрения: 2-row mosaic, inverse hover reveal на desktop.',
          'Sticky title + category tabs, 3-card grid и «Показать ещё».',
          'Enterprise navigation: phone block, social rail, services mega menu.',
          'Полная landing-страница из ai-patterns.json pageTemplates.',
        ],
      ),
    },
    {
      id: 'primitives',
      label: 'UI-примитивы',
      items: buildServiceItems(
        'primitives',
        [
          'Tabs через Radix adapter',
          'Modal / Drawer / Popover',
          'Form controls bundle',
          'Table + data cells',
          'Toast + CommandPalette',
          'Skeleton loading states',
        ],
        [
          'Semantic Tab API — consumer не импортирует @radix-ui/react-tabs.',
          'Dialog, Vaul drawer и Floating UI только в _internal/.',
          'Input, Select, Checkbox, Switch, PinInput с contract-driven стилями.',
          'Token-driven table cells, header rows и responsive layout.',
          'Sonner toast и cmdk palette за isolation boundary.',
          'SkeletonCard, SkeletonTable, SkeletonPage для loading UX.',
        ],
      ),
    },
    {
      id: 'integration',
      label: 'Интеграция',
      items: buildServiceItems(
        'integration',
        [
          'ESLint isolation contract',
          'tokens.css + Tailwind preset',
          'Storybook kit + viewports',
          'ai-patterns.json manifest',
          'Chromatic visual regression',
          'Figma plugin + contracts',
        ],
        [
          'Запрет прямых импортов Radix, cmdk, vaul в consumer-коде.',
          'Единый token surface: CSS variables → Tailwind → components.',
          'Playground Storybook с marketing viewports и engine-styles.',
          'Machine-readable каталог blocks, recipes и page templates.',
          'VRT pipeline для primitives и marketing blocks.',
          'Sync component contracts и spacing recipes с design tooling.',
        ],
      ),
    },
  ],
};

export const aicadsSolutionsDemoContent: Pick<SolutionsBlockProps, 'title' | 'solutions' | 'viewAll'> = {
  title: 'Реализованные решения',
  viewAll: { label: 'Смотреть все паттерны', href: '#patterns' },
  solutions: [
    {
      id: 'enterprise-landing',
      category: 'Design systems',
      title: 'Enterprise landing из pattern blocks без layout drift',
      description:
        'Overlay navbar, brand hero, events band, solutions mosaic и services catalog — один rhythm на всех breakpoints.',
      client: 'Pattern Labs',
      date: '12.03.2026',
      href: '#cases/enterprise-landing',
    },
    {
      id: 'ai-assembler',
      category: 'AI-сборка',
      title: 'Replit-assembler на ai-patterns.json — предсказуемый section order',
      description:
        'AI выбирает blocks из manifest вместо импровизации spacing; Storybook — source of truth для preview.',
      client: 'AI Platform Team',
      date: '08.04.2026',
      href: '#cases/ai-assembler',
    },
    {
      id: 'eslint-isolation',
      category: 'Consumer apps',
      title: 'Isolation contract в monorepo из 12 пакетов',
      description:
        'ESLint config @ai-ds/core блокирует прямые импорты Radix и cmdk — semantic surface только через primitives.',
      client: 'SaaS Frontend',
      date: '21.01.2026',
      href: '#cases/eslint-isolation',
    },
    {
      id: 'git-distribution',
      category: 'Open source',
      title: 'Git-distributed @ai-ds/core — tokens, blocks и Storybook kit без npm registry',
      description:
        'Consumer ставит core через git tag, импортирует @ai-ds/core/blocks/* и @ai-ds/core/recipes; migration guides в CHANGELOG.',
      client: 'OSS Maintainers',
      date: '15.11.2025',
      href: '#cases/git-distribution',
    },
    {
      id: 'chromatic-vrt',
      category: 'Storybook',
      title: 'Chromatic VRT для 57 primitives и marketing blocks',
      description: 'Visual regression на contract variants и marketing sections из pattern manifest.',
      client: 'Design Ops',
      date: '02.02.2026',
      href: '#cases/chromatic-vrt',
    },
    {
      id: 'platform-rollout',
      category: 'Platform teams',
      title: 'Единый semantic surface для 4 product squads',
      highlights: [
        '57+ UI-примитивов в одном import surface',
        '19 pattern blocks в ai-patterns.json',
        'Storybook parity на desktop / tablet / mobile',
      ],
      client: 'UI Platform',
      date: '19.05.2026',
      href: '#cases/platform-rollout',
    },
  ] satisfies SolutionItem[],
};

export const aicadsEnterpriseFooterDemo: Pick<FooterBlockProps, 'columns' | 'copyright'> = {
  columns: [
    {
      title: 'Продукт',
      links: [
        { label: 'Примитивы', href: '#' },
        { label: 'Блоки', href: '#' },
      ],
    },
    {
      title: 'Ресурсы',
      links: [
        { label: 'Storybook', href: '#' },
        { label: 'GitHub', href: '#' },
      ],
    },
  ],
  copyright: '© 2026 AICADS',
};

/** Neutral partner names for logo cloud placeholders. */
export const aicadsPartnerLogos = [
  'Pattern Labs',
  'Token Studio',
  'UI Platform',
  'Design Ops',
  'Product DS',
  'Flow Team',
] as const;

/** CSF-safe copy for Storybook args (no spread operator). */
export const aicadsPartnerLogosList: string[] = [
  'Pattern Labs',
  'Token Studio',
  'UI Platform',
  'Design Ops',
  'Product DS',
  'Flow Team',
];
