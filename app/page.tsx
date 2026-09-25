import type { Metadata } from "next";
import { HomeSearch, SiteFooter, SiteHeader } from "./components";
import { TestimonialsCarousel, WeatherStrip } from "./home-widgets";
import { IdxSearch } from "./idx-search";
import { locations, priceBands } from "./site-data";
import { sitePath } from "./site-path";

export const metadata: Metadata = {
  title: "Ursula Weinkauff | Focus Group by Local Real Estate | Bonita Springs, FL",
  description: "Search Southwest Florida homes with Ursula Weinkauff and Focus Group by Local Real Estate, serving Bonita Springs, Estero, Naples, Fort Myers and nearby communities.",
};

const actionCards = [
  { icon: "🔓", title: <>Unlock Your<br />Search</>, text: "Unlock the search interface so you can browse homes without restrictions or interruptions.", href: "/account" },
  { icon: "♥", title: <>Save Your<br />Favorites</>, text: "Save your favorite searches and listings for later. They’ll be waiting for you when you come back.", href: "/account" },
  { icon: "🔔", title: <>Get Email<br />Notifications</>, text: "Get notified when new homes are listed that match your search criteria.", href: "/account" },
];

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-video" aria-hidden="true">
          <iframe src="https://www.youtube.com/embed/NlKOKuraqH4?rel=0&controls=0&showinfo=0&autoplay=1&loop=1&playlist=NlKOKuraqH4&mute=1&playsinline=1&fs=0" title="Southwest Florida aerial video" allow="autoplay; encrypted-media" />
        </div>
        <div className="hero-shade" />
        <div className="hero-header"><SiteHeader overlay /></div>
        <div className="hero-copy site-width">
          <div className="eyebrow light">Southwest Florida Real Estate</div>
          <h1>Local expertise.<br />Global reach.</h1>
          <p>Trusted guidance for buying and selling homes from Bonita Springs to Naples, Fort Myers and the islands.</p>
        </div>
      </section>

      <main id="main-content">
        <section className="search-weather site-width">
          <HomeSearch />
          <WeatherStrip />
        </section>

        <section className="intro-section site-width">
          <article className="intro-story">
            <div className="eyebrow">Meet</div>
            <h2>Ursula Weinkauff</h2>
            <div className="story-layout">
              <p>Ursula and her team of Global experts—including real estate professionals, attorneys, CPAs, title companies, lenders, mortgage brokers, home inspectors, contractors and others—have proudly served Southwest Florida since January 1996. The team specializes in Bonita Springs, Estero, Naples, Fort Myers, Fort Myers Beach, Sanibel, Captiva and Cape Coral.</p>
              <div className="portrait-frame home-portrait"><img src={sitePath("/assets/ursula.jpg")} alt="Portrait of Ursula Weinkauff" /></div>
            </div>
            <a className="text-link" href={sitePath("/about-us")}>Learn more about Ursula and her team →</a>
          </article>
          <TestimonialsCarousel />
        </section>

        <section className="community-section">
          <div className="site-width">
            <div className="section-heading"><div><div className="eyebrow">Explore the coast</div><h2>Discover <em>SWFL</em></h2></div><p>Choose an area, then narrow the search by price.</p></div>
            <div className="community-grid">
              {locations.map((location) => (
                <article className="community-card" key={location.slug}>
                  <a className="community-image" href={sitePath(`/homes-for-sale-in-${location.slug}-fl`)}>
                    <img src={sitePath(location.image)} alt={`Homes for sale in ${location.name}, Florida`} />
                    <span>Area Guide</span><h3>{location.name}</h3>
                  </a>
                  <div className="price-links">
                    {priceBands.map((band) => <a key={band.suffix} href={sitePath(band.suffix === "luxury" ? `/luxury-homes-for-sale-in-${location.slug}-fl` : `/homes-for-sale-in-${location.slug}-fl-${band.suffix}`)}>{band.label}<span>↗</span></a>)}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="action-section site-width" aria-label="Property search account benefits">
          <div className="action-grid">
            {actionCards.map((card, index) => <a className={`action-card action-card-${index + 1}`} key={index} href={sitePath(card.href)}><span className="action-icon" aria-hidden="true">{card.icon}</span><h3>{card.title}</h3><p>{card.text}</p></a>)}
          </div>
        </section>

        <section className="featured-section">
          <div className="site-width">
            <div className="section-heading"><div><div className="eyebrow">Fresh on the market</div><h2>Featured Listings</h2></div><a className="button outline dark-outline" href={sitePath("/office-listings")}>View More</a></div>
            <IdxSearch title="Featured Listings" showHeading={false} featured />
          </div>
        </section>

        <section className="consultation-cta">
          <div className="site-width"><div><div className="eyebrow light">Let’s talk</div><h2>Contact us for a free consultation.<br />No obligation. No catch.</h2></div><a className="button white" href={sitePath("/contact-us")}>Contact Us</a></div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
