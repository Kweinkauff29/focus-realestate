import { SiteFooter, SiteHeader } from "../../../components";
import { IdxSearch } from "../../../idx-search";

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
