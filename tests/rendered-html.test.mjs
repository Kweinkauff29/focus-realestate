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
  assert.match(html, /id="sneak-idx-search-bar"/);
  assert.match(html, /data-site="ursulaweinkauff-com"/);
  assert.match(html, /data-widget="quick-search"/);
  assert.match(html, /data-heading="Find Your Southwest Florida Dream Home"/);
  assert.match(html, /data-redirect-url="https:\/\/ursulaweinkauff.com\/quick-search"/);
  assert.match(html, /id="sneak-idx-grid"/);
  assert.match(html, /data-layout="grid"/);
  assert.match(html, /data-agent="633942, B3512909"/);
  assert.match(html, /data-pin-agents="633942, B3512909"/);
  assert.doesNotMatch(html, /data-featured="true"/);
  assert.match(html, /Browse by price/);
  assert.match(html, /aria-controls="community-prices-bonita-springs"/);
  assert.doesNotMatch(html, /&amp;nearr;/);
  assert.match(html, /More than a home/);
  assert.match(html, /Local knowledge/);
  assert.match(html, /class="nav-trigger"/);
  assert.doesNotMatch(html, /class="nav-group[^"]*"><summary>/);
  assert.doesNotMatch(html, /href="\/advanced-search"/);
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
  assert.match(teamListings, /Meet the team behind the listings/);
  assert.match(teamListings, /Ursula Weinkauff/);
  assert.match(teamListings, /Kristin Boyle/);
  assert.match(teamListings, /Gunnar Ketzler/);
  assert.match(teamListings, /Pat Dimitroff/);
  const teamGrid = teamListings.slice(teamListings.indexOf("team-grid"));
  assert.ok(teamGrid.indexOf("Ursula Weinkauff") < teamGrid.indexOf("Kristin Boyle"));
  assert.match(marketSearch, /id="sneak-idx-pinned"/);
  assert.match(marketSearch, /data-pin-agents="633942,B3233500,B3512909"/);
});

test("exports working luxury filters and the enhanced about page", async () => {
  const [luxury, about] = await Promise.all([
    readFile(new URL("luxury-homes-for-sale-in-naples-fl.html", outputRoot), "utf8"),
    readFile(new URL("about-us.html", outputRoot), "utf8"),
  ]);

  assert.match(luxury, /data-location="Naples"/);
  assert.match(luxury, /data-min-price="2500000"/);
  assert.doesNotMatch(luxury, /data-max-price=/);
  assert.match(about, /Local roots\. Global perspective\./);
  assert.match(about, /Since 1996/);
  assert.match(about, /One team\. Every property type\./);
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
    access(new URL("assets/swfl-coast-aerial-alex-perez.webp", outputRoot)),
    access(new URL("assets/naples-pier-sunset-rolando-yera.webp", outputRoot)),
  ]);
});
