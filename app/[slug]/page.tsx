import type { Metadata } from "next";
import { ContactForm, PageShell, SiteFooter, SiteHeader } from "../components";
import { IdxSearch } from "../idx-search";
import { legacySlugs, locations, testimonials } from "../site-data";

type RouteProps = { params: Promise<{ slug: string }> };

const areaGuides: Record<string, { name: string; location: string; details: string; facts: string[] }> = {
  "pelican-landing-area-info": {
    name: "Pelican Landing",
    location: "Bonita Springs, Florida",
    details: "Pelican Landing is a naturally beautiful community where residents enjoy a private island beach park, Coconut Point Marina on Estero Bay, a sailing center, canoe and kayak park, community and fitness centers, bocce, tennis and pickleball courts, fishing piers, a butterfly garden and protected nature preserves. Two country clubs offer three 18-hole golf courses. From golf cottages and custom estates to high-rise Gulf-view condominiums, the community offers a remarkable range of homes.",
    facts: ["2,300+ acre master-planned community", "34-acre private beach park", "12 Har-Tru tennis courts", "6 pickleball courts", "3 championship golf courses"],
  },
  "the-colony-area-info": {
    name: "The Colony",
    location: "Pelican Landing, Bonita Springs",
    details: "The Colony is an intimate gated enclave within Pelican Landing, known for Gulf and Estero Bay views, luxury high-rise residences, coach homes and villas. Residents enjoy access to The Bay Club, Pelican Landing amenities, a private beach park and optional membership at The Colony Golf & Country Club.",
    facts: ["Gated coastal community", "Bay Club dining", "Private beach access", "Golf and tennis", "High-rise and villa living"],
  },
  "bonita-bay-area-info": {
    name: "Bonita Bay",
    location: "Bonita Springs, Florida",
    details: "Bonita Bay is one of Southwest Florida’s landmark master-planned communities. More than half of its acreage is dedicated to open space, lakes, preserves and parks. The community pairs waterfront living with championship golf, a marina, miles of walking and biking paths, and a private beach park on the Gulf of Mexico.",
    facts: ["Five championship golf courses", "Full-service marina", "Private Gulf beach park", "12 miles of pathways", "Multiple waterfront neighborhoods"],
  },
  "esplanade-lake-club-area-info": {
    name: "Esplanade Lake Club",
    location: "Fort Myers, Florida",
    details: "Esplanade Lake Club offers resort-style living centered around a large recreational lake. Residents enjoy boating, kayaking, waterfront dining, a resort pool, fitness and wellness amenities, sports courts and an active social calendar in a convenient Fort Myers location.",
    facts: ["Lakefront lifestyle", "Boating and kayaking", "Resort pool", "Bahama Bar", "Fitness and sports courts"],
  },
  "bonita-national-golf-country-club-area-info": {
    name: "Bonita National Golf & Country Club",
    location: "Bonita Springs, Florida",
    details: "Bonita National is a gated golf community featuring a Gordon Lewis-designed championship course, a grand clubhouse, resort pool, fitness center, spa, tennis and dining. The neighborhood includes condominiums, coach homes and single-family residences with golf and preserve views.",
    facts: ["18-hole championship golf", "Resort-style pool", "Clubhouse dining", "Tennis and fitness", "Condos to single-family homes"],
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
  return <PageShell title="Meet The Team"><div className="team-grid">{team.map((member) => <article className="team-card" key={member.name}><img src={member.image} alt={`${member.name} headshot`} /><div className="eyebrow">Team Member</div><h2>{member.name}</h2><p>{member.role}</p><div className="team-actions">{member.phone && <a href={`tel:${member.phone}`}>Call</a>}<a href="/contact-us">Email</a></div></article>)}</div></PageShell>;
}

function AboutPage() {
  return <PageShell title="About Ursula Weinkauff"><p>Ursula has been in the Real Estate services business in the Bonita Springs, Estero, Naples, Ft Myers, Ft Myers Beach, Sanibel, Captiva and Cape Coral markets for many successful years and will be here for many more. This longevity and confidence comes from her expertise, excellent service and the repeat and referral business of her Buyers and Sellers.</p><p>As a full-time Southwest Florida Realtor®, Ursula and her team work with Buyers, Sellers and Investors across all price ranges and property types.</p><div className="service-list"><article><h2>Residential Single Family</h2><p>Our residential services connect buyers with sellers every day with professionalism and total dedication to our clients.</p></article><article><h2>Condominiums</h2><p>Our team understands the financing, association and ownership considerations that make the condominium market unique.</p></article><article><h2>Multi-family</h2><p>We help investors evaluate rental properties with careful return, valuation and market analysis.</p></article><article><h2>Commercial</h2><p>We collaborate with commercial property specialists for office, retail, restaurant and investment property needs.</p></article><article><h2>Vacant Land</h2><p>Land requires a clear understanding of use, location and potential. We help buyers and sellers see the full opportunity.</p></article></div><p>Call <a href="tel:2392972777">239-297-2777</a> or <a href="/contact-us">contact us</a> to begin a conversation about your needs.</p></PageShell>;
}

function TestimonialsPage() {
  return <PageShell title="Testimonials"><div className="testimonials-page">{testimonials.map((item) => <blockquote key={item.name}><p>“{item.quote}”</p><cite>{item.name}</cite></blockquote>)}</div></PageShell>;
}

function AreaGuide({ guide }: { guide: (typeof areaGuides)[string] }) {
  return <PageShell title={`${guide.name} Overview`} eyebrow="Area Guide"><p className="lead">Explore {guide.name} homes for sale, real estate and community information in {guide.location}.</p><div className="fact-grid">{guide.facts.map((fact) => <span key={fact}>{fact}</span>)}</div><h2>Life in {guide.name}</h2><p>{guide.details}</p><div className="language-note"><strong>🇩🇪 Deutschsprachige Immobilienberatung</strong><p>Ursula unterstützt deutschsprachige Käufer und Verkäufer persönlich bei jedem Schritt ihrer Immobilientransaktion in Südwest-Florida.</p></div><section className="market-snapshot"><div className="eyebrow">Market Snapshot</div><h2>{guide.name} Stats</h2><div className="stat-grid"><article><small>Monthly Trend</small><strong>New Listings</strong><div className="spark bars"><i /><i /><i /><i /><i /><i /></div></article><article><small>Monthly Trend</small><strong>Closed Sales</strong><div className="spark line"><i /></div></article><article><small>Current Inventory</small><strong>Homes for Sale</strong><div className="spark number">Live IDX</div></article></div></section><a className="button dark" href={`/${guide.name.toLowerCase().replaceAll(" & ", "-").replaceAll(" ", "-")}-homes-for-sale`}>View Homes for Sale</a></PageShell>;
}

function BuyerSellerInfo() {
  return <PageShell title="Buyer / Seller Info"><p className="lead">Practical guidance for a confident Southwest Florida real estate move.</p><div className="resource-grid"><article><span>01</span><h2>For Buyers</h2><p>Define your goals, arrange financing, explore the market and build a clear offer strategy with a local advocate.</p><a href="/dream-home-finder">Start your home search →</a></article><article><span>02</span><h2>For Sellers</h2><p>Understand the market, prepare the property, set an informed price and launch a thoughtful marketing plan.</p><a href="/free-market-analysis">Request a market analysis →</a></article><article><span>03</span><h2>For Investors</h2><p>Compare returns, expenses, financing and local demand before selecting the right property and ownership plan.</p><a href="/contact-us">Discuss your investment goals →</a></article></div></PageShell>;
}

function BlogIndex() {
  return <PageShell title="Blog" fullWidth><div className="blog-grid">{Object.entries(blogPosts).map(([slug, post]) => <article className="blog-card" key={slug}><div className="blog-image" /><small>{post.date}</small><h2>{post.title}</h2><p>{post.body[0]}</p><a href={`/${slug}`}>Read more →</a></article>)}</div></PageShell>;
}

function BlogArticle({ post }: { post: (typeof blogPosts)[string] }) {
  return <PageShell title={post.title} eyebrow={post.date}><div className="article-hero" />{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<hr /><h2>Ready to talk?</h2><p>Contact Focus Group by Local Real Estate for current information and guidance tailored to your goals.</p><a className="button dark" href="/contact-us">Contact Ursula</a></PageShell>;
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
  if (slug === "mortgage-rates") return <PageShell title="Mortgage Rates"><p className="lead">Mortgage rates vary by loan program, credit profile, down payment and market conditions.</p><div className="callout"><h2>Get a personalized quote</h2><p>For current rate and financing options, speak with a qualified mortgage professional. We can introduce trusted local lenders familiar with Southwest Florida transactions.</p><a className="button dark" href="/contact-us">Ask for a lender introduction</a></div></PageShell>;
  if (slug === "welcome-to-southwest-florida") return <PageShell title="Welcome to Southwest Florida"><p className="lead">Sun, water, recreation and welcoming communities make Southwest Florida an exceptional place to call home.</p><div className="resource-grid"><article><h2>Coastal Living</h2><p>Explore Gulf beaches, boating, waterfront neighborhoods and island communities.</p></article><article><h2>Golf & Recreation</h2><p>Choose from private clubs, public courses, nature preserves and miles of trails.</p></article><article><h2>Connected Communities</h2><p>Enjoy dining, arts, shopping and easy access to Southwest Florida International Airport.</p></article></div></PageShell>;
  if (slug === "real-estate-news") return <PageShell title="Real Estate News"><p className="lead">Market perspectives and local updates from Focus Group by Local Real Estate.</p><div className="blog-grid">{Object.entries(blogPosts).slice(0, 3).map(([postSlug, post]) => <article className="blog-card" key={postSlug}><small>{post.date}</small><h2>{post.title}</h2><p>{post.body[0]}</p><a href={`/${postSlug}`}>Read more →</a></article>)}</div></PageShell>;
  if (slug === "my-blog") return <BlogIndex />;
  if (blogPosts[slug]) return <BlogArticle post={blogPosts[slug]} />;
  return <PageShell title={humanize(slug)}><p className="lead">This page has moved into the new Focus Group website experience while keeping its original address.</p><p>Use the navigation above to explore Southwest Florida listings, communities and resources, or contact the team for direct assistance.</p><a className="button dark" href="/contact-us">Contact Us</a></PageShell>;
}

