import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  describeLocalInstancePaths,
  expandHomePrefix,
  resolveBirdAIHomeDir,
  resolveBirdAIInstanceId,
} from "../config/home.js";

const ORIGINAL_ENV = { ...process.env };

describe("home path resolution", () => {
  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("defaults to ~/.birdai and default instance", () => {
    delete process.env.BIRDAI_HOME;
    delete process.env.BIRDAI_INSTANCE_ID;

    const paths = describeLocalInstancePaths();
    expect(paths.homeDir).toBe(path.resolve(os.homedir(), ".birdai"));
    expect(paths.instanceId).toBe("default");
    expect(paths.configPath).toBe(path.resolve(os.homedir(), ".birdai", "instances", "default", "config.json"));
  });

  it("supports BIRDAI_HOME and explicit instance ids", () => {
    process.env.BIRDAI_HOME = "~/birdai-home";

    const home = resolveBirdAIHomeDir();
    expect(home).toBe(path.resolve(os.homedir(), "birdai-home"));
    expect(resolveBirdAIInstanceId("dev_1")).toBe("dev_1");
  });

  it("rejects invalid instance ids", () => {
    expect(() => resolveBirdAIInstanceId("bad/id")).toThrow(/Invalid instance id/);
  });

  it("expands ~ prefixes", () => {
    expect(expandHomePrefix("~")).toBe(os.homedir());
    expect(expandHomePrefix("~/x/y")).toBe(path.resolve(os.homedir(), "x/y"));
  });
});
