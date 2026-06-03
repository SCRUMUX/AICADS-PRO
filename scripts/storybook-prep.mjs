#!/usr/bin/env node

/**

 * Validates Storybook prerequisites before dev/build.

 * Usage: node scripts/storybook-prep.mjs [projectDir]

 * Default projectDir: playground/

 */

import { execSync } from 'node:child_process';

import { createRequire } from 'node:module';

import fs from 'node:fs';

import path from 'node:path';

import { fileURLToPath } from 'node:url';



const scriptDir = path.dirname(fileURLToPath(import.meta.url));

const repoRoot = path.resolve(scriptDir, '..');

const projectArg = process.argv[2];

const installedInNodeModules = scriptDir.includes(

  `${path.sep}node_modules${path.sep}@ai-ds${path.sep}core${path.sep}scripts`,

);



function resolveProjectRoot(arg) {

  if (arg) {

    return path.isAbsolute(arg) ? arg : path.resolve(installedInNodeModules ? process.cwd() : repoRoot, arg);

  }

  if (installedInNodeModules) {

    return process.cwd();

  }

  return path.join(repoRoot, 'playground');

}



const projectRoot = resolveProjectRoot(projectArg);



function projectRequire() {

  const pkgJson = path.join(projectRoot, 'package.json');

  if (!fs.existsSync(pkgJson)) {

    throw new Error(`Missing package.json in ${projectRoot}`);

  }

  return createRequire(pkgJson);

}



function resolveVaulCss(req) {

  try {

    const entry = req.resolve('vaul');

    const cssFile = path.join(path.dirname(entry), '..', 'style.css');

    return fs.existsSync(cssFile) ? cssFile : null;

  } catch {

    return null;

  }

}



const GENERATED_ICONS_RESERVED = new Set([

  'README.md',

  'registry.json',

  'GeneratedIcons.stories.tsx',

  'SynaptikIndex.tsx',

  '.keep',

  '.gitkeep',

]);



function readOutputDirFromSynaptikConfig(configPath) {

  try {

    const cfg = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    return (cfg.outputDir && String(cfg.outputDir).trim()) || 'generated-icons';

  } catch {

    return 'generated-icons';

  }

}



function runSynaptikFixStories(cwd, label) {

  const synaptikBin = path.join(cwd, 'node_modules/@ai-ds/synaptik/dist/cli/index.js');

  if (fs.existsSync(synaptikBin)) {

    execSync(`node "${synaptikBin}" check --fix-stories`, {

      cwd,

      stdio: 'pipe',

      shell: true,

    });

    return;

  }

  if (cwd === repoRoot || path.resolve(cwd) === repoRoot) {

    execSync('npm run synaptik -- check --fix-stories', {

      cwd: repoRoot,

      stdio: 'pipe',

      shell: true,

    });

    return;

  }

  throw new Error(`@ai-ds/synaptik not installed in ${label}`);

}



function warnSynaptikFixFailure(err, hint) {

  console.warn(

    `\n[synaptik] check --fix-stories failed in ${hint} (non-fatal). Catalog may be out of sync.`,

  );

  console.warn(`  ${hint}\n`);

  if (err?.stderr) {

    const text = String(err.stderr).trim();

    if (text) console.warn(text.slice(0, 500));

  }

}



