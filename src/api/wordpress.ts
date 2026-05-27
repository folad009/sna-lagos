import { Member, PortfolioItem, UpcomingEvent, Leader } from "../types";

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
      url: null,
      // Explicit endpoint for fetching the full media object and extracting source_url
      mediaEndpoint: `${WP_API}/media/${id}`,
      title: "",
      category: "Work" as PortfolioItem["category"],
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
    if (!Array.isArray(data)) {
      throw new Error(`Unexpected response on page ${page}: ${JSON.stringify(data).slice(0, 200)}`)
    }

    totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;

    allData.push(...data);
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
export const getMediaById = async (id: string): Promise<PortfolioItem> => {
  const res = await safeFetch(`${WP_API}/media/${id}`);
  const data = await res.json();

  return {
    id,
    url: data.source_url,
    mediaEndpoint: `${WP_API}/media/${id}`,
    title: data.title?.rendered || "",
    category: "Work" as PortfolioItem["category"],
  };
};

// --------------------------------------------------
// Upcoming Events
// Uses custom endpoint: /wp-json/sna/v1/upcoming-events
// --------------------------------------------------
export const getUpcomingEvents = async (): Promise<UpcomingEvent[]> => {
  const res = await safeFetch(`${CUSTOM_REST_API}/upcoming-events`);
  const data = await res.json();

  // Validate response is an array
  if (!Array.isArray(data)) {
    console.error(
      `Expected array from getUpcomingEvents, got: ${typeof data}`
    );
    return [];
  }

  return data.map((item: any) => ({
    id: item.id,
    title: item.title || "Untitled Event",
    date: item.date || "TBA",
    location: item.location || "TBA",
    category: item.category || "General",
    image: item.image || "",
    registrationLink: item.registrationLink || item.link || "",
  }));
};

type WpLeaderImage = {
  full_url?: string;
  url?: string;
  sizes?: Record<string, { url?: string }>;
};

type WpLeadershipItem = {
  id: number;
  menu_order?: number;
  title?: { rendered?: string };
  content?: { rendered?: string };
  meta_box?: {
    full_name?: string;
    position?: string;
    leader_image?: WpLeaderImage[];
    tenure?: string;
    bio?: string;
  };
};

const extractLeaderImage = (
  images: WpLeaderImage[] | undefined
): string => {
  const img = images?.[0];
  if (!img) return "";
  return (
    img.sizes?.large?.url ||
    img.sizes?.medium_large?.url ||
    img.full_url ||
    img.url ||
    ""
  );
};

const mapLeadershipItem = (item: WpLeadershipItem): Leader => {
  const fields = item.meta_box || {};
  return {
    id: item.id,
    name: fields.full_name?.trim() || item.title?.rendered?.trim() || "Unknown",
    role: fields.position?.trim() || "",
    image: extractLeaderImage(fields.leader_image),
    bio: fields.bio?.trim() || "",
    tenure: fields.tenure?.trim() || "",
    menuOrder: item.menu_order ?? 0,
  };
};

const leadershipRoleRank = (role: string): number => {
  const r = role.toLowerCase();
  if (
    (/chair(man|person)|president/.test(r) || r === "chair") &&
    !/vice|deputy|assistant|deputy/.test(r)
  ) {
    return 0;
  }
  if (/vice/.test(r) || /deputy chair/.test(r)) return 1;
  if (/secretary/.test(r) && !/assistant/.test(r)) return 2;
  if (/treasurer|financial/.test(r)) return 3;
  if (/welfare/.test(r)) return 4;
  if (/publicity|press|media|pro/.test(r)) return 5;
  if (/exhibition/.test(r)) return 6;
  return 50;
};

const sortLeaders = (a: Leader, b: Leader): number => {
  const byRole = leadershipRoleRank(a.role) - leadershipRoleRank(b.role);
  if (byRole !== 0) return byRole;
  const byMenu = (a.menuOrder ?? 0) - (b.menuOrder ?? 0);
  if (byMenu !== 0) return byMenu;
  return a.name.localeCompare(b.name);
};

export const getLeadership = async (): Promise<Leader[]> => {
  let page = 1;
  let totalPages = 1;
  const all: WpLeadershipItem[] = [];

  do {
    const res = await safeFetch(
      `${WP_API}/leadership?per_page=100&page=${page}&status=publish&orderby=menu_order&order=asc`
    );
    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error(
        `Unexpected leadership response: ${JSON.stringify(data).slice(0, 200)}`
      );
    }
    totalPages = Number(res.headers.get("X-WP-TotalPages")) || 1;
    all.push(...data);
    page++;
  } while (page <= totalPages);

  return all.map(mapLeadershipItem).sort(sortLeaders);
};