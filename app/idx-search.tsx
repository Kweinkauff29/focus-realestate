"use client";

import { useEffect, useRef } from "react";

type SearchProps = {
  title: string;
  defaultLocation?: string;
  defaultMinPrice?: string;
  defaultMaxPrice?: string;
  defaultStatus?: string;
  defaultPropertyType?: string;
  showHeading?: boolean;
};

const IDX_SCRIPT = "https://sneak-idx-worker-staging.bonitaspringsrealtors.workers.dev/embed.js?v=2026.09.01.7.4b2";

export function IdxSearch({ title, showHeading = true }: SearchProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const script = document.createElement("script");
    script.src = IDX_SCRIPT;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-site", "ursula-weinkauff");
    script.setAttribute("data-widget", "search");
    script.setAttribute("data-target", "#sneak-idx-search");
    shell.appendChild(script);

    return () => script.remove();
  }, []);

  return (
    <section className="idx-browser" aria-labelledby={showHeading ? "idx-title" : undefined}>
      {showHeading && (
        <div className="idx-heading">
          <div>
            <div className="eyebrow">Property Search</div>
            <h1 id="idx-title">{title}</h1>
          </div>
        </div>
      )}
      <div className="idx-widget-shell" ref={shellRef}>
        <div
          id="sneak-idx-search"
          data-site="ursula-weinkauff"
          data-widget="search"
          style={{ width: "100%", maxWidth: "100%" }}
        />
      </div>
    </section>
  );
}
