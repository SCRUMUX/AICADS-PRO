import type { HeroBlockProps } from './HeroBlock';
import type { FeaturesBlockProps } from './FeaturesBlock';
import type { CTABlockProps } from './CTABlock';
import type { FooterBlockProps } from './FooterBlock';

/** Shared hero for enterprise navbar + brand above-fold demos. */
export const aicadsEnterpriseHeroDemo: HeroBlockProps = {
  variant: 'centered',
  align: 'center',
  appearance: 'brand',
  badge: 'Design system',
  title: 'AICADS — семантическая платформа интерфейсов',
  subtitle:
    'Токены, контракты, 57 примитивов и marketing-блоки — один semantic surface для продуктов и AI-сборщиков.',
  primaryAction: { label: 'Начать интеграцию', href: '#' },
  secondaryAction: { label: 'Компоненты', href: '#' },
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

export const aicadsEnterpriseCtaDemo: Pick<CTABlockProps, 'variant' | 'title' | 'description' | 'action'> = {
  variant: 'band',
  title: 'Готовы подключить AICADS?',
  description: 'Установите @ai-ds/core, импортируйте tokens и соберите landing из pattern blocks.',
  action: { label: 'Открыть документацию', href: '#' },
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
