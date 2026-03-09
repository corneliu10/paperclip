import type { CLIAdapterModule } from "@birdai/adapter-utils";
import { printProcessStdoutEvent } from "./format-event.js";

export const processCLIAdapter: CLIAdapterModule = {
  type: "process",
  formatStdoutEvent: printProcessStdoutEvent,
};
