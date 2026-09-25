export type NavItem = { label: string; href: string };
export type NavGroup = { label: string; href?: string; items?: NavItem[] };

export const socialLinks = [
  { label: "Facebook", short: "f", href: "https://www.facebook.com/FocusRE" },
  { label: "X", short: "X", href: "https://twitter.com/@Uweinkauff" },
  { label: "LinkedIn", short: "in", href: "http://linkedin.com/in/ursulaweinkauff" },
  { label: "Instagram", short: "◎", href: "http://www.instagram.com/ursula_weinkauff" },
  { label: "YouTube", short: "▶", href: "http://www.youtube.com/UrsulaWeinkauff" },
  { label: "TikTok", short: "♪", href: "http://www.tiktok.com/@ursulaweinkauff" },
  { label: "Google", short: "G", href: "https://g.page/r/Ca9XCCbfXiBaEBM/review" },
];

export const navGroups: NavGroup[] = [
  { label: "Home", href: "/" },
  {
    label: "Listings",
    items: [
      { label: "Team Listings", href: "/office-listings" },
      { label: "Sold Listings", href: "/sold-listings" },
      { label: "Team Sold Listings", href: "/office-sold-listings" },
      { label: "Open Houses", href: "/open-houses-page" },
    ],
  },
  {
    label: "Search",
    items: [
      { label: "Quick Search", href: "/quick-search" },
      { label: "Map Search", href: "/map-search" },
      { label: "Foreclosures", href: "/foreclosure-search" },
      { label: "Commercial Search", href: "/commercial-search" },
      { label: "Commercial Listings", href: "/commercial-listings" },
    ],
  },
  {
    label: "Communities",
    items: [
      { label: "Bonita Springs Homes", href: "/homes-for-sale-in-bonita-springs-fl" },
      { label: "Estero Homes", href: "/homes-for-sale-in-estero-fl" },
      { label: "Fort Myers Homes", href: "/homes-for-sale-in-fort-myers-fl" },
      { label: "Fort Myers Beach Homes", href: "/homes-for-sale-in-fort-myers-beach-fl" },
      { label: "Naples Homes", href: "/homes-for-sale-in-naples-fl" },
      { label: "Sanibel Island Homes", href: "/sanibel-island-homes-for-sale" },
      { label: "Captiva Island Homes", href: "/captiva-island-homes-for-sale" },
      { label: "Pelican Landing Homes", href: "/pelican-landing-homes-for-sale" },
      { label: "The Colony Homes", href: "/the-colony-homes-for-sale" },
      { label: "Bonita Bay Homes", href: "/bonita-bay-homes-for-sale" },
      { label: "WildBlue Homes", href: "/wildblue-homes-for-sale" },
      { label: "RiverCreek Homes", href: "/rivercreek-homes-for-sale" },
      { label: "Shadow Wood Homes", href: "/shadow-wood-homes-for-sale" },
      { label: "Miromar Lakes Homes", href: "/miromar-lakes-homes-for-sale" },
      { label: "Esplanade Homes", href: "/esplanade-homes-for-sale" },
      { label: "Bonita National Homes", href: "/bonita-national-homes-for-sale" },
      { label: "Valencia Bonita Homes", href: "/valencia-bonita-homes-for-sale" },
    ],
  },
  {
    label: "Area Info",
    items: [
      { label: "Pelican Landing", href: "/pelican-landing-area-info" },
      { label: "The Colony", href: "/the-colony-area-info" },
      { label: "Bonita Bay", href: "/bonita-bay-area-info" },
      { label: "Esplanade Lake Club", href: "/esplanade-lake-club-area-info" },
      { label: "Bonita National Golf & Country Club", href: "/bonita-national-golf-country-club-area-info" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Buyer/Seller Info", href: "/buyerseller-info" },
      { label: "Dream Home Finder", href: "/dream-home-finder" },
      { label: "FREE Market Analysis", href: "/free-market-analysis" },
      { label: "Mortgage Rates", href: "/mortgage-rates" },
      { label: "Real Estate News", href: "/real-estate-news" },
    ],
  },
  {
    label: "About Ursula & her Team",
    items: [
      { label: "About Us", href: "/about-us" },
      { label: "Meet The Team", href: "/meet-the-team" },
      { label: "Testimonials", href: "/testimonials-page" },
      { label: "Our Blog", href: "/my-blog" },
      { label: "YouTube Channel", href: "https://www.youtube.com/UrsulaWeinkauff" },
    ],
  },
  { label: "Contact", href: "/contact-us" },
];

export const locations = [
  { name: "Bonita Springs", slug: "bonita-springs", image: "/assets/bonita-springs.jpg", latitude: 26.3398, longitude: -81.7787 },
  { name: "Estero", slug: "estero", image: "/assets/estero.jpg", latitude: 26.4381, longitude: -81.8068 },
  { name: "Fort Myers", slug: "fort-myers", image: "/assets/fort-myers.jpg", latitude: 26.6406, longitude: -81.8723 },
  { name: "Fort Myers Beach", slug: "fort-myers-beach", image: "/assets/fort-myers-beach.jpg", latitude: 26.452, longitude: -81.9481 },
  { name: "Naples", slug: "naples", image: "/assets/naples.jpg", latitude: 26.142, longitude: -81.7948 },
];

export const communities = [
  "Sanibel Island",
  "Captiva Island",
  "Pelican Landing",
  "The Colony",
  "Bonita Bay",
  "WildBlue",
  "RiverCreek",
  "Shadow Wood",
  "Miromar Lakes",
  "Esplanade",
  "Bonita National",
  "Valencia Bonita",
];

export const priceBands = [
  { label: "Under $350,000", suffix: "under-350000" },
  { label: "$350,000 to $500,000", suffix: "350000-to-500000" },
  { label: "$500,000 to $750,000", suffix: "500000-to-750000" },
  { label: "$750,000 to $1,000,000", suffix: "750000-to-1000000" },
  { label: "$1,000,000 to $1,500,000", suffix: "1000000-to-1500000" },
  { label: "$1,500,000 to $2,500,000", suffix: "1500000-to-2500000" },
  { label: "Luxury Homes $2,500,000+", suffix: "luxury" },
];

export type Listing = {
  id: string;
  price: string;
  address: string;
  city: string;
  beds?: number;
  baths?: number;
  sqft?: string;
  status?: string;
  image: string;
};

export const demoListings: Listing[] = [
  { id: "226032151", price: "$239,900", address: "8751 Lateen Ln #102", city: "Fort Myers, FL 33919", beds: 3, baths: 2.5, sqft: "1,536", status: "Open House", image: "/assets/fort-myers.jpg" },
  { id: "226023989", price: "$27,500", address: "347 Piper Ave", city: "Lehigh Acres, FL 33974", sqft: "0.28 acres", status: "Active", image: "/assets/bonita-springs.jpg" },
  { id: "226023042", price: "$1,150,000", address: "4442 Wilder Rd", city: "Naples, FL 34105", beds: 5, baths: 4.5, sqft: "3,183", status: "Virtual Tour", image: "/assets/naples.jpg" },
  { id: "226014858", price: "$345,000", address: "28740 Diamond Dr #104", city: "Bonita Springs, FL 34134", beds: 2, baths: 2, sqft: "1,284", status: "Pending", image: "/assets/bonita-springs.jpg" },
  { id: "demo-estero", price: "$700,000", address: "21530 Strada Nuova Cir #215", city: "Estero, FL 33928", beds: 3, baths: 3, sqft: "2,274", status: "Active", image: "/assets/estero.jpg" },
  { id: "demo-beach", price: "$825,000", address: "26130 Hickory Blvd #1B", city: "Bonita Springs, FL 34134", beds: 3, baths: 2, sqft: "1,643", status: "New", image: "/assets/fort-myers-beach.jpg" },
];

export const testimonials = [
  { name: "Norbert Giehler", quote: "One of the Best Brokerage Firms in SW Florida! Highly professional property valuation, processing and sale. We will use Ms. Weinkauff’s services for future projects, purchases and sales. Everything is just right here." },
  { name: "Clayton Brown", quote: "Ursula was very tentative, answered all her questions, and very friendly." },
  { name: "Kevin Weinkauff", quote: "An incredible 20+ years of experience agent that helped me purchase my first home!" },
  { name: "Jennifer Zhang", quote: "Ursula really knows the local housing market. She answered all our questions promptly, was knowledgeable in many aspects during the process, and provided plenty of great advice. Highly recommended!" },
  { name: "Heinz Waser", quote: "Top quality full package brokerage in buying as well as selling situations. Ursula is definitely an experienced pro. Very recommendable." },
  { name: "Steven Fishman", quote: "Ursula is the epitome of a real estate professional. She is extremely knowledgeable about the changing market. I highly recommend her!" },
  { name: "Kris Boyle", quote: "Over the past several months, Ursula has been there every step of the way. Her professionalism, mentorship, knowledge, and honesty are truly respected and appreciated." },
  { name: "Michael Belk", quote: "By trusting Ursula to guide our decisions in the negotiation process, we ended up with a great deal. Even after closing, she kept helping us get answers to every question." },
  { name: "Andrea Volmari", quote: "Ursula guided us through the sale of our house with great professionalism and patience. Her high ethical standards and extensive experience gave us real peace of mind." },
  { name: "Holger", quote: "We can 100% recommend Ursula. She takes care of every detail, has excellent communication skills, and helps you every step of the way so you never feel left alone." },
  { name: "Arno", quote: "You made buying a home so easy for my wife and I. We were grateful for how much patience you used in answering all our questions and taking us to look at so many houses." },
  { name: "Elaine", quote: "In all our dealings with Realtors® over the past ten years, we have never met anyone as helpful and energetic as you have been." },
  { name: "Ute & Manfred", quote: "Our expectations of professional advice were high, and Ursula fulfilled them to our fullest satisfaction." },
  { name: "John", quote: "Thanks for all your help in making our dream home a reality. We really appreciated that you went the extra mile to get us the best price for our home." },
  { name: "Sabine", quote: "Thank you so much for taking the extra effort to make our first home purchase successful. You were there guiding us through all the crucial and important steps." },
  { name: "Olaf Monien", quote: "I know Ursula since 2008. She listens to the customer and works hard to meet the customer’s expectations. I would definitely recommend her." },
  { name: "Gabriele Batschak", quote: "Ursula is a very self-sacrificing woman. Nothing is too much for her. Customers are always served very courteously, and I can personally only recommend her." },
];

export const legacySlugs = [
  "21530-strada-nuova-cir-215-estero-fl-33928-700000", "about-us", "active-listings", "advanced-search",
  "bonita-bay-area-info", "bonita-bay-homes", "bonita-bay-homes-for-sale", "bonita-national-golf-country-club-area-info",
  "bonita-national-homes-for-sale", "buyerseller-info", "captiva-island-homes-for-sale", "commercial-listings",
  "commercial-search", "contact-us", "dream-home-finder", "esplanade-homes-for-sale", "esplanade-lake-club-area-info",
  "foreclosure-search", "free-market-analysis", "homes-for-sale-in-bonita-springs-fl", "homes-for-sale-in-bonita-springs-fl-1000000-to-1500000",
  "homes-for-sale-in-bonita-springs-fl-1500000-to-2500000", "homes-for-sale-in-bonita-springs-fl-350000-to-500000",
  "homes-for-sale-in-bonita-springs-fl-500000-to-750000", "homes-for-sale-in-bonita-springs-fl-750000-to-1000000",
  "homes-for-sale-in-bonita-springs-fl-under-350000", "homes-for-sale-in-estero-fl", "homes-for-sale-in-estero-fl-1000000-to-1500000",
  "homes-for-sale-in-estero-fl-1500000-to-2500000", "homes-for-sale-in-estero-fl-350000-to-500000",
  "homes-for-sale-in-estero-fl-500000-to-750000", "homes-for-sale-in-estero-fl-750000-to-1000000",
  "homes-for-sale-in-estero-fl-under-350000", "homes-for-sale-in-fort-myers-beach-fl",
  "homes-for-sale-in-fort-myers-beach-fl-1000000-to-1500000", "homes-for-sale-in-fort-myers-beach-fl-1500000-to-2500000",
  "homes-for-sale-in-fort-myers-beach-fl-350000-to-500000", "homes-for-sale-in-fort-myers-beach-fl-500000-to-750000",
  "homes-for-sale-in-fort-myers-beach-fl-750000-to-1000000", "homes-for-sale-in-fort-myers-beach-fl-under-350000",
  "homes-for-sale-in-fort-myers-fl", "homes-for-sale-in-fort-myers-fl-1000000-to-1500000",
  "homes-for-sale-in-fort-myers-fl-1500000-to-2500000", "homes-for-sale-in-fort-myers-fl-350000-to-500000",
  "homes-for-sale-in-fort-myers-fl-500000-to-750000", "homes-for-sale-in-fort-myers-fl-750000-to-1000000",
  "homes-for-sale-in-fort-myers-fl-under-350000", "homes-for-sale-in-naples-fl", "homes-for-sale-in-naples-fl-1000000-to-1500000",
  "homes-for-sale-in-naples-fl-1500000-to-2500000", "homes-for-sale-in-naples-fl-350000-to-500000",
  "homes-for-sale-in-naples-fl-500000-to-750000", "homes-for-sale-in-naples-fl-750000-to-1000000",
  "homes-for-sale-in-naples-fl-under-350000", "luxury-homes-for-sale-in-bonita-springs-fl",
  "luxury-homes-for-sale-in-estero-fl", "luxury-homes-for-sale-in-fort-myers-beach-fl", "luxury-homes-for-sale-in-fort-myers-fl",
  "luxury-homes-for-sale-in-naples-fl", "map-search", "meet-our-team", "meet-the-team", "miromar-lakes-homes-for-sale",
  "mortgage-rates", "my-blog", "my-post", "my-post-1", "my-post-2", "office-listings", "office-sold-listings",
  "open-house-recommendation-for-buyers", "open-houses-page", "pelican-landing-area-info", "pelican-landing-homes",
  "pelican-landing-homes-for-sale", "quick-search", "real-estate-investing", "real-estate-news", "rivercreek-homes-for-sale",
  "sanibel-island-homes-for-sale", "shadow-wood-homes-for-sale", "sold-listings", "testimonials-page",
  "the-colony-area-info", "the-colony-homes-for-sale", "valencia-bonita-homes-for-sale", "welcome-to-southwest-florida",
  "wildblue-homes-for-sale",
];
