import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const outputDirectory = resolve("dist/client");
const basePath = (process.env.PAGES_BASE_PATH || "").replace(/\/$/, "");

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

function localTargetExists(urlPath) {
  const pathWithoutSuffix = urlPath.split(/[?#]/, 1)[0];
  let relativePath = pathWithoutSuffix;

  if (basePath) {
    if (relativePath !== basePath && !relativePath.startsWith(`${basePath}/`)) {
      return false;
    }
    relativePath = relativePath.slice(basePath.length);
  }

  relativePath = relativePath.replace(/^\//, "");
  if (!relativePath) return existsSync(join(outputDirectory, "index.html"));

  const exactTarget = join(outputDirectory, ...relativePath.split("/"));
  return (
    (existsSync(exactTarget) && statSync(exactTarget).isFile()) ||
    existsSync(`${exactTarget}.html`) ||
    existsSync(join(exactTarget, "index.html"))
  );
}

for (const requiredFile of ["index.html", "404.html", "CNAME", ".nojekyll"]) {
  if (!existsSync(join(outputDirectory, requiredFile))) {
    throw new Error(`Missing required GitHub Pages output: ${requiredFile}`);
  }
}

const cname = readFileSync(join(outputDirectory, "CNAME"), "utf8").trim();
if (cname !== "ursulaweinkauff.com") {
  throw new Error(`Unexpected CNAME value: ${cname}`);
}

const htmlFiles = walk(outputDirectory).filter((file) => file.endsWith(".html"));
if (htmlFiles.length < 90) {
  throw new Error(`Expected at least 90 rendered pages, found ${htmlFiles.length}`);
}

const missingReferences = new Set();
const localReferencePattern = /\b(?:href|src|action)=["'](\/[^"']*)["']/g;

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, "utf8");
  for (const match of html.matchAll(localReferencePattern)) {
    const reference = match[1];
    if (reference.startsWith("//") || !localTargetExists(reference)) {
      missingReferences.add(`${htmlFile}: ${reference}`);
    }
  }
}

if (missingReferences.size) {
  throw new Error(
    `Broken or incorrectly prefixed local references:\n${[...missingReferences].join("\n")}`,
  );
}

console.log(
  `Verified ${htmlFiles.length} HTML pages, the custom-domain marker, and all local href/src targets.`,
);
