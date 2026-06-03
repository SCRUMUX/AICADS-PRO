import { createHash } from 'node:crypto';
import { slugify } from '../paths.js';
import { ContentBlockSchema, type ContentBlock } from '../types/index.js';

/** Stable id when slugify strips Cyrillic to empty. */
export function contentIdFromTitle(title: string, prefix = 'id'): string {
  const trimmed = title.trim() || 'untitled';
  const hash = createHash('sha256').update(trimmed, 'utf8').digest('hex').slice(0, 10);
  return `${prefix}-${hash}`;
}

export function slugifyBlockOrCardId(rawId: string | undefined, title: string, prefix: string): string {
  const fromRaw = rawId?.trim() ? slugify(rawId) : '';
  if (fromRaw && fromRaw !== 'icon') return fromRaw;
  const fromTitle = slugify(title);
  if (fromTitle && fromTitle !== 'icon') return fromTitle;
  return contentIdFromTitle(title, prefix);
}

/** Safe filename slug under concepts/ and prompts/. */
export function safeCardFileSlug(cardId: string): string {
  const base = slugify(cardId);
  if (base && base !== 'icon') return base;
  return contentIdFromTitle(cardId, 'card');
}

export type VisionBlockRaw = {
  id?: string;
  title: string;
  description?: string;
  cards: Array<{
    id?: string;
    title: string;
    description?: string;
    sourceRegion?: string;
  }>;
};

/**
 * Map vision/LLM blocks to ContentBlock[] with stable Cyrillic-safe ids (single entry point).
 */
export function mapVisionBlocksRaw(
  rawBlocks: VisionBlockRaw[],
  limits?: { maxBlocks?: number; maxCardsPerBlock?: number },
): ContentBlock[] {
  const maxBlocks = limits?.maxBlocks ?? rawBlocks.length;
  const maxCardsPerBlock = limits?.maxCardsPerBlock ?? 99;

  const drafts = rawBlocks.slice(0, maxBlocks).map((b, blockIndex) =>
    ContentBlockSchema.parse({
      id: slugifyBlockOrCardId(b.id, b.title, 'block'),
      title: b.title,
      description: b.description,
      sortOrder: blockIndex,
      cards: b.cards.slice(0, maxCardsPerBlock).map((c) => ({
        id: slugifyBlockOrCardId(c.id, c.title, 'card'),
        title: c.title,
        description: c.description,
        sourceRegion: c.sourceRegion,
      })),
    }),
  );

  return ensureUniqueBlockAndCardIds(drafts);
}

/**
 * Ensures unique block.id and card.id within a structure file.
 * Fixes Cyrillic collisions that all collapsed to "icon".
 */
export function ensureUniqueBlockAndCardIds(blocks: ContentBlock[]): ContentBlock[] {
  const usedBlockIds = new Set<string>();
  const usedCardIds = new Set<string>();

  return blocks.map((block, blockIndex) => {
    let blockId = slugifyBlockOrCardId(block.id, block.title, 'block');
    if (usedBlockIds.has(blockId)) {
      let n = 2;
      while (usedBlockIds.has(`${blockId}-${n}`)) n++;
      blockId = `${blockId}-${n}`;
    }
    usedBlockIds.add(blockId);

    const cards = block.cards.map((c) => {
      let cardId = slugifyBlockOrCardId(
        c.id && c.id.length > 0 ? c.id : undefined,
        c.title,
        'card',
      );
      if (usedCardIds.has(cardId)) {
        let n = 2;
        while (usedCardIds.has(`${cardId}-${n}`)) n++;
        cardId = `${cardId}-${n}`;
      }
      usedCardIds.add(cardId);
      return { ...c, id: cardId };
    });

    return ContentBlockSchema.parse({
      ...block,
      id: blockId,
      sortOrder: block.sortOrder ?? blockIndex,
      cards,
    });
  });
}
