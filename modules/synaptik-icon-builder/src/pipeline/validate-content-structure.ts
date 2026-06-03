import path from 'node:path';
import { writeJsonFile } from '../fs-json.js';
import type { SessionPaths } from '../paths.js';
import type { ContentBlock } from '../types/index.js';

export interface ContentStructureAudit {
  generatedAt: string;
  blockCount: number;
  cardCount: number;
  duplicateBlockIds: string[];
  duplicateCardIds: string[];
  emptyBlockIds: string[];
  emptyCardIds: string[];
  invalidCardIds: string[];
  emptyBlocks: string[];
  blockTitleInCards: Array<{ blockId: string; cardTitle: string }>;
  orphanCardTitles: string[];
  warnings: string[];
}

function isInvalidCardId(id: string): boolean {
  const t = id.trim();
  if (!t) return true;
  if (t === 'icon') return true;
  return false;
}

export function auditContentStructure(blocks: ContentBlock[]): ContentStructureAudit {
  const duplicateBlockIds: string[] = [];
  const seenBlocks = new Map<string, number>();
  for (const b of blocks) {
    seenBlocks.set(b.id, (seenBlocks.get(b.id) ?? 0) + 1);
  }
  for (const [id, count] of seenBlocks) {
    if (count > 1) duplicateBlockIds.push(id);
  }

  const duplicateCardIds: string[] = [];
  const seenCards = new Map<string, number>();
  const emptyBlockIds: string[] = [];
  const emptyCardIds: string[] = [];
  const invalidCardIds: string[] = [];
  const emptyBlocks: string[] = [];
  const blockTitleInCards: Array<{ blockId: string; cardTitle: string }> = [];
  const warnings: string[] = [];

  for (const block of blocks) {
    if (!block.id?.trim()) emptyBlockIds.push(block.id || '(empty)');
    if (block.cards.length === 0) emptyBlocks.push(block.id);
    const blockTitleNorm = block.title.trim().toLowerCase();
    for (const card of block.cards) {
      const cardId = card.id?.trim() ?? '';
      if (!cardId) emptyCardIds.push(`${block.id}:${card.title}`);
      else if (isInvalidCardId(cardId)) invalidCardIds.push(cardId);
      seenCards.set(cardId || card.title, (seenCards.get(cardId || card.title) ?? 0) + 1);
      if (card.title.trim().toLowerCase() === blockTitleNorm) {
        blockTitleInCards.push({ blockId: block.id, cardTitle: card.title });
      }
    }
  }

  for (const [id, count] of seenCards) {
    if (count > 1) duplicateCardIds.push(id);
  }

  if (duplicateBlockIds.length > 0) {
    warnings.push(`Duplicate block ids: ${duplicateBlockIds.join(', ')}`);
  }
  if (duplicateCardIds.length > 0) {
    warnings.push(`Duplicate card ids: ${duplicateCardIds.join(', ')}`);
  }
  if (emptyBlockIds.length > 0) {
    warnings.push(`Empty block ids: ${emptyBlockIds.join(', ')}`);
  }
  if (emptyCardIds.length > 0) {
    warnings.push(`Empty card ids: ${emptyCardIds.slice(0, 8).join(', ')}${emptyCardIds.length > 8 ? '…' : ''}`);
  }
  if (invalidCardIds.length > 0) {
    warnings.push(`Invalid card ids (icon/empty): ${invalidCardIds.join(', ')}`);
  }
  if (emptyBlocks.length > 0) {
    warnings.push(`Blocks without cards: ${emptyBlocks.join(', ')}`);
  }
  if (blockTitleInCards.length > 0) {
    warnings.push(
      `Card title equals block title in ${blockTitleInCards.length} place(s)`,
    );
  }

  const cardCount = blocks.reduce((n, b) => n + b.cards.length, 0);

  return {
    generatedAt: new Date().toISOString(),
    blockCount: blocks.length,
    cardCount,
    duplicateBlockIds,
    duplicateCardIds,
    emptyBlockIds,
    emptyCardIds,
    invalidCardIds,
    emptyBlocks,
    blockTitleInCards,
    orphanCardTitles: [],
    warnings,
  };
}

export function validateContentStructure(blocks: ContentBlock[]): void {
  const audit = auditContentStructure(blocks);
  if (
    audit.duplicateBlockIds.length > 0 ||
    audit.duplicateCardIds.length > 0 ||
    audit.emptyCardIds.length > 0 ||
    audit.invalidCardIds.length > 0 ||
    audit.emptyBlockIds.length > 0
  ) {
    throw new Error(audit.warnings.join('; '));
  }
}

export function writeStructureAudit(
  paths: SessionPaths,
  audit: ContentStructureAudit,
): void {
  const auditPath = path.join(
    path.dirname(paths.contentStructure),
    'content-structure.audit.json',
  );
  writeJsonFile(auditPath, audit);
}

/** Remove empty blocks and cards that duplicate block titles. */
export function sanitizeContentStructure(blocks: ContentBlock[]): ContentBlock[] {
  return blocks
    .map((block) => {
      const blockTitleNorm = block.title.trim().toLowerCase();
      const cards = block.cards.filter(
        (c) => c.title.trim().toLowerCase() !== blockTitleNorm,
      );
      return { ...block, cards };
    })
    .filter((b) => !b.skipped && b.cards.length > 0);
}
