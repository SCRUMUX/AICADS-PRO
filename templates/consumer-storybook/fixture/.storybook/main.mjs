import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMainConfig } from '@ai-ds/core/storybook/createMainConfig.mjs';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(storybookDir, '..');

const config = createMainConfig({
  mode: 'consumer',
  storybookDir,
  projectRoot,
  /** Monorepo fixture: Synaptik catalog at repo root (optional — omit in real consumer apps). */
  generatedIconsDir: path.resolve(projectRoot, '../../../generated-icons'),
});

export default config;
