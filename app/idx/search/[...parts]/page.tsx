import { SiteFooter, SiteHeader } from "../../../components";
import { IdxSearch } from "../../../idx-search";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ parts: ["properties"] }];
}

export default function LegacyIdxSearch() {
  return <div className="site-page"><SiteHeader /><main className="site-width search-page"><IdxSearch title="Homes for Sale" /></main><SiteFooter /></div>;
}
