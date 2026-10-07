(async () => {
  const { spawnSync } = await import("node:child_process");
  const path = await import("node:path");

  const inputFile = process.argv[2];

  if (!inputFile) {
    console.error("SYNTAX_ERROR: No Mermaid input file provided.");
    process.exit(1);
  }

  const outputFile = path.join(
    path.dirname(inputFile),
    "erd.svg"
  );

  const result = spawnSync(
    "npx",
    ["mmdc", "-i", inputFile, "-o", outputFile],
    {
      encoding: "utf8",
    }
  );

  if (result.status === 0) {
    console.log("SUCCESS");
    process.exit(0);
  }

  console.error(`SYNTAX_ERROR: ${result.stderr || result.error?.message || "Unknown compilation error"}`);
  process.exit(1);
})();