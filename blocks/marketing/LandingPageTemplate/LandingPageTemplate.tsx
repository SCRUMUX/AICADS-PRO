import React from 'react';
import { cn } from '../../../components/primitives/_shared';
import { HeroBlock, type HeroBlockProps } from '../HeroBlock';
import { FeaturesBlock, type FeaturesBlockProps } from '../FeaturesBlock';
import { PricingBlock, type PricingBlockProps } from '../PricingBlock';
import { CTABlock, type CTABlockProps } from '../CTABlock';
import { FooterBlock, type FooterBlockProps } from '../FooterBlock';
import { NavbarBlock, type NavbarBlockProps } from '../NavbarBlock';
import { LogoCloudBlock, type LogoCloudBlockProps } from '../LogoCloudBlock';
import { StatsBlock, type StatsBlockProps } from '../StatsBlock';
import { TestimonialsBlock, type TestimonialsBlockProps } from '../TestimonialsBlock';
import { FAQBlock, type FAQBlockProps } from '../FAQBlock';
import { HowItWorksBlock, type HowItWorksBlockProps } from '../HowItWorksBlock';
import { NewsletterBlock, type NewsletterBlockProps } from '../NewsletterBlock';
import { MarketingAboveFold } from '../../_shared/MarketingAboveFold';

export interface LandingPageTemplateProps {
  hero: HeroBlockProps;
  features: FeaturesBlockProps;
  pricing: PricingBlockProps;
  cta: CTABlockProps;
  footer: FooterBlockProps;
  navbar?: NavbarBlockProps;
  logoCloud?: LogoCloudBlockProps;
  stats?: StatsBlockProps;
  testimonials?: TestimonialsBlockProps;
  howItWorks?: HowItWorksBlockProps;
  faq?: FAQBlockProps;
  newsletter?: NewsletterBlockProps;
  className?: string;
}

function resolveAboveFoldHero(hero: HeroBlockProps, navbar?: NavbarBlockProps): HeroBlockProps {
  if (!navbar?.overlay) return hero;
  return {
    ...hero,
    appearance: hero.appearance ?? 'brand',
  };
}

/**
 * Full marketing landing page — section order from ai-patterns.json pageTemplates.
 * `marketing.landing.default` uses core five sections; `marketing.landing.saas` adds optional blocks.
 */
export const LandingPageTemplate: React.FC<LandingPageTemplateProps> = ({
  hero,
  features,
  pricing,
  cta,
  footer,
  navbar,
  logoCloud,
  stats,
  testimonials,
  howItWorks,
  faq,
  newsletter,
  className,
}) => {
  const heroProps = resolveAboveFoldHero(hero, navbar);
  const useAboveFold = Boolean(navbar?.overlay);

  return (
    <div className={className}>
      {navbar && <NavbarBlock {...navbar} />}
      {useAboveFold ? (
        <MarketingAboveFold underFixedNavbar={Boolean(navbar?.sticky ?? true)}>
          <HeroBlock {...heroProps} className={cn('!bg-transparent', heroProps.className)} />
        </MarketingAboveFold>
      ) : (
        <HeroBlock {...heroProps} />
      )}
      {logoCloud && <LogoCloudBlock {...logoCloud} />}
      {stats && <StatsBlock {...stats} />}
      <FeaturesBlock {...features} />
      {howItWorks && <HowItWorksBlock {...howItWorks} />}
      <PricingBlock {...pricing} />
      {testimonials && <TestimonialsBlock {...testimonials} />}
      {faq && <FAQBlock {...faq} />}
      <CTABlock {...cta} />
      {newsletter && <NewsletterBlock {...newsletter} />}
      <FooterBlock {...footer} />
    </div>
  );
};

LandingPageTemplate.displayName = 'LandingPageTemplate';
