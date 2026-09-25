"use client";

import { useEffect, useRef, useState, type CSSProperties, type FocusEvent } from "react";
import { locations, priceBands } from "./site-data";
import { sitePath } from "./site-path";

export function CommunityExplorer() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const closeAfterFocusLeaves = (event: FocusEvent<HTMLElement>, slug: string) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenSlug((current) => (current === slug ? null : current));
    }
  };

  return (
    <div ref={gridRef} className={isVisible ? "community-grid is-visible" : "community-grid"}>
      {locations.map((location, index) => {
        const isOpen = openSlug === location.slug;
        const panelId = `community-prices-${location.slug}`;

        return (
          <article
            className={isOpen ? "community-card is-open" : "community-card"}
            key={location.slug}
            onBlurCapture={(event) => closeAfterFocusLeaves(event, location.slug)}
            style={{ "--community-delay": `${index * 90}ms` } as CSSProperties}
          >
            <a className="community-image" href={sitePath(`/homes-for-sale-in-${location.slug}-fl`)}>
              <img src={sitePath(location.image)} alt={`Homes for sale in ${location.name}, Florida`} />
              <span>Area Guide</span><h3>{location.name}</h3>
            </a>
            <button
              className="community-toggle"
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenSlug((current) => (current === location.slug ? null : location.slug))}
            >
              Browse by price <span aria-hidden="true">+</span>
            </button>
            <div id={panelId} className="price-links" aria-hidden={!isOpen}>
              {priceBands.map((band) => (
                <a
                  key={band.suffix}
                  tabIndex={isOpen ? undefined : -1}
                  href={sitePath(band.suffix === "luxury" ? `/luxury-homes-for-sale-in-${location.slug}-fl` : `/homes-for-sale-in-${location.slug}-fl-${band.suffix}`)}
                >
                  {band.label}<span aria-hidden="true">&nearr;</span>
                </a>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