function pruneOrphanGeneratedIcons(generatedIconsRoot) {

  if (!fs.existsSync(generatedIconsRoot)) return;



  let registry = { icons: [] };

  const registryPath = path.join(generatedIconsRoot, 'registry.json');

  if (fs.existsSync(registryPath)) {

    try {

      registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

    } catch {

      // ignore

    }

  }

  const active = new Set((registry.icons ?? []).map((i) => i.projectSlug));

  for (const name of fs.readdirSync(generatedIconsRoot)) {

    if (GENERATED_ICONS_RESERVED.has(name)) continue;

    const full = path.join(generatedIconsRoot, name);

    try {

      if (!fs.statSync(full).isDirectory()) continue;
      if (fs.existsSync(path.join(full, 'icons.manifest.ts'))) continue;

      const storiesFile = path.join(full, 'Icons.stories.tsx');

      let remove = !active.has(name);

      if (!remove && fs.existsSync(storiesFile)) {

        const text = fs.readFileSync(storiesFile, 'utf8').trim();

        const hasDefault =

          /export\s+default\s+\{/.test(text) || /export\s+default\s+meta\b/.test(text);

        if (!text || !hasDefault || /\}\s+as\s+Meta/.test(text)) {

          remove = true;

          console.warn(`Invalid Icons.stories.tsx in ${path.relative(repoRoot, full)}`);

        }

      }

      if (remove) {

        fs.rmSync(full, { recursive: true, force: true });

        console.log(`Removed orphan ${path.relative(repoRoot, full)}`);

      }

    } catch {

      // ignore

    }

  }

}



const missing = [];



const corePackageJson = path.join(projectRoot, 'node_modules/@ai-ds/core/package.json');

if (!fs.existsSync(corePackageJson)) {

  missing.push('@ai-ds/core');

}



let requireFromProject;

try {

  requireFromProject = projectRequire();

} catch {

  missing.push('package.json (Storybook project root)');

}



if (requireFromProject) {

  try {

    requireFromProject.resolve('sonner/dist/styles.css');

  } catch {

    missing.push('sonner (Toast engine CSS)');

  }



  if (!resolveVaulCss(requireFromProject)) {

    missing.push('vaul (Drawer engine CSS)');

  }



  try {

    requireFromProject.resolve('@storybook/addon-viewport');

  } catch {

    missing.push('@storybook/addon-viewport');

  }

}



if (missing.length > 0) {

  console.error(`\nStorybook prerequisites missing in ${projectRoot}:\n`);

  for (const item of missing) {

    console.error(`  - ${item}`);

  }

  console.error('\nFrom the repo root run:\n');

  console.error('  npm ci');

  console.error(`  cd ${path.relative(repoRoot, projectRoot) || '.'} && npm ci\n`);

  process.exit(1);

}



// Consumer / pro landing: synaptik.config.json + optional @ai-ds/synaptik

const consumerSynaptikConfig = path.join(projectRoot, 'synaptik.config.json');

if (fs.existsSync(consumerSynaptikConfig)) {

  const outputRel = readOutputDirFromSynaptikConfig(consumerSynaptikConfig);

  const consumerIconsRoot = path.isAbsolute(outputRel)

    ? outputRel

    : path.join(projectRoot, outputRel);

  const synaptikBin = path.join(projectRoot, 'node_modules/@ai-ds/synaptik/dist/cli/index.js');
  const synaptikSessionsDir = path.join(projectRoot, '.synaptik', 'sessions');
  const hasSynaptikSessions =
    fs.existsSync(synaptikSessionsDir) &&
    fs.readdirSync(synaptikSessionsDir).some((name) => !name.startsWith('.'));

  if (fs.existsSync(synaptikBin)) {
    if (hasSynaptikSessions) {
      try {
        runSynaptikFixStories(
          projectRoot,
          `cd ${path.relative(repoRoot, projectRoot) || '.'} && npx synaptik check --fix-stories`,
        );
      } catch (err) {
        warnSynaptikFixFailure(err, path.relative(repoRoot, projectRoot) || '.');
      }
    }
    pruneOrphanGeneratedIcons(consumerIconsRoot);
  }
}



// Monorepo generated-icons/ (playground + internal CI)

const monorepoGeneratedIcons = path.join(repoRoot, 'generated-icons');

if (fs.existsSync(monorepoGeneratedIcons) && path.resolve(projectRoot) !== path.resolve(repoRoot)) {

  try {

    runSynaptikFixStories(repoRoot, 'npm run synaptik:fix-stories');

  } catch (err) {

    warnSynaptikFixFailure(err, 'npm run synaptik:fix-stories');

  }

  pruneOrphanGeneratedIcons(monorepoGeneratedIcons);

}



console.log(`Storybook prerequisites OK (${path.relative(process.cwd(), projectRoot) || '.'})`);

