import { Member, PortfolioItem } from "../types";

const BASE_URL = "https://thedesignhub.com.ng/sna-backend/wp-json";
const WP_API = `${BASE_URL}/wp/v2`;
const CUSTOM_REST_API = `${BASE_URL}/sna/v1`;

// --------------------------------------------------
// Simple cache (artists rarely change)
// --------------------------------------------------
let artistsCache: Member[] | null = null;

// --------------------------------------------------
// Helpers
// --------------------------------------------------
const safeFetch = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed: ${url}`);
  }
  return res;
};

// --------------------------------------------------
// Artist Mapping
// --------------------------------------------------
const mapArtistToMember = async (item: any): Promise<Member> => {
  const fields = item.meta_box || {};

  // Handle featured media safely (WP sometimes returns rest_forbidden)
  const featuredRaw = item._embedded?.["wp:featuredmedia"]?.[0];

  const avatar =
    featuredRaw && !featuredRaw.code
      ? featuredRaw.source_url
      : fields.avatar || "";

  // Lazy portfolio (IDs only — fetch images only on detail view)
  const portfolio: PortfolioItem[] = (fields.portfolio || []).map(
    (id: string) => ({
      id,
      // This is an API endpoint, not the image itself.
      // Fetch it later and extract source_url when needed.
      url: `${WP_API}/media/${id}`,
      title: "",
      category: "Work",
    })
  );

  return {
    id: item.id,
    name: item.title?.rendered || "Unnamed Artist",
    bio: fields.bio || "",
    avatar,
    location: fields.location || "",
    category: fields.category || "General",
    email: fields.email || "",
    phoneNumber: fields.phoneNumber || "",
    portfolio,
    featured: fields.feature === "1", // WP meta returns string
    socials: fields.socials || {},
  };
};

// --------------------------------------------------
// Get All Artists (server pagination)
// --------------------------------------------------
export const getArtists = async (): Promise<Member[]> => {
  if (artistsCache) return artistsCache;

  let page = 1;
  let totalPages = 1;
  let allData: any[] = [];

  do {
    const res = await safeFetch(
      `${WP_API}/artist?_embed&per_page=100&page=${page}&orderby=title&order=asc`
    );

    const data = await res.json();
    totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;

    allData = [...allData, ...data];
    page++;
  } while (page <= totalPages);

  const members = await Promise.all(allData.map(mapArtistToMember));
  artistsCache = members;

  return members;
};

// --------------------------------------------------
// Get Single Artist
// --------------------------------------------------
export const getArtistById = async (id: number): Promise<Member> => {
  const res = await safeFetch(`${WP_API}/artist/${id}?_embed`);
  const data = await res.json();
  return mapArtistToMember(data);
};

// --------------------------------------------------
// Resolve Portfolio Image (lazy load helper)
// --------------------------------------------------
export const getMediaById = async (id: string) => {
  const res = await safeFetch(`${WP_API}/media/${id}`);
  const data = await res.json();

  return {
    id,
    url: data.source_url,
    title: data.title?.rendered || "",
    category: "Work",
  };
};

// --------------------------------------------------
// Upcoming Events
// Uses custom endpoint: /wp-json/sna/v1/upcoming-events
// --------------------------------------------------
export const getUpcomingEvents = async () => {
  const res = await safeFetch(`${CUSTOM_REST_API}/upcoming-events`);
  const data = await res.json();

  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "Untitled Event",
    date: item.date || "TBA",
    location: item.location || "TBA",
    category: item.category || "General",
    image: item.image || "",
    link: item.link || "#",
  }));
};

export const getLeadership = async () => {
  const res = await safeFetch(`${CUSTOM_REST_API}/leadership`);

  if (!res.ok) throw new Error("Failed to fetch leadership");

  return res.json();
};