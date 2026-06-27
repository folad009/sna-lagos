import {
  Member,
  PortfolioItem,
  UpcomingEvent,
  Leader,
  GalleryItem,
  NewsArticle,
} from "../types";
import { PLACEHOLDER_GALLERY, PLACEHOLDER_NEWS } from "../data/placeholders";

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
/** Browser cache mode only — do not set Cache-Control/Pragma request headers (breaks CORS on WP). */
const NO_CACHE: RequestInit = { cache: "no-store" };

const safeFetch = async (url: string, init?: RequestInit) => {
  const res = await fetch(url, init);
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
  const r = role.toLowerCase().trim();
  if (
    (/chair(man|person)|president/.test(r) || r === "chair") &&
    !/vice|deputy|assistant/.test(r)
  ) {
    return 0;
  }
  if (/vice/.test(r) || /deputy chair/.test(r)) return 1;
  if (/general secretary/.test(r) && !/assistant/.test(r)) return 2;
  if (/assistant.*secretary|asst.*secretary/.test(r)) return 3;
  if (/financial.*sec/.test(r)) return 4;
  if (/treasurer/.test(r)) return 5;
  if (/welfare/.test(r)) return 6;
  if (/public relations|relations officer|press officer|publicity/.test(r)) {
    return 7;
  }
  if (/secretary/.test(r)) return 8;
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
      `${WP_API}/leadership?per_page=100&page=${page}&status=publish&orderby=menu_order&order=asc`,
      NO_CACHE
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

// --------------------------------------------------
// Gallery
// --------------------------------------------------
// Live source (when ready): a custom "artwork" post type or a custom
// REST route, e.g. `${WP_API}/artwork?_embed` or `${CUSTOM_REST_API}/gallery`.
// Until the CMS endpoint is published we fall back to placeholder content so
// the page renders fully. The mapper below shows the expected shape.
const GALLERY_ENDPOINT = `${WP_API}/artwork?_embed&per_page=100`;

const stripHtml = (html: string): string =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "…")
    .replace(/&#8217;/g, "’")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .trim();

const mapGalleryItem = (item: any): GalleryItem => {
  const fields = item.meta_box || {};
  const featured = item._embedded?.["wp:featuredmedia"]?.[0];
  const image =
    featured && !featured.code ? featured.source_url : fields.image || "";
  const sizes = featured?.media_details?.sizes;

  return {
    id: item.id,
    title: stripHtml(item.title?.rendered || "Untitled"),
    artist: fields.artist || "",
    category: fields.category || "Artwork",
    image,
    thumbnail: sizes?.medium_large?.source_url || sizes?.large?.source_url || image,
    year: fields.year || "",
    medium: fields.medium || "",
  };
};

export const getGalleryItems = async (): Promise<GalleryItem[]> => {
  try {
    const res = await safeFetch(GALLERY_ENDPOINT);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return PLACEHOLDER_GALLERY;
    }
    return data.map(mapGalleryItem);
  } catch (err) {
    console.warn("Gallery endpoint unavailable, using placeholder content.", err);
    return PLACEHOLDER_GALLERY;
  }
};

// --------------------------------------------------
// News
// Standard WordPress posts: `${WP_API}/posts?_embed`
// Falls back to placeholder content when the request fails or is empty.
// --------------------------------------------------
const NEWS_ENDPOINT = `${WP_API}/posts?_embed&per_page=20&orderby=date&order=desc`;

const estimateReadingTime = (html: string): number => {
  const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
};

const mapNewsArticle = (item: any, index: number): NewsArticle => {
  const featured = item._embedded?.["wp:featuredmedia"]?.[0];
  const image =
    featured && !featured.code
      ? featured.source_url
      : "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1400&q=80&fit=crop";

  const term = item._embedded?.["wp:term"]?.[0]?.[0]?.name;
  const author = item._embedded?.author?.[0]?.name;
  const content = item.content?.rendered || "";

  return {
    id: item.id,
    slug: item.slug,
    title: stripHtml(item.title?.rendered || "Untitled"),
    excerpt: stripHtml(item.excerpt?.rendered || "").slice(0, 200),
    content,
    image,
    category: term || "News",
    author: author || "SNA Lagos",
    date: item.date || new Date().toISOString(),
    readingTime: estimateReadingTime(content),
    featured: index === 0,
  };
};

export const getNews = async (): Promise<NewsArticle[]> => {
  try {
    const res = await safeFetch(NEWS_ENDPOINT, NO_CACHE);
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return PLACEHOLDER_NEWS;
    }
    return data.map(mapNewsArticle);
  } catch (err) {
    console.warn("News endpoint unavailable, using placeholder content.", err);
    return PLACEHOLDER_NEWS;
  }
};