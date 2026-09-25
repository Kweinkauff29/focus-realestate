import { existsSync, renameSync, readdirSync, rmdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

const outputDirectory = resolve("dist/client");
const basePath = (process.env.PAGES_BASE_PATH || "").replace(/\/$/, "");

if (basePath && !/^\/[A-Za-z0-9._/-]+$/.test(basePath)) {
  throw new Error(`Invalid PAGES_BASE_PATH: ${basePath}`);
}

if (!basePath) {
  console.log("GitHub Pages root deployment needs no asset relocation.");
  process.exit(0);
}

const baseSegments = basePath.split("/").filter(Boolean);
const generatedAssets = join(outputDirectory, ...baseSegments, "_next");
const publishedAssets = join(outputDirectory, "_next");

if (!existsSync(generatedAssets)) {
  throw new Error(`Expected generated assets at ${generatedAssets}`);
}

if (existsSync(publishedAssets)) {
  throw new Error(`Refusing to replace existing assets at ${publishedAssets}`);
}

renameSync(generatedAssets, publishedAssets);

let directory = dirname(generatedAssets);
while (directory !== outputDirectory && readdirSync(directory).length === 0) {
  const parent = dirname(directory);
  rmdirSync(directory);
  directory = parent;
}

console.log(`Prepared static assets for GitHub Pages base path ${basePath}.`);
