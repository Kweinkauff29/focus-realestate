import type { ReactNode } from "react";
import { demoListings, locations, navGroups, socialLinks, type Listing } from "./site-data";
import { sitePath } from "./site-path";

export function TopBar() {
  return (
    <div className="top-bar">
      <div className="site-width top-bar-inner">
        <div className="top-contact">
          <a href="tel:+12392972777">☎ <span>239-297-2777</span></a>
          <a href={sitePath("/contact-us")}>✉ <span>Email Us</span></a>
        </div>
        <div className="social-row" aria-label="Social links">
          {socialLinks.map((item) => (
            <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noreferrer">{item.short}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <>
      <TopBar />
      <header className={overlay ? "site-header overlay" : "site-header"}>
        <div className="site-width header-inner">
          <a className="brand" href={sitePath("/")} aria-label="Focus Group Local home">
            <img src={sitePath("/assets/focus-logo.png")} alt="Focus Group Local" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navGroups.map((group) => group.items ? (
              <details className="nav-group" key={group.label}>
                <summary>{group.label}</summary>
                <div className="nav-menu">
                  {group.items.map((item) => <a key={item.href + item.label} href={sitePath(item.href)}>{item.label}</a>)}
                </div>
              </details>
            ) : <a key={group.label} className="nav-direct" href={sitePath(group.href || "/")}>{group.label}</a>)}
          </nav>
          <div className="account-actions">
            <a className="button dark small" href={sitePath("/account")}>Log In</a>
            <a className="button gray small" href={sitePath("/account?mode=signup")}>Sign Up</a>
          </div>
          <details className="mobile-nav">
            <summary aria-label="Open navigation">Menu</summary>
            <div className="mobile-menu">
              {navGroups.map((group) => (
                <div key={group.label}>
                  {group.href ? <a href={sitePath(group.href)}>{group.label}</a> : <strong>{group.label}</strong>}
                  {group.items?.map((item) => <a key={item.href + item.label} href={sitePath(item.href)}>{item.label}</a>)}
                </div>
              ))}
            </div>
          </details>
        </div>
      </header>
    </>
  );
}

export function HomeSearch({ compact = false, initialLocation = "" }: { compact?: boolean; initialLocation?: string }) {
  return (
    <form className={compact ? "home-search compact" : "home-search"} action={sitePath("/quick-search")} method="get">
      {!compact && <h1>Find Your Southwest Florida Dream Home</h1>}
      <label className="sr-only" htmlFor={compact ? "hero-location-compact" : "hero-location"}>Location</label>
      <input id={compact ? "hero-location-compact" : "hero-location"} name="location" defaultValue={initialLocation} placeholder="Type a city, subdivision, zip, address, or listing #" />
      <div className="search-row">
        <select name="price" aria-label="Price">
          <option value="">Price</option>
          <option value="0-350000">Under $350,000</option>
          <option value="350000-500000">$350,000 – $500,000</option>
          <option value="500000-750000">$500,000 – $750,000</option>
          <option value="750000-1000000">$750,000 – $1,000,000</option>
          <option value="1000000+">$1,000,000+</option>
        </select>
        <select name="beds" aria-label="Bedrooms">
          <option value="">Beds</option>
          <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
        </select>
        <select name="baths" aria-label="Bathrooms">
          <option value="">Baths</option>
          <option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option>
        </select>
        <button type="submit">Search</button>
      </div>
    </form>
  );
}

export function ProfileAside() {
  return (
    <aside className="profile-card">
      <div className="portrait-frame"><img src={sitePath("/assets/ursula.jpg")} alt="Ursula Weinkauff" /></div>
      <div className="eyebrow">Meet</div>
      <h2>Ursula<br />Weinkauff</h2>
      <p className="profile-kicker">and her Southwest FL<br />Real Estate Team</p>
      <p>Your bi-lingual Neighborhood Expert! I listen carefully to understand your real estate goals and work hard to create solutions that make sense for you.</p>
      <div className="flag-row" aria-label="Languages">🇺🇸 🇩🇪 🇬🇧 🇨🇦</div>
      <a className="profile-phone" href="tel:2392972777">239-297-2777</a>
      <a className="button coral" href={sitePath("/contact-us")}>Contact Us</a>
      <div className="profile-links">
        <a href={sitePath("/quick-search")}>Quick Search</a>
        <a href={sitePath("/dream-home-finder")}>Dream Home Finder</a>
        <a href={sitePath("/free-market-analysis")}>FREE Market Analysis</a>
        <a href={sitePath("/testimonials-page")}>Testimonials</a>
      </div>
    </aside>
  );
}

export function PageShell({ title, children, fullWidth = false, eyebrow }: { title: string; children: ReactNode; fullWidth?: boolean; eyebrow?: string }) {
  return (
    <div className="site-page">
      <SiteHeader />
      <div className={fullWidth ? "site-width page-grid full" : "site-width page-grid"}>
        {!fullWidth && <ProfileAside />}
        <main id="main-content" className="page-main">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1>{title}</h1>
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a className="listing-card" href={sitePath(`/idx/listing/featured/${listing.id}/${encodeURIComponent(`${listing.address}-${listing.city}`.replaceAll(" ", "-"))}`)}>
      <div className="listing-image">
        <img src={sitePath(listing.image)} alt={`${listing.address}, ${listing.city}`} />
        {listing.status && <span className="listing-status">{listing.status}</span>}
      </div>
      <div className="listing-body">
        <strong>{listing.price}</strong>
        <div className="listing-facts">
          {listing.beds && <span>{listing.beds} bd</span>}
          {listing.baths && <span>{listing.baths} ba</span>}
          {listing.sqft && <span>{listing.sqft} {listing.sqft.includes("acres") ? "" : "sqft"}</span>}
        </div>
        <p>{listing.address}<br /><span>{listing.city}</span></p>
      </div>
    </a>
  );
}

export function ListingGrid({ listings = demoListings, limit }: { listings?: Listing[]; limit?: number }) {
  const visible = typeof limit === "number" ? listings.slice(0, limit) : listings;
  return <div className="listing-grid">{visible.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>;
}

export function ContactForm({ kind = "contact" }: { kind?: "contact" | "dream" | "valuation" }) {
  const isDream = kind === "dream";
  const isValuation = kind === "valuation";
  return (
    <form className="lead-form" method="post" action="mailto:Ursula@Focus-RealEstate.com" encType="text/plain">
      <input type="hidden" name="kind" value={kind} />
      <div className="form-grid">
        <label>First Name<input name="firstName" required /></label>
        <label>Last Name<input name="lastName" required /></label>
        <label>Email Address<input name="email" type="email" required /></label>
        <label>Phone Number<input name="phone" type="tel" /></label>
        {(isDream || isValuation) && <label className="wide">Property or preferred location<input name="location" placeholder={isValuation ? "Property address" : "City, community, ZIP or address"} required /></label>}
        {isDream && <>
          <label>Price range<select name="price"><option>Any</option><option>Under $500,000</option><option>$500,000 – $1,000,000</option><option>$1,000,000+</option></select></label>
          <label>Property type<select name="type"><option>Single Family Home</option><option>Condominium</option><option>Townhouse</option><option>Lots & Land</option><option>Other</option></select></label>
          <label>Bedrooms<select name="beds"><option>Any</option><option>2+</option><option>3+</option><option>4+</option></select></label>
          <label>Bathrooms<select name="baths"><option>Any</option><option>2+</option><option>3+</option><option>4+</option></select></label>
        </>}
        <label className="wide">{isValuation ? "Tell us about your property" : isDream ? "Additional preferences" : "How can we help?"}<textarea name="message" rows={6} required={!isDream} /></label>
      </div>
      <label className="consent"><input type="checkbox" name="consent" required /> I agree to be contacted about this request.</label>
      <button className="button dark" type="submit">Send</button>
    </form>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-overlay">
        <div className="site-width footer-grid">
          <div className="footer-brand">
            <img src={sitePath("/assets/focus-logo.png")} alt="Focus Group Local" />
            <p><strong><em>Ursula Weinkauff PA</em></strong> | Focus Group by Local Real Estate</p>
            <p>Broker Associate | Realtor®, CIPS | e-Pro | RSPS | AHWD | ABR® | Certified Luxury Home Marketing Specialist™ | GUILD™ | Global Real Estate Expert - GREP | POWER AGENT®</p>
            <p>Notary Public</p>
            <p><a href="mailto:Ursula@Focus-RealEstate.com">Ursula@Focus-RealEstate.com</a><br /><a href="tel:2392972777">Cell: 239.297.2777</a></p>
          </div>
          <div>
            <h2>Explore</h2>
            {locations.map((location) => <a className="footer-link" key={location.slug} href={sitePath(`/homes-for-sale-in-${location.slug}-fl`)}>{location.name}</a>)}
          </div>
          <div>
            <h2>Connect</h2>
            <div className="social-row footer-social">{socialLinks.map((item) => <a key={item.label} href={item.href} aria-label={item.label}>{item.short}</a>)}</div>
            <p className="review-copy">If you have a moment, we would appreciate a review on Google.</p>
            <a className="button outline" href="https://g.page/r/Ca9XCCbfXiBaEBM/review">Leave a Review</a>
          </div>
        </div>
        <div className="site-width footer-legal">
          <div className="designation-row">
            <img src={sitePath("/assets/equal-housing.png")} alt="Equal Housing Opportunity" />
            <img src={sitePath("/assets/realtor.png")} alt="Realtor" />
            <img src={sitePath("/assets/mls.png")} alt="MLS" />
          </div>
          <p>© {new Date().getFullYear()} Focus Group by Local Real Estate. Information deemed reliable but not guaranteed. Equal Housing Opportunity.</p>
        </div>
      </div>
    </footer>
  );
}
