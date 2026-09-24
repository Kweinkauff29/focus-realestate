import { PageShell } from "../../../components";
import { demoListings } from "../../../site-data";

type DetailProps = { params: Promise<{ parts: string[] }> };

export default async function ListingDetail({ params }: DetailProps) {
  const { parts } = await params;
  const id = parts.find((part) => demoListings.some((listing) => listing.id === part));
  const listing = demoListings.find((item) => item.id === id) || demoListings[0];
  return <PageShell title={listing.address} fullWidth eyebrow={listing.status || "Property Details"}><div className="detail-layout"><div className="detail-photo"><img src={listing.image} alt={`${listing.address}, ${listing.city}`} /></div><div className="detail-summary"><strong className="detail-price">{listing.price}</strong><p className="detail-address">{listing.address}<br />{listing.city}</p><div className="detail-facts">{listing.beds && <span><b>{listing.beds}</b> Beds</span>}{listing.baths && <span><b>{listing.baths}</b> Baths</span>}{listing.sqft && <span><b>{listing.sqft}</b> Sq Ft</span>}</div><p>Property information is shown in preview mode. Once the new IDX credentials are connected, this page will display live photos, remarks, features, map data and required MLS attribution.</p><a className="button dark" href="/contact-us">Request Information</a></div></div></PageShell>;
}

