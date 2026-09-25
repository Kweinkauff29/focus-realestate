import type { Metadata } from "next";
import { AreaChart } from "../area-chart";
import { ContactForm, PageShell, ProfileAside, SiteFooter, SiteHeader } from "../components";
import { IdxSearch } from "../idx-search";
import { legacySlugs, locations, testimonials } from "../site-data";
import { sitePath } from "../site-path";

type RouteProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

type AreaGuideData = {
  name: string;
  seo: string;
  facts: string[];
  english: string;
  german: string;
  listingsSlug?: string;
  charts: Array<{ kicker: string; title: string; src: string; note: string }>;
};

const areaGuides: Record<string, AreaGuideData> = {
  "pelican-landing-area-info": {
    name: "Pelican Landing",
    seo: "Explore Pelican Landing homes for sale, Pelican Landing condos for sale, Pelican Landing real estate, and Pelican Landing waterfront homes in Bonita Springs, Florida.",
    facts: ["Bonita Springs, Florida", "2,300+ Acre Master-Planned Community", "Estero Bay Location", "34-Acre Private Beach Park", "12 Har-Tru Tennis Courts", "6 Pickleball Courts", "3 Championship Golf Courses"],
    english: "Pelican Landing in Bonita Springs, is a naturally beautiful community where residents have access to a one-of-a-kind Private Island Beach Park • Coconut Point Marina on Estero Bay with Sailing Center where residents can check out sailboats & kayaks, and enjoy complimentary sailing lessons • Canoe/Kayak Park • Community Center where residents gather to play games and socialize • Fitness Center • 2 Bocce Courts • 12 Tennis courts • 6 Pickleball courts • 3 fishing piers • Butterfly Garden, all nestled in amongst the protected nature preserve areas and there are 2 Country Clubs with three 18-hole golf courses between them. The community is also close to a variety of shopping, dining, and entertainment options, making it a popular choice for those looking for a peaceful and convenient place to call home. Whatever type of home you desire, from a cottage overlooking a golf course, a custom estate home to a high-rise condo overlooking the Gulf, you will find within Pelican Landing.",
    german: "Pelican Landing in Bonita Springs ist eine natürlich schöne Community, in der die Bewohner Zugang zu einem einzigartigen Privatinsel-Strandpark haben • Coconut Point Marina in der Estero Bay mit Segelzentrum, wo die Bewohner Segelboote und Kajaks ausleihen und kostenlos Segelunterricht genießen können • Kanu-/Kajakpark • Community Zentrum, in dem sich die Bewohner versammeln, um Spiele zu spielen und Kontakte zu knüpfen • Fitnesscenter • 2 Bocciaplätze • 12 Tennisplätze • 6 Pickleball-Plätze • 3 Boot Angelstege • Schmetterlingsgarten, alles eingebettet in die geschützten Naturschutzgebiete und es gibt 2 Country Clubs mit drei 18-Loch-Golfplätzen innnerhalb der Community. Pelican Landing liegt auch in der Nähe einer Vielzahl von Einkaufs-, Speise- und Unterhaltungsmöglichkeiten, was sie zu einer beliebten Wahl für diejenigen macht, die einen ruhigen und bequemen Ort suchen, in dem sie sich Zuhause fühlen können. Welche Art von Immobilie Sie sich auch immer wünschen, von einem Cottage mit Blick auf einen Golfplatz, einem luxuriösen Anwesen bis hin zu einer Eigentumswohnung in einem Hochhaus mit Blick auf den Golf, Sie werden in Pelican Landing fündig.",
    charts: [
      { kicker: "Monthly Trend", title: "New Listings", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUVM-rRc?w=438&h=329", note: "Track listing activity as new Pelican Landing properties come to market." },
      { kicker: "Monthly Trend", title: "Closed Sales", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUV1-Th5?w=438&h=329", note: "See how closed transaction volume has moved over time." },
      { kicker: "Current Inventory", title: "Homes for Sale", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUVJ-K44?w=901&h=676", note: "A quick visual snapshot of active Pelican Landing inventory." },
    ],
  },
  "the-colony-area-info": {
    name: "The Colony",
    seo: "Explore The Colony at Pelican Landing homes for sale, The Colony condos for sale, The Colony high-rise condos, and The Colony real estate in Bonita Springs, Florida.",
    facts: ["Bonita Springs, Florida", "Phase II of Pelican Landing", "Developed by WCI", "Estero Bay Bay Club", "Beach Park Access", "Tennis & Pickleball", "High-Rise to Golf Villa Options"],
    english: "The Colony at Pelican Landing is an upscale gated community located in Bonita Springs, Florida. The community offers a range of amenities including golf, tennis, pickle ball, bay club, boating, kayak & canoe and a beach park. The Colony is known for its luxury homes, resort-style amenities, and its location near some of Southwest Florida's best shopping, dining, and entertainment.",
    german: "The Colony at Pelican Landing ist eine gehobene Community in Bonita Springs, Florida. Die Community bietet eine Reihe von Annehmlichkeiten, darunter Golf, Tennis, Pickle Ball, Bay Club, Bootfahren, Kajak und Kanu sowie einen Beach park. The Colony ist bekannt für seine luxuriösen Häuser, Annehmlichkeiten im Resort-Stil und seine Lage in der Nähe einiger der besten Einkaufsmöglichkeiten, Restaurants und Unterhaltungsmöglichkeiten im Südwesten Floridas.",
    charts: [
      { kicker: "Monthly Trend", title: "New Listings", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUci-yFW?w=438&h=329", note: "Track listing activity as new The Colony properties come to market." },
      { kicker: "Monthly Trend", title: "Closed Sales", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUcJ-13X?w=438&h=329", note: "See how closed transaction volume has moved over time." },
      { kicker: "Current Inventory", title: "Homes for Sale", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUcW-pEH?w=901&h=676", note: "A quick visual snapshot of active The Colony inventory." },
    ],
  },
  "bonita-bay-area-info": {
    name: "Bonita Bay",
    seo: "Explore Bonita Bay homes for sale, Bonita Bay condos for sale, Bonita Bay real estate, Bonita Bay luxury homes, Bonita Bay high-rise residences, and Bonita Bay waterfront lifestyle in Bonita Springs, Florida.",
    facts: ["Bonita Springs, Florida", "2,400-Acre Master-Planned Community", "Private Beach Access", "Bonita Bay Marina", "12 Miles of Recreational Paths", "Condos to Estate Homes", "Gated Luxury Lifestyle"],
    english: "Bonita Bay is a world class 2400 acre master-planned gated community in Bonita Springs, Florida. It is known for its luxurious homes, golf courses, marina, and diverse amenities, including tennis courts, beach clubs, and nature trails. The community offers a variety of Real Estate options, ranging from condominiums, villas, high-rise residences and single-family homes to custom estate homes. Bonita Bay is considered a top destination for those seeking an upscale, amenity-rich lifestyle in Southwest Florida.",
    german: "Bonita Bay ist eine erstklassige, 2400 Hektar große Community in Bonita Springs, Florida. Es ist bekannt für seine luxuriösen Häuser, Golfplätze, der Marina und verschiedene Annehmlichkeiten, darunter Tennisplätze, Beach Clubs und Naturpfade. Die Gemeinde bietet eine Vielzahl von Immobilienoptionen an, die von Eigentumswohnungen, Villen, Hochhäusern und Einfamilienhäusern bis hin zu luxuriösen Anwesen reichen. Bonita Bay gilt als Top-Reiseziel für diejenigen, die einen gehobenen, an Annehmlichkeiten reichen Lebensstil im Südwesten Floridas suchen.",
    charts: [
      { kicker: "Current Inventory", title: "Homes for Sale", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUNU-VMU?w=438&h=329", note: "A quick visual snapshot of active Bonita Bay inventory." },
      { kicker: "Monthly Trend", title: "New Listings", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUNp-d7Z?w=438&h=329", note: "Track listing activity as new Bonita Bay properties come to market." },
      { kicker: "Monthly Trend", title: "Closed Sales", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUNk-Lb9?w=901&h=676", note: "See how closed transaction volume has moved over time." },
    ],
  },
  "esplanade-lake-club-area-info": {
    name: "Esplanade Lake Club",
    listingsSlug: "esplanade-homes-for-sale",
    seo: "Explore Esplanade Lake Club homes for sale, Esplanade Lake Club real estate, Esplanade Lake Club Fort Myers homes, Esplanade Lake Club waterfront homes, and Esplanade Lake Club boating lifestyle in Southwest Florida.",
    facts: ["Fort Myers, Florida", "Lake Como Setting", "350+ Acres of Freshwater", "Boats up to 23 Feet", "Boat Ramp & Kayak Launch", "Bahama Bar & Resort Pool", "Tennis, Pickleball & Bocce"],
    english: "Esplanade Lake Club is a resort-style waterfront community in Fort Myers, Florida, centered around Lake Como and designed for buyers who want a luxury, amenity-rich lifestyle. The community is known for its boating access, Bahama Bar, resort-style pool, sports courts, walking trails, and social lifestyle programming. Real estate options include villas and single-family homes with lake, preserve, and resort-inspired surroundings. Esplanade Lake Club is a popular destination for buyers looking for waterfront living, modern homes, and an active Southwest Florida lifestyle.",
    german: "Esplanade Lake Club ist eine Resort-Community am Wasser in Fort Myers, Florida, die sich rund um den Lake Como erstreckt und sich an Käufer richtet, die einen luxuriösen Lebensstil mit vielen Annehmlichkeiten suchen. Die Community ist bekannt für ihren Zugang zum Wasser, die Bahama Bar, den Resort-Pool, Sportplätze, Spazierwege und ein aktives soziales Lifestyle-Programm. Die Immobilienoptionen umfassen Villen und Einfamilienhäuser mit Blick auf den See, Naturflächen und ein modernes, resortähnliches Wohnumfeld. Esplanade Lake Club ist eine beliebte Wahl für Käufer, die modernes Wohnen am Wasser und einen aktiven Lebensstil im Südwesten Floridas suchen.",
    charts: [
      { kicker: "Monthly Trend", title: "New Listings", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUG2-a2f?w=438&h=329", note: "Track listing activity as new Esplanade Lake Club properties come to market." },
      { kicker: "Monthly Trend", title: "Closed Sales", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUGT-2Ml?w=438&h=329", note: "See how closed transaction volume has moved over time." },
      { kicker: "Current Inventory", title: "Homes for Sale", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUGZ-x5W?w=901&h=676", note: "A quick visual snapshot of active Esplanade Lake Club inventory." },
    ],
  },
  "bonita-national-golf-country-club-area-info": {
    name: "Bonita National",
    listingsSlug: "bonita-national-homes-for-sale",
    seo: "Explore Bonita National homes for sale, Bonita National condos for sale, Bonita National golf homes, Bonita National real estate, and Bonita National bundled golf living in Bonita Springs, Florida.",
    facts: ["Bonita Springs, Florida", "Gated Golf Community", "Championship Golf Course", "Wildlife Preserve Setting", "Resort-Style Pool", "Fitness Center & Spa", "Close to Beaches, Shopping & Dining"],
    english: "Bonita National Golf and Country Club is a golf course and residential community located in Bonita Springs, Florida. This beautiful gated community is designed around a wildlife preserve and offers a variety of amenities, including a championship golf course, a clubhouse, a resort-style pool, fitness center, tennis courts, and a full-service spa. Bonita National is known for its stunning homes, beautiful landscapes, and its convenient location near the beaches of Southwest Florida, shopping, and dining options.",
    german: "Bonita National Golf and Country Club in Bonita Springs, Florida, eine wunderschöne Wohnanlage, ist um ein Naturschutzgebiet herum angelegt und bietet eine Vielzahl von Annehmlichkeiten, darunter einen Championship-Golfplatz, ein Clubhaus, einen Pool im Resort-Stil, ein Fitnesscenter, Tennisplätze und ein Spa mit umfassendem Service. Bonita National ist bekannt für seine atemberaubenden Häuser, wunderschönen Landschaften und seine günstige Lage in der Nähe der Strände von Südwestflorida, Einkaufsmöglichkeiten und Restaurants.",
    charts: [
      { kicker: "Monthly Trend", title: "New Listings", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUGs-wDr?w=438&h=329", note: "Track listing activity as new Bonita National properties come to market." },
      { kicker: "Monthly Trend", title: "Closed Sales", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUGa-Sat?w=438&h=329", note: "See how closed transaction volume has moved over time." },
      { kicker: "Current Inventory", title: "Homes for Sale", src: "https://bonitaestero.stats.showingtime.com/infoserv/s-v1/cUGL-u7x?w=901&h=676", note: "A quick visual snapshot of active Bonita National inventory." },
    ],
  },
};

const blogPosts: Record<string, { title: string; date: string; body: string[] }> = {
  "my-post-2": { title: "My Post", date: "September 12, 2023", body: ["News and updates from Focus Group by Local Real Estate.", "Contact Ursula and her team for current Southwest Florida market guidance and local property opportunities."] },
  "21530-strada-nuova-cir-215-estero-fl-33928-700000": { title: "21530 Strada Nuova Cir #215, Estero, FL 33928 — $700,000", date: "September 22, 2026", body: ["Discover sophisticated condominium living in the heart of Estero. This residence pairs generous interior space with convenient access to shopping, dining, entertainment and Southwest Florida’s beaches.", "For availability, showing information and the latest property details, contact Ursula Weinkauff and the Focus Group team."] },
  "open-house-recommendation-for-buyers": { title: "Open House Recommendations for Buyers", date: "March 30, 2023", body: ["Open houses offer a useful first look, but a smart buyer arrives prepared. Take notes, look beyond finishes, ask about the age of major systems and pay attention to the surrounding neighborhood.", "When a property stands out, work with your buyer’s agent to review disclosures, comparable sales and the offer strategy before making a decision."] },
  "real-estate-investing": { title: "Real Estate Investing", date: "March 29, 2023", body: ["Real estate can play an important role in a long-term investment strategy. The right property depends on your goals, time horizon, financing, anticipated maintenance and realistic rental assumptions.", "Our team helps investors compare locations, evaluate expenses and understand the Southwest Florida market before moving forward."] },
  "my-post-1": { title: "Hidden Homeowner Costs", date: "June 20, 2017", body: ["A purchase price is only one part of homeownership. Buyers should also plan for insurance, property taxes, association fees, maintenance, utilities and future repairs.", "A detailed budget makes it easier to compare properties and choose a home that supports your broader financial plans."] },
  "my-post": { title: "Florida State Business Tax", date: "October 2, 2016", body: ["Real estate rules and tax considerations can change. Consult qualified legal and tax professionals for advice specific to your situation.", "Our team can help connect you with experienced local professionals when a transaction requires specialized guidance."] },
};

function humanize(slug: string) {
  return slug.split("-").map((word) => word === "fl" ? "FL" : word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

function listingPage(slug: string) {
  return slug.includes("homes-for-sale") || slug.endsWith("-homes") || slug.includes("listings") || ["quick-search", "advanced-search", "map-search", "foreclosure-search", "commercial-search", "open-houses-page", "sold-listings", "active-listings"].includes(slug);
}

function listingDefaults(slug: string) {
  const location = locations.find((item) => slug.includes(item.slug))?.name || (slug.includes("sanibel") ? "Sanibel Island" : slug.includes("captiva") ? "Captiva Island" : slug.includes("pelican-landing") ? "Pelican Landing" : slug.includes("the-colony") ? "The Colony" : slug.includes("bonita-bay") ? "Bonita Bay" : slug.includes("wildblue") ? "WildBlue" : slug.includes("rivercreek") ? "RiverCreek" : slug.includes("shadow-wood") ? "Shadow Wood" : slug.includes("miromar-lakes") ? "Miromar Lakes" : slug.includes("esplanade") ? "Esplanade" : slug.includes("bonita-national") ? "Bonita National" : slug.includes("valencia-bonita") ? "Valencia Bonita" : "");
  let minPrice = "";
  let maxPrice = "";
  if (slug.includes("under-350000")) maxPrice = "350000";
  else if (slug.includes("350000-to-500000")) { minPrice = "350000"; maxPrice = "500000"; }
  else if (slug.includes("500000-to-750000")) { minPrice = "500000"; maxPrice = "750000"; }
  else if (slug.includes("750000-to-1000000")) { minPrice = "750000"; maxPrice = "1000000"; }
  else if (slug.includes("1000000-to-1500000")) { minPrice = "1000000"; maxPrice = "1500000"; }
  else if (slug.includes("1500000-to-2500000")) { minPrice = "1500000"; maxPrice = "2500000"; }
  else if (slug.startsWith("luxury")) minPrice = "1000000";
  const status = slug.includes("sold") ? "Sold" : slug.includes("open-house") ? "Open House" : slug.includes("foreclosure") ? "Foreclosure" : slug.includes("active") ? "Active" : "";
  const propertyType = slug.includes("commercial") ? "Commercial" : "";
  const title = slug === "quick-search" ? "Quick Search" : slug === "advanced-search" ? "Advanced Search" : slug === "map-search" ? "Map Search" : humanize(slug).replace("Fl", "FL");
  return { location, minPrice, maxPrice, status, propertyType, title };
}

export function generateStaticParams() {
  return legacySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const title = blogPosts[slug]?.title || areaGuides[slug]?.name || humanize(slug);
  return { title: `${title} | Ursula Weinkauff | Focus Group by Local Real Estate`, description: `${title} — Southwest Florida real estate information and property search from Ursula Weinkauff and Focus Group by Local Real Estate.` };
}

function TeamPage() {
  const team = [
    { name: "Kristin Boyle", role: "Realtor® | GRI", phone: "5053162306", image: "/assets/kristin.jpeg" },
    { name: "Gunnar Ketzler", role: "Sales Professional | Realtor®", phone: "2392689906", image: "/assets/gunnar.jpg" },
    { name: "Pat Dimitroff", role: "Realtor®", phone: "", image: "/assets/pat.jpg" },
  ];
  return <PageShell title="Meet The Team"><div className="team-grid">{team.map((member) => <article className="team-card" key={member.name}><img src={sitePath(member.image)} alt={`${member.name} headshot`} /><div className="eyebrow">Team Member</div><h2>{member.name}</h2><p>{member.role}</p><div className="team-actions">{member.phone && <a href={`tel:${member.phone}`}>Call</a>}<a href={sitePath("/contact-us")}>Email</a></div></article>)}</div></PageShell>;
}

function AboutPage() {
  return <PageShell title="About Ursula Weinkauff"><p>Ursula has been in the Real Estate services business in the Bonita Springs, Estero, Naples, Ft Myers, Ft Myers Beach, Sanibel, Captiva and Cape Coral markets for many successful years and will be here for many more. This longevity and confidence comes from her expertise, excellent service and the repeat and referral business of her Buyers and Sellers.</p><p>As a full-time Southwest Florida Realtor®, Ursula and her team work with Buyers, Sellers and Investors across all price ranges and property types.</p><div className="service-list"><article><h2>Residential Single Family</h2><p>Our residential services connect buyers with sellers every day with professionalism and total dedication to our clients.</p></article><article><h2>Condominiums</h2><p>Our team understands the financing, association and ownership considerations that make the condominium market unique.</p></article><article><h2>Multi-family</h2><p>We help investors evaluate rental properties with careful return, valuation and market analysis.</p></article><article><h2>Commercial</h2><p>We collaborate with commercial property specialists for office, retail, restaurant and investment property needs.</p></article><article><h2>Vacant Land</h2><p>Land requires a clear understanding of use, location and potential. We help buyers and sellers see the full opportunity.</p></article></div><p>Call <a href="tel:2392972777">239-297-2777</a> or <a href={sitePath("/contact-us")}>contact us</a> to begin a conversation about your needs.</p></PageShell>;
}

function TestimonialsPage() {
  return <PageShell title="Testimonials"><div className="testimonials-page">{testimonials.map((item) => <blockquote key={item.name}><p>“{item.quote}”</p><cite>{item.name}</cite></blockquote>)}</div></PageShell>;
}

function AreaGuide({ guide }: { guide: AreaGuideData }) {
  return (
    <div className="site-page">
      <SiteHeader />
      <div className="site-width page-grid area-info-layout">
        <ProfileAside />
        <main id="main-content" className="page-main area-info-main">
          <section className="area-info" aria-label={`${guide.name} overview and market statistics`}>
            <header className="area-info-heading">
              <span className="area-info-eyebrow">Area Guide</span>
              <h1 className="area-info-title">{guide.name} <em>Overview</em></h1>
              <p className="area-info-seo">{guide.seo}</p>
              <div className="area-info-facts">
                {guide.facts.map((fact) => <span key={fact}>{fact}</span>)}
              </div>
            </header>

            <div className="area-info-stack">
              <article className="area-info-panel-wrap">
                <div className="area-info-panel">
                  <div className="area-info-panel-label"><span aria-hidden="true">🇺🇸 🇬🇧</span> English</div>
                  <p>{guide.english}</p>
                </div>
              </article>

              <article className="area-info-panel-wrap">
                <div className="area-info-panel area-info-panel-german">
                  <div className="area-info-panel-label"><span aria-hidden="true">🇩🇪</span> German</div>
                  <p lang="de">{guide.german}</p>
                </div>
              </article>

              <div className="area-info-subheading">
                <span>Market Snapshot</span>
                <h2>{guide.name} <em>Stats</em></h2>
              </div>

              <div className="area-info-stats">
                {guide.charts.map((chart, index) => (
                  <article className={`area-stat${index === 2 ? " area-stat-wide" : ""}`} key={chart.src}>
                    <div className="area-stat-card">
                      <header className="area-stat-head">
                        <span>{chart.kicker}</span>
                        <h3>{chart.title}</h3>
                      </header>
                      <AreaChart src={chart.src} title={`${guide.name} ${chart.title}`} />
                      <p className="area-stat-note">{chart.note}</p>
                    </div>
                  </article>
                ))}
              </div>

            </div>
          </section>
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

function BuyerSellerInfo() {
  return <PageShell title="Buyer / Seller Info"><p className="lead">Practical guidance for a confident Southwest Florida real estate move.</p><div className="resource-grid"><article><span>01</span><h2>For Buyers</h2><p>Define your goals, arrange financing, explore the market and build a clear offer strategy with a local advocate.</p><a href={sitePath("/dream-home-finder")}>Start your home search →</a></article><article><span>02</span><h2>For Sellers</h2><p>Understand the market, prepare the property, set an informed price and launch a thoughtful marketing plan.</p><a href={sitePath("/free-market-analysis")}>Request a market analysis →</a></article><article><span>03</span><h2>For Investors</h2><p>Compare returns, expenses, financing and local demand before selecting the right property and ownership plan.</p><a href={sitePath("/contact-us")}>Discuss your investment goals →</a></article></div></PageShell>;
}

function BlogIndex() {
  return <PageShell title="Blog" fullWidth><div className="blog-grid">{Object.entries(blogPosts).map(([slug, post]) => <article className="blog-card" key={slug}><div className="blog-image" /><small>{post.date}</small><h2>{post.title}</h2><p>{post.body[0]}</p><a href={sitePath(`/${slug}`)}>Read more →</a></article>)}</div></PageShell>;
}

function BlogArticle({ post }: { post: (typeof blogPosts)[string] }) {
  return <PageShell title={post.title} eyebrow={post.date}><div className="article-hero" />{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<hr /><h2>Ready to talk?</h2><p>Contact Focus Group by Local Real Estate for current information and guidance tailored to your goals.</p><a className="button dark" href={sitePath("/contact-us")}>Contact Ursula</a></PageShell>;
}

export default async function RoutePage({ params }: RouteProps) {
  const { slug } = await params;
  if (listingPage(slug)) {
    const defaults = listingDefaults(slug);
    return <div className="site-page"><SiteHeader /><main className="site-width search-page"><IdxSearch title={defaults.title} defaultLocation={defaults.location} defaultMinPrice={defaults.minPrice} defaultMaxPrice={defaults.maxPrice} defaultStatus={defaults.status} defaultPropertyType={defaults.propertyType} /></main><SiteFooter /></div>;
  }
  if (slug === "about-us") return <AboutPage />;
  if (slug === "meet-the-team" || slug === "meet-our-team") return <TeamPage />;
  if (slug === "testimonials-page") return <TestimonialsPage />;
  if (areaGuides[slug]) return <AreaGuide guide={areaGuides[slug]} />;
  if (slug === "contact-us") return <PageShell title="Contact Me"><p className="lead">Tell us how we can help. Ursula and the team will follow up personally.</p><div className="contact-details"><a href="tel:2392972777">☎ 239-297-2777</a><a href="mailto:Ursula@Focus-RealEstate.com">✉ Ursula@Focus-RealEstate.com</a></div><ContactForm /></PageShell>;
  if (slug === "dream-home-finder") return <PageShell title="Dream Home Finder"><p className="lead">Tell us what you are looking for and we will help you find the right Southwest Florida property.</p><ContactForm kind="dream" /></PageShell>;
  if (slug === "free-market-analysis") return <PageShell title="FREE Market Analysis"><p className="lead">Want to know what your home is worth? Share a few details and we will prepare a local market analysis.</p><ContactForm kind="valuation" /></PageShell>;
  if (slug === "buyerseller-info") return <BuyerSellerInfo />;
  if (slug === "mortgage-rates") return <PageShell title="Mortgage Rates"><p className="lead">Mortgage rates vary by loan program, credit profile, down payment and market conditions.</p><div className="callout"><h2>Get a personalized quote</h2><p>For current rate and financing options, speak with a qualified mortgage professional. We can introduce trusted local lenders familiar with Southwest Florida transactions.</p><a className="button dark" href={sitePath("/contact-us")}>Ask for a lender introduction</a></div></PageShell>;
  if (slug === "welcome-to-southwest-florida") return <PageShell title="Welcome to Southwest Florida"><p className="lead">Sun, water, recreation and welcoming communities make Southwest Florida an exceptional place to call home.</p><div className="resource-grid"><article><h2>Coastal Living</h2><p>Explore Gulf beaches, boating, waterfront neighborhoods and island communities.</p></article><article><h2>Golf & Recreation</h2><p>Choose from private clubs, public courses, nature preserves and miles of trails.</p></article><article><h2>Connected Communities</h2><p>Enjoy dining, arts, shopping and easy access to Southwest Florida International Airport.</p></article></div></PageShell>;
  if (slug === "real-estate-news") return <PageShell title="Real Estate News"><p className="lead">Market perspectives and local updates from Focus Group by Local Real Estate.</p><div className="blog-grid">{Object.entries(blogPosts).slice(0, 3).map(([postSlug, post]) => <article className="blog-card" key={postSlug}><small>{post.date}</small><h2>{post.title}</h2><p>{post.body[0]}</p><a href={sitePath(`/${postSlug}`)}>Read more →</a></article>)}</div></PageShell>;
  if (slug === "my-blog") return <BlogIndex />;
  if (blogPosts[slug]) return <BlogArticle post={blogPosts[slug]} />;
  return <PageShell title={humanize(slug)}><p className="lead">This page has moved into the new Focus Group website experience while keeping its original address.</p><p>Use the navigation above to explore Southwest Florida listings, communities and resources, or contact the team for direct assistance.</p><a className="button dark" href={sitePath("/contact-us")}>Contact Us</a></PageShell>;
}
