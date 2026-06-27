export type Category = 'Painting' | 'Sculpture' | 'Digital Art' | 'Mixed Media' | 'Photography' | 'Textiles';

export interface PortfolioItem {
  id?: string;
  url?: string;
  mediaEndpoint?: string;
  title: string;
  category: Category;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  registrationLink?: string;
}

export interface Member {
  id: string;
  name: string;
  category: Category;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  portfolio: PortfolioItem[];
  phoneNumber: number;
  featured?: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface Leader {
  id: string | number;
  name: string;
  role: string;
  image: string;
  bio?: string;
  tenure?: string;
  menuOrder?: number;
}

export interface User {
    id: string;
  name: string;
  email: string;
}

export interface GalleryItem {
  id: string | number;
  title: string;
  artist?: string;
  category: string;
  /** Full-resolution image used in the lightbox. */
  image: string;
  /** Optional smaller image for grid thumbnails (falls back to `image`). */
  thumbnail?: string;
  year?: string;
  medium?: string;
  /** Optional aspect ratio (width / height) to preserve masonry layout before load. */
  ratio?: number;
}

export interface NewsArticle {
  id: string | number;
  slug?: string;
  title: string;
  excerpt: string;
  /** Rendered HTML body from the CMS. */
  content: string;
  image: string;
  category: string;
  author: string;
  /** ISO date string. */
  date: string;
  readingTime?: number;
  featured?: boolean;
}