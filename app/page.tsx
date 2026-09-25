import type { Metadata } from "next";
import { HomeSearch, SiteFooter, SiteHeader, WeatherStrip } from "./components";
import { IdxSearch } from "./idx-search";
import { locations, priceBands, testimonials } from "./site-data";
import { sitePath } from "./site-path";

export const metadata: Metadata = {
  title: "Ursula Weinkauff | Focus Group by Local Real Estate | Bonita Springs, FL",
  description: "Search Southwest Florida homes with Ursula Weinkauff and Focus Group by Local Real Estate, serving Bonita Springs, Estero, Naples, Fort Myers and nearby communities.",
};

const actionCards = [
  { icon: "⌂", kicker: "Start Here", title: "Buy A Home", text: "Tell us your home search criteria and we’ll get to work immediately. Together, we’ll find your next dream home.", href: "/dream-home-finder" },
  { icon: "◇", kicker: "Start Here", title: "Sell Your Home", text: "Share a few details about your property and we’ll help you prepare for a confident sale.", href: "/free-market-analysis" },
  { icon: "$", kicker: "Start Here", title: "Market Analysis", text: "See what your home may be worth with comparable sales and neighborhood insight.", href: "/free-market-analysis" },
  { icon: "⌕", kicker: "Explore", title: "Property Search", text: "Browse homes, narrow your criteria and discover what is available across Southwest Florida.", href: "/quick-search" },
  { icon: "♡", kicker: "Account", title: "Save Favorites", text: "Save your preferred searches and listings so they are ready when you come back.", href: "/account" },
  { icon: "✎", kicker: "Connect", title: "Contact Us", text: "Have a question or want more information? Let’s talk about your real estate goals.", href: "/contact-us" },
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
          <article className="testimonial-stack">
            <div className="eyebrow">Client Stories</div>
            <h2>What Clients <em>Say</em></h2>
            {testimonials.slice(0, 3).map((item) => <blockquote key={item.name}><p>“{item.quote}”</p><cite>{item.name}</cite></blockquote>)}
            <a className="text-link" href={sitePath("/testimonials-page")}>View More Testimonials →</a>
          </article>
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

        <section className="action-section site-width">
          <div className="section-heading"><div><div className="eyebrow">How can we help?</div><h2>Your next move starts here</h2></div></div>
          <div className="action-grid">
            {actionCards.map((card) => <a className="action-card" key={card.title} href={sitePath(card.href)}><span className="action-icon">{card.icon}</span><small>{card.kicker}</small><h3>{card.title}</h3><p>{card.text}</p><b>Get started →</b></a>)}
          </div>
        </section>

        <section className="featured-section">
          <div className="site-width">
            <div className="section-heading"><div><div className="eyebrow">Fresh on the market</div><h2>Featured Listings</h2></div><a className="button outline dark-outline" href={sitePath("/office-listings")}>View More</a></div>
            <IdxSearch title="Featured Listings" showHeading={false} />
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
