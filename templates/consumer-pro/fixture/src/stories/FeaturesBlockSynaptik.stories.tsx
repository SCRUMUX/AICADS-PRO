import type { Meta, StoryObj } from '@storybook/react';
import { FeaturesBlock } from '@ai-ds/core/blocks/FeaturesBlock';
import { iconsBySlug } from '../assets/generated-icons/my-product/icons.manifest.ts';
import { marketingBlockParameters } from '@ai-ds/core/storybook/marketingViewports';

const slugs = Object.keys(iconsBySlug);

const synaptikFeatures =
  slugs.length > 0
    ? slugs.slice(0, 9).map((slug) => {
        const entry = iconsBySlug[slug as keyof typeof iconsBySlug];
        return {
          title: entry.meta.sourceCard ?? entry.meta.name ?? slug,
          description: `${entry.meta.category ?? 'Icon'} — slug: ${slug}`,
          iconSlug: slug,
        };
      })
    : [
        {
          title: 'Publish icons first',
          description: 'Run npx synaptik publish, then refresh this story.',
          iconSlug: undefined,
        },
      ];

const meta: Meta<typeof FeaturesBlock> = {
  title: 'Product/FeaturesBlock/Synaptik Raster',
  component: FeaturesBlock,
  parameters: marketingBlockParameters,
};

export default meta;

type Story = StoryObj<typeof FeaturesBlock>;

export const WithPublishedRasterIcons: Story = {
  args: {
    eyebrow: 'Synaptik raster',
    title: 'Features with published icons',
    subtitle:
      slugs.length > 0
        ? 'Icons from src/assets/generated-icons/my-product/icons.manifest.ts'
        : 'No icons in manifest yet — see Generated Icons → Synaptik guide',
    columns: 3,
    generatedIcons: slugs.length > 0 ? iconsBySlug : undefined,
    generatedIconSize: 56,
    features: synaptikFeatures,
  },
};
