import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { flattenBlocksToCards } from '../pipeline/content-structure.js';
import {
  ensureUniqueBlockAndCardIds,
  mapVisionBlocksRaw,
  safeCardFileSlug,
  slugifyBlockOrCardId,
} from './ensure-unique-content.js';
import type { ContentBlock } from '../types/index.js';

describe('ensureUniqueBlockAndCardIds', () => {
  it('gives distinct block ids when titles are Cyrillic-only', () => {
    const blocks: ContentBlock[] = [
      {
        id: 'icon',
        title: 'Мероприятия',
        cards: [{ id: 'icon', title: 'Карточка A' }],
      },
      {
        id: 'icon',
        title: 'Отсутствие контроля',
        cards: [{ id: 'icon', title: 'Карточка B' }],
      },
    ];
    const out = ensureUniqueBlockAndCardIds(blocks);
    assert.notEqual(out[0].id, out[1].id);
    assert.notEqual(out[0].cards[0].id, out[1].cards[0].id);
  });

  it('dedupes duplicate slugs with numeric suffix', () => {
    const blocks: ContentBlock[] = [
      { id: 'features', title: 'Features', cards: [{ title: 'One' }] },
      { id: 'features', title: 'Features 2', cards: [{ title: 'Two' }] },
    ];
    const out = ensureUniqueBlockAndCardIds(blocks);
    assert.equal(out[0].id, 'features');
    assert.equal(out[1].id, 'features-2');
  });
});

describe('slugifyBlockOrCardId', () => {
  it('uses hash prefix for empty latin slug', () => {
    const id = slugifyBlockOrCardId(undefined, 'Урожай', 'card');
    assert.ok(id.startsWith('card-'));
    assert.notEqual(id, 'icon');
  });
});

describe('mapVisionBlocksRaw', () => {
  it('assigns unique non-icon ids for Cyrillic-only vision output', () => {
    const blocks = mapVisionBlocksRaw([
      {
        title: 'Мероприятия',
        cards: [{ title: 'Карточка A' }, { title: 'Карточка B' }],
      },
      {
        title: 'Контроль',
        cards: [{ title: 'Карточка C' }],
      },
    ]);
    const cardIds = blocks.flatMap((b) => b.cards.map((c) => c.id));
    assert.equal(new Set(cardIds).size, cardIds.length);
    for (const id of cardIds) {
      assert.ok(id);
      assert.ok(id.length > 0);
      assert.notEqual(id, 'icon');
    }
  });
});

describe('flattenBlocksToCards', () => {
  it('never emits empty card id', () => {
    const blocks: ContentBlock[] = [
      {
        id: 'block-1',
        title: 'Block',
        cards: [{ id: '', title: 'Только кириллица' }],
      },
    ];
    const flat = flattenBlocksToCards(ensureUniqueBlockAndCardIds(blocks));
    assert.ok(flat[0].id.length > 0);
    assert.notEqual(flat[0].id, 'icon');
  });
});

describe('safeCardFileSlug', () => {
  it('falls back to hash slug when cardId slugifies to icon', () => {
    const slug = safeCardFileSlug('icon');
    assert.ok(slug.startsWith('card-'));
    assert.notEqual(slug, 'icon');
  });
});
