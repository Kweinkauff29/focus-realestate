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
  assert.match(html, /id="sneak-idx-featured"/);
  assert.match(html, /data-featured="true"/);
  assert.equal(cname.trim(), "ursulaweinkauff.com");
});

test("configures team-only and pinned-agent IDX feeds", async () => {
  const [teamListings, marketSearch] = await Promise.all([
    readFile(new URL("office-listings.html", outputRoot), "utf8"),
    readFile(new URL("quick-search.html", outputRoot), "utf8"),
  ]);

  assert.match(teamListings, /id="sneak-idx-featured"/);
  assert.match(teamListings, /data-featured="true"/);
  assert.doesNotMatch(teamListings, /data-pin-agents=/);
  assert.match(marketSearch, /id="sneak-idx-pinned"/);
  assert.match(marketSearch, /data-pin-agents="633942,B3233500,B3512909"/);
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
