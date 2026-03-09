import fs from "node:fs";
import { birdaiConfigSchema, type BirdAIConfig } from "@birdai/shared";
import { resolveBirdAIConfigPath } from "./paths.js";

export function readConfigFile(): BirdAIConfig | null {
  const configPath = resolveBirdAIConfigPath();

  if (!fs.existsSync(configPath)) return null;

  try {
    const raw = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    return birdaiConfigSchema.parse(raw);
  } catch {
    return null;
  }
}
