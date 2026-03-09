import fs from "node:fs";
import path from "node:path";
import { resolveDefaultConfigPath } from "./home-paths.js";

const BIRDAI_CONFIG_BASENAME = "config.json";
const BIRDAI_ENV_FILENAME = ".env";

function findConfigFileFromAncestors(startDir: string): string | null {
  const absoluteStartDir = path.resolve(startDir);
  let currentDir = absoluteStartDir;

  while (true) {
    const candidate = path.resolve(currentDir, ".birdai", BIRDAI_CONFIG_BASENAME);
    if (fs.existsSync(candidate)) {
      return candidate;
    }

    const nextDir = path.resolve(currentDir, "..");
    if (nextDir === currentDir) break;
    currentDir = nextDir;
  }

  return null;
}

export function resolveBirdAIConfigPath(overridePath?: string): string {
  if (overridePath) return path.resolve(overridePath);
  if (process.env.BIRDAI_CONFIG) return path.resolve(process.env.BIRDAI_CONFIG);
  return findConfigFileFromAncestors(process.cwd()) ?? resolveDefaultConfigPath();
}

export function resolveBirdAIEnvPath(overrideConfigPath?: string): string {
  return path.resolve(path.dirname(resolveBirdAIConfigPath(overrideConfigPath)), BIRDAI_ENV_FILENAME);
}
