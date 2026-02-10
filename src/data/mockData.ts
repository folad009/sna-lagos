import { Category, Member, Leader } from "../types";

export const CATEGORIES: Category[] = ['Painting', 'Sculpture', 'Digital Art', 'Mixed Media', 'Photography', 'Textiles'];

export const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Adekunle Olusegun',
    category: 'Painting',
    bio: 'Famed for vibrant oil paintings capturing the hustle and bustle of Lagos markets. His work explores the interplay of light and urban chaos.',
    email: 'ade@art.ng',
    location: 'Ikeja, Lagos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&fit=crop', title: 'Market Rush', category: 'Oil Paintings' },
      { url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&fit=crop', title: 'Street Echoes', category: 'Sketches' }
    ],
    joinedDate: '2018',
    featured: true,
    socials: { instagram: 'https://instagram.com', twitter: 'https://twitter.com', website: 'https://portfolio.com' }
  },
  {
    id: '2',
    name: 'Chinwe Egwuatu',
    category: 'Sculpture',
    bio: 'Working primarily with recycled bronze and wood, Chinwe creates ethereal figures that reflect Igbo mythology and ancestral spirits.',
    email: 'chinwe@studio.ng',
    location: 'Lekki Phase 1, Lagos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1544411047-c4915842127b?w=1200&fit=crop', title: 'Ancestral Call', category: 'Bronze' },
      { url: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1200&fit=crop', title: 'Iroko Spirit', category: 'Wood' }
    ],
    joinedDate: '2020',
    featured: true,
    socials: { instagram: 'https://instagram.com', twitter: 'https://twitter.com' }
  },
  {
    id: '3',
    name: 'Tunde Afolayan',
    category: 'Digital Art',
    bio: 'A pioneer in the Nigerian NFT space, Tunde blends traditional Yoruba patterns with futuristic 3D environments.',
    email: 'tunde@pixels.ng',
    location: 'Surulere, Lagos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&fit=crop', title: 'Cyber Ife', category: '3D Render' },
      { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=1200&fit=crop', title: 'Odua VR', category: 'Concept Art' }
    ],
    joinedDate: '2021',
    featured: true,
    socials: { website: 'https://portfolio.com' }
  },
  {
    id: '4',
    name: 'Bisi Adeniran',
    category: 'Textiles',
    bio: 'Revitalizing Adire techniques for high fashion. Her works have been featured in Lagos fashion spaces globally.',
    email: 'bisi@adire.com',
    location: 'Victoria Island, Lagos',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&fit=crop', title: 'Indigo Dreams', category: 'Adire' },
      { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&fit=crop', title: 'Loom Rhythms', category: 'Fabric Design' }
    ],
    joinedDate: '2015',
    featured: true,
    socials: { instagram: 'https://instagram.com' }
  }
];

export const LEADERSHIP_TEAM: Leader[] = [
  {
    name: 'Dr. Kolade Oshinowo',
    role: 'Chairman',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
    bio: 'A veteran artist with over 40 years of experience, specializing in social-cultural depictions of Nigerian life.'
  },
  {
    name: 'Ndidi Dike',
    role: 'Vice Chairperson',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Renowned sculptor and painter whose work examines the intersection of history, politics, and consumerism.'
  },
  {
    name: 'Oliver Enwonwu',
    role: 'Secretary General',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    bio: 'Artist, curator and brand strategist. Son of the legendary Ben Enwonwu, continuing the legacy of art advocacy.'
  },
  {
    name: 'Peju Alatise',
    role: 'Treasurer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Interdisciplinary artist and architect known for large-scale installations addressing gender and identity.'
  }
];