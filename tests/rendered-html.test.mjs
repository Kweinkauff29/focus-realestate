import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../dist/client/", import.meta.url);

test("exports the production home page and GitHub Pages control files", async () => {
  const [html, cname] = await Promise.all([
    readFile(new URL("index.html", outputRoot), "utf8"),
    readFile(new URL("CNAME", outputRoot), "utf8"),
    access(new URL(".nojekyll", outputRoot)),
    access(new URL("404.html", outputRoot)),
  ]);

  assert.match(html, /<title>Ursula Weinkauff \| Focus Group by Local Real Estate/);
  assert.match(html, /id="sneak-idx-search"/);
  assert.equal(cname.trim(), "ursulaweinkauff.com");
});

test("exports every known route and its shared client assets", async () => {
  const files = await readdir(outputRoot, { recursive: true });
  const htmlFiles = files.filter((file) => file.endsWith(".html"));

  assert.equal(htmlFiles.length, 96);
  await Promise.all([
    access(new URL("about-us.html", outputRoot)),
    access(new URL("contact-us.html", outputRoot)),
    access(new URL("idx/search/properties.html", outputRoot)),
    access(
      new URL(
        "idx/listing/featured/303628758/347-Piper-Ave-Lehigh-Acres-FL-33974.html",
        outputRoot,
      ),
    ),
    access(new URL("_next/", outputRoot)),
    access(new URL("assets/focus-logo.png", outputRoot)),
  ]);
});
