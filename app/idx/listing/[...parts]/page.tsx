import { SiteFooter, SiteHeader } from "../../../components";
import { IdxSearch } from "../../../idx-search";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { parts: ["featured", "303628758", "347-Piper-Ave-Lehigh-Acres-FL-33974"] },
    { parts: ["featured", "303689069", "8751-Lateen-Ln-Fort-Myers-FL-33919"] },
    { parts: ["featured", "303625306", "4442-Wilder-Rd-Naples-FL-34105"] },
  ];
}

export default function LegacyListingDetail() {
  return (
    <div className="site-page">
      <SiteHeader />
      <main className="site-width search-page">
        <IdxSearch title="Property Search" />
      </main>
      <SiteFooter />
    </div>
  );
}
