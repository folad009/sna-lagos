export type Category = 'Painting' | 'Sculpture' | 'Digital Art' | 'Mixed Media' | 'Photography' | 'Textiles';

export interface PortfolioItem {
  url: string;
  title: string;
  category: string;
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
  joinedDate: string;
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