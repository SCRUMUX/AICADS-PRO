import { slugifyBlockOrCardId } from '../utils/ensure-unique-content.js';
import { normalizeTitle } from '../utils/title-normalize.js';
import type { ContentCard } from '../types/index.js';

export type ConceptBatchEntry = {
  concepts: Array<{
    id: string;
    label: string;
    visualObject?: string;
    iconSubject?: string;
    description?: string;
  }>;
};

/** Match LLM byCardId keys to normalized card.id (handles icon / kebab / Cyrillic titles). */
export function resolveConceptsForCard(
  byCardId: Record<string, ConceptBatchEntry | undefined> | undefined,
  card: ContentCard,
): ConceptBatchEntry | undefined {
  if (!byCardId) return undefined;

  const direct = byCardId[card.id];
  if (direct?.concepts?.length) return direct;

  const cardNorm = normalizeTitle(card.title);

  for (const [key, entry] of Object.entries(byCardId)) {
    if (!entry?.concepts?.length) continue;
    if (key === card.id) return entry;
    const keyAsId = slugifyBlockOrCardId(key, card.title, 'card');
    if (keyAsId === card.id) return entry;
    if (normalizeTitle(key) === cardNorm) return entry;
  }

  return undefined;
}
