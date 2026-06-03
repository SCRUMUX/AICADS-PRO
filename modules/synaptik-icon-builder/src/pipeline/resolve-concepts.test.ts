import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { slugifyBlockOrCardId } from '../utils/ensure-unique-content.js';
import { resolveConceptsForCard } from './resolve-concepts.js';
import type { ContentCard } from '../types/index.js';

describe('resolveConceptsForCard', () => {
  const title = 'Урожай';
  const card: ContentCard = {
    id: slugifyBlockOrCardId(undefined, title, 'card'),
    title,
    blockId: 'block-abc',
    blockTitle: 'Секция',
  };

  it('matches direct card.id key', () => {
    const entry = { concepts: [{ id: 'A', label: 'Sprout' }] };
    const out = resolveConceptsForCard({ [card.id]: entry }, card);
    assert.equal(out, entry);
  });

  it('matches LLM key "icon" via slugifyBlockOrCardId normalization', () => {
    const entry = { concepts: [{ id: 'A', label: 'Grain' }] };
    const out = resolveConceptsForCard({ icon: entry }, card);
    assert.equal(out, entry);
  });

  it('matches by normalized title when key is raw Cyrillic', () => {
    const entry = { concepts: [{ id: 'B', label: 'Field' }] };
    const out = resolveConceptsForCard({ Урожай: entry }, card);
    assert.equal(out, entry);
  });
});
