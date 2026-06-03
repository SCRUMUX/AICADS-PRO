import React from 'react';
import { GeneratedIcon } from '../../../components/primitives/GeneratedIcon';
import type { GeneratedIconManifestEntry } from '../../../components/primitives/GeneratedIcon';
import { SectionShell } from '../../_shared/SectionShell';
import { BlockSectionHeader } from '../../_shared/BlockSectionHeader';
import { BlockGrid } from '../../_shared/BlockGrid';
import { FeatureCard } from '../../_shared/FeatureCard';

export interface FeatureItem {
  title: string;
  description: string;
  /** Optional leading glyph (emoji, SVG, or custom node). */
  icon?: React.ReactNode;
  /** Synaptik raster slug — resolved via `generatedIcons` manifest from `icons.manifest.ts`. */
  iconSlug?: string;
}

export interface FeaturesBlockProps {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  features: FeatureItem[];
  columns?: 2 | 3;
  className?: string;
  /** Map from `iconsBySlug` (import from published `icons.manifest.ts`). */
  generatedIcons?: Record<string, GeneratedIconManifestEntry>;
  generatedIconSize?: number;
}

function resolveFeatureIcon(
  feature: FeatureItem,
  generatedIcons?: Record<string, GeneratedIconManifestEntry>,
  generatedIconSize = 48,
): React.ReactNode {
  if (feature.icon) return feature.icon;
  if (!feature.iconSlug || !generatedIcons) return undefined;
  const entry = generatedIcons[feature.iconSlug];
  if (!entry) return undefined;
  return (
    <GeneratedIcon
      src={entry.png}
      webpSrc={entry.webp}
      alt={entry.meta.name ?? feature.title}
      size={generatedIconSize}
    />
  );
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title = 'Features',
  subtitle,
  eyebrow,
  features,
  columns = 3,
  className,
  generatedIcons,
  generatedIconSize = 48,
}) => (
  <SectionShell recipe="section.features" appearance="surface" className={className} aria-label="Features">
    <BlockSectionHeader
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
    />
    <BlockGrid columns={columns === 3 ? 3 : 2}>
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={resolveFeatureIcon(feature, generatedIcons, generatedIconSize)}
        />
      ))}
    </BlockGrid>
  </SectionShell>
);

FeaturesBlock.displayName = 'FeaturesBlock';
