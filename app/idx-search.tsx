"use client";

import { useEffect, useRef, useState } from "react";

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
const IDX_HOST = "ursulaweinkauff.com";

export function IdxSearch({ title, showHeading = true }: SearchProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [embedState, setEmbedState] = useState<"checking" | "preview" | "error">("checking");

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const hostname = window.location.hostname.toLowerCase();
    if (hostname !== IDX_HOST) {
      const previewTimer = window.setTimeout(() => setEmbedState("preview"), 0);
      return () => window.clearTimeout(previewTimer);
    }

    const script = document.createElement("script");
    script.src = IDX_SCRIPT;
    script.async = true;
    script.defer = true;
    script.setAttribute("data-site", "ursula-weinkauff");
    script.setAttribute("data-widget", "search");
    script.setAttribute("data-target", "#sneak-idx-search");
    script.addEventListener("error", () => setEmbedState("error"));
    shell.appendChild(script);

    return () => {
      script.remove();
      shell.querySelectorAll(".sneak-idx-widget-container, .sneak-idx-error").forEach((node) => node.remove());
    };
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
        {embedState === "preview" || embedState === "error" ? (
          <div className="idx-preview-note" role="status">
            <div>
              <strong>{embedState === "preview" ? "Live IDX is secured to the production domain" : "Property search is temporarily unavailable"}</strong>
              <p>
                {embedState === "preview"
                  ? "The MLS provider permits this embedded search on ursulaweinkauff.com. It will load automatically on the live website."
                  : "Please refresh the page or contact Ursula for current property information."}
              </p>
            </div>
          </div>
        ) : (
          <div
            id="sneak-idx-search"
            data-site="ursula-weinkauff"
            data-widget="search"
            style={{ width: "100%", maxWidth: "100%" }}
          />
        )}
      </div>
    </section>
  );
}
