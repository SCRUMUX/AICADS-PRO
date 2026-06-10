import type { Meta, StoryObj } from '@storybook/react';
import { AdminPageTemplate } from './AdminPageTemplate';
import { marketingBlockParameters } from '../../_shared/blockStoryViewports';
import {
  aicadsProAdminArgs,
  aicadsProAdminCasePublished,
  aicadsProAdminEventDraft,
} from '../aicadsProAdminFixtures';

const meta: Meta<typeof AdminPageTemplate> = {
  title: 'Screens/AICADS PRO Admin',
  component: AdminPageTemplate,
  parameters: {
    ...marketingBlockParameters,
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'AICADS PRO admin console — case studies, events, users, and partner assets. Front-only local state; no API or routing.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof AdminPageTemplate>;

export const CasesList: Story = {
  render: () => <AdminPageTemplate {...aicadsProAdminArgs} defaultSection="cases" />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const CaseEditor: Story = {
  render: () => (
    <AdminPageTemplate
      {...aicadsProAdminArgs}
      defaultSection="cases"
      initialContentView="edit"
      initialContentSelectedId={aicadsProAdminCasePublished.id}
    />
  ),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const EventsList: Story = {
  render: () => <AdminPageTemplate {...aicadsProAdminArgs} defaultSection="events" />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const EventEditor: Story = {
  render: () => (
    <AdminPageTemplate
      {...aicadsProAdminArgs}
      defaultSection="events"
      initialContentView="edit"
      initialContentSelectedId={aicadsProAdminEventDraft.id}
    />
  ),
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Users: Story = {
  render: () => <AdminPageTemplate {...aicadsProAdminArgs} defaultSection="users" />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Partners: Story = {
  render: () => <AdminPageTemplate {...aicadsProAdminArgs} defaultSection="partners" />,
  parameters: { viewport: { defaultViewport: 'desktop' } },
};

export const Mobile: Story = {
  render: () => <AdminPageTemplate {...aicadsProAdminArgs} defaultSection="cases" />,
  parameters: { viewport: { defaultViewport: 'mobile' } },
};
