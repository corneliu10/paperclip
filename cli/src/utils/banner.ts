import pc from "picocolors";

const BIRDAI_ART = [
  "██████╗  █████╗ ██████╗ ███████╗██████╗  ██████╗██╗     ██╗██████╗ ",
  "██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝██║     ██║██╔══██╗",
  "██████╔╝███████║██████╔╝█████╗  ██████╔╝██║     ██║     ██║██████╔╝",
  "██╔═══╝ ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗██║     ██║     ██║██╔═══╝ ",
  "██║     ██║  ██║██║     ███████╗██║  ██║╚██████╗███████╗██║██║     ",
  "╚═╝     ╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝╚═╝     ",
] as const;

const TAGLINE = "Open-source orchestration for zero-human companies";

export function printBirdAICliBanner(): void {
  const lines = [
    "",
    ...BIRDAI_ART.map((line) => pc.cyan(line)),
    pc.blue("  ───────────────────────────────────────────────────────"),
    pc.bold(pc.white(`  ${TAGLINE}`)),
    "",
  ];

  console.log(lines.join("\n"));
}
