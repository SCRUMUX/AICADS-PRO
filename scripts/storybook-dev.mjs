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
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORT = process.env.STORYBOOK_PORT ?? '6006';
const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaultProjectDir = path.join(repoRoot, 'playground');
const projectArg = process.argv[2];
const projectDir = projectArg
  ? path.resolve(process.cwd(), projectArg)
  : defaultProjectDir;

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

const result = spawnSync(
  'npx',
  ['storybook', 'dev', '-p', PORT, '--no-open', '--ci'],
  {
    cwd: projectDir,
    stdio: 'inherit',
    shell: true,
  },
);

process.exit(result.status ?? 1);
