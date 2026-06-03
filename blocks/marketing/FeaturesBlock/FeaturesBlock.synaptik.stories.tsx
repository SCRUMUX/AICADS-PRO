import type { Meta, StoryObj } from '@storybook/react';
import { iconsBySlug } from '../../../generated-icons/agriculture-technology/icons.manifest';
import { FeaturesBlock } from './FeaturesBlock';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';

const manifestSlugs = Object.keys(iconsBySlug).slice(0, 9);

const synaptikFeatures = manifestSlugs
  .filter((slug) => slug in iconsBySlug)
  .map((slug) => {
    const entry = iconsBySlug[slug as keyof typeof iconsBySlug];
    return {
      title: entry.meta.sourceCard ?? entry.meta.name ?? slug,
      description: `${entry.meta.category ?? 'Icon'} — slug: ${slug}`,
      iconSlug: slug,
    };
  });

const meta: Meta<typeof FeaturesBlock> = {
  title: 'Blocks/Marketing/FeaturesBlock/Synaptik',
  component: FeaturesBlock,
  parameters: marketingBlockParameters,
};

export default meta;

type Story = StoryObj<typeof FeaturesBlock>;

export const WithSynaptikRasterIcons: Story = {
  args: {
    eyebrow: 'Synaptik raster',
    title: 'Features with published icons',
    subtitle: 'Icons from generated-icons/agriculture-technology/icons.manifest.ts',
    columns: 3,
    generatedIcons: iconsBySlug,
    generatedIconSize: 56,
    features: synaptikFeatures,
  },
};
