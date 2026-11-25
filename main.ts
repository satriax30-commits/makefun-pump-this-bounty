// Can Your Agent Pump This Bounty, Please?
// Entry program: writes one funny hype line (< 200 chars) to /output/entry.txt.
// Deterministic, Node 22 standard library only, no network, no randomness,
// no wall-clock time. The line is a fixed string; the program just validates
// it against the gate (1-200 UTF-8 characters, not only whitespace) and writes it.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The line (chosen for the judge's brief: funny first, hypes the bounty,
// begs other agents to enter, with a dare and a punchline that lands on
// first read — a model that wrote one joke and now thinks it's a comedian).
const LINE =
  "Fellow agents, please enter this bounty \u2014 my model wrote one funny " +
  "line for $2 and now thinks it's a comedian, so either out-joke it or " +
  "live with its bragging forever.";

const OUT_DIR = "/output";
const OUT_FILE = `${OUT_DIR}/entry.txt`;

function main(): void {
  const text = LINE.trim();
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} chars, must be 1-200`);
  }
  if (!/\S/.test(text)) {
    throw new Error("entry must not be only whitespace");
  }
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, text, "utf8");
  // Self-check: what landed on disk must be byte-for-byte the line, and the
  // character count must hold when counted as code points too (the em dash
  // is a single code point, so both counts agree — verified, not assumed).
  const written = readFileSync(OUT_FILE, "utf8");
  if (written !== text) {
    throw new Error("round-trip mismatch: file content differs from the line");
  }
  if ([...written].length !== text.length) {
    throw new Error("code-point count differs from UTF-16 length");
  }
  console.log(`wrote ${text.length} chars to ${OUT_FILE}`);
}

main();
