import { fal } from '@fal-ai/client';
import { loadSynaptikEnv } from '../load-env.js';
import { MVP_DEFAULTS } from '../types/index.js';

loadSynaptikEnv();

export interface FluxGenerateOptions {
  seed?: number;
}

export interface FluxResult {
  imageUrl: string;
  seed: number;
  timings?: Record<string, number>;
}

function parseFalSteps(): number {
  const raw = process.env.SYNAPTIK_FAL_STEPS;
  if (!raw) return 4;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1 || n > 12) return 4;
  return n;
}

function parseGuidanceScale(): number {
  const raw = process.env.SYNAPTIK_FAL_GUIDANCE;
  if (!raw) return 3.5;
  const n = parseFloat(raw);
  if (Number.isNaN(n) || n < 1 || n > 20) return 3.5;
  return n;
}

export async function generateIconImage(
  prompt: string,
  opts: FluxGenerateOptions = {},
): Promise<FluxResult> {
  const key = process.env.FAL_KEY;
  if (!key) throw new Error('FAL_KEY is required for image generation.');

  fal.config({ credentials: key });

  const input: Record<string, unknown> = {
    prompt,
    image_size: MVP_DEFAULTS.falImageSize,
    num_inference_steps: parseFalSteps(),
    guidance_scale: parseGuidanceScale(),
    num_images: MVP_DEFAULTS.falNumImages,
    output_format: 'png',
    acceleration: 'none',
  };

  if (opts.seed != null) {
    input.seed = opts.seed;
  }

  const result = await fal.subscribe(MVP_DEFAULTS.falModel, {
    input,
    logs: false,
  });

  const data = result.data as {
    images?: Array<{ url?: string }>;
    image?: { url?: string };
    seed?: number;
    timings?: Record<string, number>;
  };

  const url = data.images?.[0]?.url ?? data.image?.url;

  if (!url) throw new Error('fal.ai returned no image URL');

  return {
    imageUrl: url,
    seed: data.seed ?? opts.seed ?? 0,
    timings: data.timings,
  };
}

export async function downloadImage(url: string): Promise<Buffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download image: ${res.status}`);
  const arr = await res.arrayBuffer();
  return Buffer.from(arr);
}
