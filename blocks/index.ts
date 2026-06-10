/**
 * AICADS pattern blocks — distributable composed sections for consumer apps.
 *
 * Prefer granular imports:
 *   import { HeroBlock } from '@ai-ds/core/blocks/HeroBlock';
 */

export { HeroBlock } from './marketing/HeroBlock';
export type { HeroBlockProps, HeroBlockAction, HeroStat, HeroBreadcrumbItem } from './marketing/HeroBlock';

export { FeaturesBlock } from './marketing/FeaturesBlock';
export type { FeaturesBlockProps, FeatureItem } from './marketing/FeaturesBlock';

export { PricingBlock } from './marketing/PricingBlock';
export type { PricingBlockProps, PricingTier } from './marketing/PricingBlock';

export { CTABlock } from './marketing/CTABlock';
export type { CTABlockProps, CTABlockAction } from './marketing/CTABlock';

export { FooterBlock } from './marketing/FooterBlock';
export type { FooterBlockProps, FooterColumn, FooterSocialLink, FooterContactItem, FooterLegalLink, FooterLink } from './marketing/FooterBlock';

export { NavbarBlock } from './marketing/NavbarBlock';
export type {
  NavbarBlockProps,
  NavbarLink,
  NavbarBlockStoryProps,
  NavbarServiceCategory,
  NavbarServiceItem,
  NavbarSocialLink,
  NavbarPhoneInfo,
  NavbarCta,
  NavbarSocialIcon,
} from './marketing/NavbarBlock';
export { aicadsProNavbarFixture } from './marketing/NavbarBlock';

export { LogoCloudBlock } from './marketing/LogoCloudBlock';
export type { LogoCloudBlockProps, LogoCloudItem } from './marketing/LogoCloudBlock';

export { StatsBlock } from './marketing/StatsBlock';
export type { StatsBlockProps, StatItem } from './marketing/StatsBlock';

export { TestimonialsBlock } from './marketing/TestimonialsBlock';
export type { TestimonialsBlockProps, TestimonialItem } from './marketing/TestimonialsBlock';

export { FAQBlock } from './marketing/FAQBlock';
export type { FAQBlockProps, FAQItem } from './marketing/FAQBlock';

export { HowItWorksBlock } from './marketing/HowItWorksBlock';
export type { HowItWorksBlockProps, HowItWorksStep } from './marketing/HowItWorksBlock';

export { NewsletterBlock } from './marketing/NewsletterBlock';
export type { NewsletterBlockProps } from './marketing/NewsletterBlock';

export { EventsBlock } from './marketing/EventsBlock';
export type { EventsBlockProps, EventItem, EventFormat } from './marketing/EventsBlock';

export { ServicesBlock } from './marketing/ServicesBlock';
export type {
  ServicesBlockProps,
  ServiceCategory,
  ServiceItem,
  ServiceItemAction,
} from './marketing/ServicesBlock';

export { SolutionsBlock } from './marketing/SolutionsBlock';
export type {
  SolutionsBlockProps,
  SolutionItem,
  SolutionCatalogItem,
  SolutionsViewAllAction,
} from './marketing/SolutionsBlock';

export { TrustBlock } from './marketing/TrustBlock';
export type { TrustBlockProps, TrustPillarItem, TrustStandardItem } from './marketing/TrustBlock';

export { SupportBlock } from './marketing/SupportBlock';
export type { SupportBlockProps, SupportStatItem, SupportContactItem } from './marketing/SupportBlock';

export { ShowcasePanelBlock } from './marketing/ShowcasePanelBlock';
export type { ShowcasePanelBlockProps, ShowcasePanelItem, ShowcasePanelAction } from './marketing/ShowcasePanelBlock';

export { BlogBlock } from './marketing/BlogBlock';
export type { BlogBlockProps, BlogPostItem, BlogViewAllAction } from './marketing/BlogBlock';

export { PartnersBlock } from './marketing/PartnersBlock';
export type { PartnersBlockProps, PartnerItem } from './marketing/PartnersBlock';

export { ContactHeroBlock } from './marketing/ContactHeroBlock';
export type {
  ContactHeroBlockProps,
  ContactHeroFormLabels,
  ContactHeroFormValues,
} from './marketing/ContactHeroBlock';

export { WhyUsBlock } from './marketing/WhyUsBlock';
export type { WhyUsBlockProps, WhyUsCardItem, WhyUsFeaturedItem } from './marketing/WhyUsBlock';

export { ChooseUsBlock } from './marketing/ChooseUsBlock';
export type {
  ChooseUsBlockProps,
  ChooseUsCardItem,
  ChooseUsFeaturedItem,
  ChooseUsCardSize,
} from './marketing/ChooseUsBlock';

