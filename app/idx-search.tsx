"use client";

import { useMemo, useState, type FormEvent } from "react";
import { demoListings, type Listing } from "./site-data";

type SearchProps = {
  title: string;
  defaultLocation?: string;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
  defaultStatus?: string;
  defaultPropertyType?: string;
};

export function IdxSearch({ title, defaultLocation = "", defaultMinPrice = "", defaultMaxPrice = "", defaultStatus = "", defaultPropertyType = "" }: SearchProps) {
  const [listings, setListings] = useState<Listing[]>(demoListings);
  const [loading, setLoading] = useState(false);
  const [notice, setNotice] = useState("Showing preview listings until the new IDX credentials are connected.");
  const [view, setView] = useState<"grid" | "map">("grid");

  const resultLabel = useMemo(() => `${listings.length} properties`, [listings.length]);

  async function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const query = new URLSearchParams();
    formData.forEach((value, key) => { if (String(value)) query.set(key, String(value)); });
    try {
      const response = await fetch(`/api/idx/search?${query.toString()}`);
      const data = await response.json() as { listings?: Listing[]; source?: string; message?: string };
      if (!response.ok) throw new Error(data.message || "Search is temporarily unavailable.");
      setListings(data.listings?.length ? data.listings : demoListings);
      setNotice(data.source === "idx" ? "Live results from the IDX feed." : "Preview results — connect the new IDX credentials to go live.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Search is temporarily unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="idx-browser" aria-labelledby="idx-title">
      <div className="idx-heading">
        <div><div className="eyebrow">Property Search</div><h1 id="idx-title">{title}</h1></div>
        <div className="view-toggle" aria-label="View options">
          <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")} type="button">Grid</button>
          <button className={view === "map" ? "active" : ""} onClick={() => setView("map")} type="button">Map</button>
        </div>
      </div>
      <form className="idx-filter" onSubmit={search}>
        <label className="wide">Location<input name="location" defaultValue={defaultLocation} placeholder="City, community, address or ZIP" /></label>
        <label>Property Type<select name="propertyType" defaultValue={defaultPropertyType}><option value="">Any</option><option>House</option><option>Condo/Townhome</option><option>Multi-family</option><option>Land</option><option>Commercial</option></select></label>
        <label>Min Price<input name="minPrice" inputMode="numeric" defaultValue={defaultMinPrice} placeholder="$0" /></label>
        <label>Max Price<input name="maxPrice" inputMode="numeric" defaultValue={defaultMaxPrice} placeholder="No max" /></label>
        <label>Beds<select name="beds"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option></select></label>
        <label>Baths<select name="baths"><option value="">Any</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option></select></label>
        <input type="hidden" name="status" value={defaultStatus} />
        <button className="button dark" type="submit" disabled={loading}>{loading ? "Searching…" : "Search"}</button>
      </form>
      <div className="idx-meta"><strong>{resultLabel}</strong><span>{notice}</span></div>
      {view === "map" ? (
        <div className="map-preview" role="img" aria-label="Map view placeholder for live IDX results">
          <div className="map-road one" /><div className="map-road two" /><div className="map-water" />
          {listings.slice(0, 6).map((listing, index) => <span className={`map-pin pin-${index + 1}`} key={listing.id}>{listing.price}</span>)}
        </div>
      ) : (
        <div className="listing-grid">
          {listings.map((listing) => (
            <a className="listing-card" key={listing.id} href={`/idx/listing/featured/${listing.id}/${encodeURIComponent(`${listing.address}-${listing.city}`.replaceAll(" ", "-"))}`}>
              <div className="listing-image"><img src={listing.image} alt={`${listing.address}, ${listing.city}`} />{listing.status && <span className="listing-status">{listing.status}</span>}</div>
              <div className="listing-body"><strong>{listing.price}</strong><div className="listing-facts">{listing.beds && <span>{listing.beds} bd</span>}{listing.baths && <span>{listing.baths} ba</span>}{listing.sqft && <span>{listing.sqft}</span>}</div><p>{listing.address}<br /><span>{listing.city}</span></p></div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}

