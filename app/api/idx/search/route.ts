import { demoListings, type Listing } from "../../../site-data";

const allowedParams = ["location", "propertyType", "minPrice", "maxPrice", "beds", "baths", "status", "officeOnly"];

function money(value: unknown) {
  const amount = typeof value === "number" ? value : Number(String(value || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount) : "Contact for price";
}

function normalizeListing(raw: Record<string, unknown>, index: number): Listing {
  const media = raw.media || raw.photos || raw.images;
  const firstMedia = Array.isArray(media) ? media[0] : undefined;
  const image = typeof firstMedia === "string" ? firstMedia : firstMedia && typeof firstMedia === "object" ? String((firstMedia as Record<string, unknown>).url || (firstMedia as Record<string, unknown>).Uri || "") : String(raw.image || raw.photo || raw.primaryPhoto || "");
  return {
    id: String(raw.id || raw.listingId || raw.ListingKey || raw.ListingId || `idx-${index}`),
    price: money(raw.price || raw.ListPrice || raw.listPrice),
    address: String(raw.address || raw.UnparsedAddress || raw.streetAddress || "Southwest Florida Property"),
    city: [raw.city || raw.City, raw.state || raw.StateOrProvince, raw.postalCode || raw.PostalCode].filter(Boolean).join(" ") || "Southwest Florida",
    beds: Number(raw.beds || raw.BedroomsTotal || raw.bedrooms) || undefined,
    baths: Number(raw.baths || raw.BathroomsTotalInteger || raw.bathrooms) || undefined,
    sqft: raw.sqft || raw.LivingArea ? Number(raw.sqft || raw.LivingArea).toLocaleString("en-US") : undefined,
    status: String(raw.status || raw.StandardStatus || "Active"),
    image: image || "/assets/bonita-springs.jpg",
  };
}

export async function GET(request: Request) {
  const baseUrl = process.env.IDX_API_BASE_URL;
  const searchPath = process.env.IDX_API_SEARCH_PATH || "/listings/search";
  if (!baseUrl) return Response.json({ source: "demo", listings: demoListings });

  const incoming = new URL(request.url).searchParams;
  const target = new URL(searchPath, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  for (const key of allowedParams) {
    const value = incoming.get(key);
    if (value) target.searchParams.set(key, value);
  }
  target.searchParams.set("limit", incoming.get("limit") || "24");

  const headers: Record<string, string> = { Accept: "application/json" };
  if (process.env.IDX_API_TOKEN) headers.Authorization = `Bearer ${process.env.IDX_API_TOKEN}`;
  if (process.env.IDX_API_KEY) headers[process.env.IDX_API_KEY_HEADER || "X-API-Key"] = process.env.IDX_API_KEY;

  try {
    const response = await fetch(target, { headers, signal: AbortSignal.timeout(12000) });
    if (!response.ok) return Response.json({ message: `IDX provider returned ${response.status}.` }, { status: 502 });
    const payload = await response.json() as Record<string, unknown> | unknown[];
    const records = Array.isArray(payload) ? payload : [payload.results, payload.listings, payload.value, payload.data].find(Array.isArray) || [];
    const listings = (records as Record<string, unknown>[]).map(normalizeListing);
    return Response.json({ source: "idx", listings });
  } catch (error) {
    return Response.json({ message: error instanceof Error ? error.message : "IDX search failed." }, { status: 502 });
  }
}