export { ProcessBlock } from './marketing/ProcessBlock';
export type { ProcessBlockProps, ProcessStepItem } from './marketing/ProcessBlock';

export { LandingPageTemplate } from './marketing/LandingPageTemplate';
export type { LandingPageTemplateProps } from './marketing/LandingPageTemplate';

export { LoginBlock } from './marketing/LoginBlock';
export type { LoginBlockProps, LoginFormLabels, LoginFormValues, LoginLegalLink } from './marketing/LoginBlock';

export { LoginPageTemplate } from './marketing/LoginPageTemplate';
export type { LoginPageTemplateProps } from './marketing/LoginPageTemplate';

export { CaseStudiesBlock } from './marketing/CaseStudiesBlock';
export type {
  CaseStudiesBlockProps,
  CaseStudyItem,
  CaseStudyStat,
  CaseStudiesViewAllAction,
} from './marketing/CaseStudiesBlock';

export { CaseStudyIntroBlock } from './marketing/CaseStudyIntroBlock';
export type { CaseStudyIntroBlockProps } from './marketing/CaseStudyIntroBlock';

export { CaseStudyInlineStatsBlock } from './marketing/CaseStudyInlineStatsBlock';
export type { CaseStudyInlineStatsBlockProps } from './marketing/CaseStudyInlineStatsBlock';

export { CaseStudyImplementedBlock } from './marketing/CaseStudyImplementedBlock';
export type { CaseStudyImplementedBlockProps } from './marketing/CaseStudyImplementedBlock';

export { CaseStudySectionsBlock } from './marketing/CaseStudySectionsBlock';
export type { CaseStudySectionsBlockProps } from './marketing/CaseStudySectionsBlock';

export { CaseStudyAnchorNav } from './marketing/CaseStudyAnchorNav';
export type { CaseStudyAnchorNavProps } from './marketing/CaseStudyAnchorNav';

export { CaseStudyArticleSplit } from './marketing/CaseStudyArticleSplit';
export type { CaseStudyArticleSplitProps } from './marketing/CaseStudyArticleSplit';

export { CaseStudyContactBlock } from './marketing/CaseStudyContactBlock';
export type { CaseStudyContactBlockProps } from './marketing/CaseStudyContactBlock';

export { CaseDetailPageTemplate } from './marketing/CaseDetailPageTemplate';
export type { CaseDetailPageTemplateProps } from './marketing/CaseDetailPageTemplate';

export { AppShellBlock } from './marketing/AppShellBlock';
export type { AppShellBlockProps, AppShellNavItem } from './marketing/AppShellBlock';

export { AdminContentListBlock } from './marketing/AdminContentListBlock';
export type { AdminContentListBlockProps } from './marketing/AdminContentListBlock';

export { AdminContentEditorBlock } from './marketing/AdminContentEditorBlock';
export type {
  AdminContentEditorBlockProps,
  AdminAnchorItem,
  AdminCaseDraft,
  AdminContentDraft,
  AdminContentKind,
  AdminEditorSectionId,
  AdminEventDraft,
  AdminPartnerRecord,
  AdminPublishStatus,
  AdminUserRecord,
} from './marketing/AdminContentEditorBlock';

export { AdminContentWorkspaceBlock } from './marketing/AdminContentWorkspaceBlock';
export type { AdminContentWorkspaceBlockProps } from './marketing/AdminContentWorkspaceBlock';

export { AdminUsersWorkspaceBlock } from './marketing/AdminUsersWorkspaceBlock';
export type { AdminUsersWorkspaceBlockProps } from './marketing/AdminUsersWorkspaceBlock';

export { AdminPartnersWorkspaceBlock } from './marketing/AdminPartnersWorkspaceBlock';
export type { AdminPartnersWorkspaceBlockProps } from './marketing/AdminPartnersWorkspaceBlock';

export { AdminPageTemplate } from './marketing/AdminPageTemplate';
export type { AdminPageTemplateProps, AdminSectionId } from './marketing/AdminPageTemplate';

/** Enterprise landing demo fixtures — reference payloads for consumer apps. */
export {
  aicadsEnterpriseHeroDemoContent,
  aicadsEnterpriseHeroMedia,
  withEnterpriseHeroMedia,
} from './marketing/marketingDemoContent';
export { aicadsProEnterpriseLandingArgs } from './marketing/enterpriseLandingFixtures';
export { aicadsProAdminArgs, aicadsProAdminNav } from './marketing/aicadsProAdminFixtures';
export { aicadsProLoginArgs, aicadsProLoginContent } from './marketing/aicadsProLoginFixtures';
export { aicadsProCaseDetailArgs } from './marketing/aicadsProCaseDetailFixtures';
export { aicadsProCaseStudiesContent } from './marketing/aicadsProCaseStudiesFixtures';
