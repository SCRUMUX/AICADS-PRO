#!/usr/bin/env node
/**
 * Start Storybook on a fixed port after freeing stale listeners (Windows-friendly).
 *
 * Usage:
 *   node scripts/storybook-dev.mjs              # playground (monorepo catalog)
 *   node scripts/storybook-dev.mjs .          # current dir (consumer fixture)
 *   node scripts/storybook-dev.mjs path/to/project
 */
import { execSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = process.env.STORYBOOK_PORT ?? '6006';
const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultProjectDir = path.join(repoRoot, 'playground');
const cliArgs = process.argv.slice(2);
let projectDir = defaultProjectDir;
const extraArgs = [];

for (const arg of cliArgs) {
  const resolved = path.resolve(process.cwd(), arg);
  const looksLikeDir =
    arg === '.' ||
    arg === '..' ||
    (!arg.startsWith('-') &&
      (fs.existsSync(resolved) || fs.existsSync(path.join(resolved, 'package.json'))));
  if (looksLikeDir && projectDir === defaultProjectDir && !arg.startsWith('-')) {
    projectDir = resolved;
  } else {
    extraArgs.push(arg);
  }
}

function killPort(port) {
  if (process.platform !== 'win32') {
    try {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'ignore', shell: true });
    } catch {
      // port free
    }
    return;
  }

  try {
    const out = execSync(`netstat -ano | findstr ":${port}"`, { encoding: 'utf8' });
    const pids = new Set();
    for (const line of out.split(/\r?\n/)) {
      if (line.includes('LISTENING')) {
        const pid = line.trim().split(/\s+/).at(-1);
        if (pid && /^\d+$/.test(pid)) pids.add(pid);
      }
    }
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
      } catch {
        // already gone
      }
    }
  } catch {
    // port free
  }
}

killPort(PORT);

console.log(`Starting Storybook in ${projectDir}`);
console.log(`Local: http://localhost:${PORT}/`);

const storybookArgs = [
  'storybook',
  'dev',
  '-p',
  PORT,
  '--host',
  '127.0.0.1',
  ...(extraArgs.includes('--smoke-test') ? [] : ['--no-open']),
  ...extraArgs,
];

const result = spawnSync('npx', storybookArgs, {
    cwd: projectDir,
    stdio: 'inherit',
    shell: true,
    env: { ...process.env, STORYBOOK: '1' },
  },
);

if (result.status !== 0) {
  console.error('\nStorybook failed to start. Try from repo root:\n');
  console.error('  npm run storybook:reset\n');
  console.error('Or manually:\n');
  console.error('  cd playground && npm ci && npm run storybook\n');
}
process.exit(result.status ?? 1);
