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
  featured?: boolean;
  pinAgents?: string;
};

const IDX_SCRIPT = "https://sneak-idx-worker.bonitaspringsrealtors.workers.dev/embed.js";
const IDX_HOST = "ursulaweinkauff.com";
const TEAM_AGENT_IDS = "633942,B3233500,B3512909";

export function IdxSearch({
  title,
  showHeading = true,
  featured = false,
  pinAgents = TEAM_AGENT_IDS,
}: SearchProps) {
  const shellRef = useRef<HTMLDivElement>(null);
  const [embedState, setEmbedState] = useState<"checking" | "preview" | "error">("checking");
  const targetId = featured ? "sneak-idx-featured" : "sneak-idx-pinned";

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
    script.setAttribute("data-target", `#${targetId}`);
    if (featured) {
      script.setAttribute("data-featured", "true");
    } else {
      script.setAttribute("data-pin-agents", pinAgents);
    }
    script.addEventListener("error", () => setEmbedState("error"));
    shell.appendChild(script);

    return () => {
      script.remove();
      shell.querySelectorAll(".sneak-idx-widget-container, .sneak-idx-error").forEach((node) => node.remove());
    };
  }, [featured, pinAgents, targetId]);

  return (
    <section className={featured ? "idx-browser idx-browser-featured" : "idx-browser"} aria-labelledby={showHeading ? "idx-title" : undefined}>
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
            id={targetId}
            data-site="ursula-weinkauff"
            data-widget="search"
            data-featured={featured ? "true" : undefined}
            data-pin-agents={featured ? undefined : pinAgents}
            style={{ width: "100%", maxWidth: "100%" }}
          />
        )}
      </div>
    </section>
  );
}
