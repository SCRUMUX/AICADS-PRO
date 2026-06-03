import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMainConfig } from '@ai-ds/core/storybook/createMainConfig.mjs';

const storybookDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(storybookDir, '..');

export default createMainConfig({
  mode: 'consumer',
  storybookDir,
  projectRoot,
  generatedIconsDir: 'src/assets/generated-icons',
});
