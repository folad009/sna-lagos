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
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface User {
    id: string;
  name: string;
  email: string;
}