import { GalleryItem, NewsArticle } from "../types";

// --------------------------------------------------
// Placeholder content
// These render while the WordPress CMS endpoints are being wired up.
// The shape mirrors what the API mappers return, so swapping to live
// data requires no changes in the views.
// --------------------------------------------------

export const PLACEHOLDER_GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Lagos at Dusk",
    artist: "Adeola Balogun",
    category: "Painting",
    image:
      "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200&q=80&fit=crop",
    medium: "Acrylic on canvas",
    year: "2024",
    ratio: 0.75,
  },
  {
    id: "g2",
    title: "Adire Reimagined",
    artist: "Nike Okundaye",
    category: "Textiles",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80&fit=crop",
    medium: "Indigo-dyed cotton",
    year: "2023",
    ratio: 1.33,
  },
  {
    id: "g3",
    title: "Bronze Echoes",
    artist: "Chika Modum",
    category: "Sculpture",
    image:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80&fit=crop",
    medium: "Cast bronze",
    year: "2024",
    ratio: 0.8,
  },
  {
    id: "g4",
    title: "Market Rhythms",
    artist: "Tunde Owolabi",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1517497330800-3f3b855a31a8?w=1200&q=80&fit=crop",
    medium: "Archival print",
    year: "2022",
    ratio: 1.5,
  },
  {
    id: "g5",
    title: "Threads of Identity",
    artist: "Peju Alatise",
    category: "Mixed Media",
    image:
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=1200&q=80&fit=crop",
    medium: "Fabric, resin, wood",
    year: "2023",
    ratio: 0.7,
  },
  {
    id: "g6",
    title: "Digital Ancestors",
    artist: "Laolu Senbanjo",
    category: "Digital Art",
    image:
      "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=1200&q=80&fit=crop",
    medium: "Generative print",
    year: "2024",
    ratio: 1,
  },
  {
    id: "g7",
    title: "Yoruba Geometry",
    artist: "Bunmi Oyesanya",
    category: "Painting",
    image:
      "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=1200&q=80&fit=crop",
    medium: "Oil on linen",
    year: "2021",
    ratio: 1.2,
  },
  {
    id: "g8",
    title: "Coastline Studies",
    artist: "Ibe Ananaba",
    category: "Photography",
    image:
      "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?w=1200&q=80&fit=crop",
    medium: "Archival print",
    year: "2023",
    ratio: 0.66,
  },
  {
    id: "g9",
    title: "Terracotta Memory",
    artist: "El Anatsui",
    category: "Sculpture",
    image:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1200&q=80&fit=crop",
    medium: "Fired clay",
    year: "2022",
    ratio: 1.4,
  },
  {
    id: "g10",
    title: "Spirit of the Lagoon",
    artist: "Ndidi Emefiele",
    category: "Mixed Media",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=1200&q=80&fit=crop",
    medium: "Collage on board",
    year: "2024",
    ratio: 0.85,
  },
];

export const PLACEHOLDER_NEWS: NewsArticle[] = [
  {
    id: "n1",
    slug: "sna-lagos-annual-exhibition-2025",
    title: "SNA Lagos Unveils Theme for the 2025 Annual Exhibition",
    excerpt:
      "This year's juried showcase celebrates the dialogue between indigenous craft and contemporary practice, opening submissions to members across all media.",
    content:
      "<p>The Society of Nigerian Artists, Lagos Chapter, is proud to announce <strong>\u201CThreads & Terracotta\u201D</strong> as the theme for its 2025 Annual Exhibition. The showcase invites members to explore the conversation between heritage techniques and contemporary expression.</p><p>Submissions open in March and will be reviewed by a panel of curators and senior members. Selected works will be exhibited at the National Theatre, Iganmu, with a public viewing running for two weeks.</p><p>\u201CWe want this edition to honour where we come from while pushing where we are going,\u201D said the Chapter Chairman. \u201CExpect bold materials and brave ideas.\u201D</p>",
    image:
      "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=1400&q=80&fit=crop",
    category: "Exhibitions",
    author: "SNA Lagos Secretariat",
    date: "2025-02-18",
    readingTime: 3,
    featured: true,
  },
  {
    id: "n2",
    slug: "mentorship-program-cohort-three",
    title: "Applications Open for the Third Emerging Artist Mentorship Cohort",
    excerpt:
      "Early-career artists in Lagos can now apply to be paired with established members for a six-month studio mentorship.",
    content:
      "<p>The mentorship program returns for a third cohort, pairing emerging artists with seasoned practitioners for studio guidance, portfolio reviews, and exhibition support.</p><p>Applications close at the end of the month. Successful applicants will be announced at the next general meeting.</p>",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1400&q=80&fit=crop",
    category: "Programs",
    author: "Welfare Committee",
    date: "2025-01-30",
    readingTime: 2,
  },
  {
    id: "n3",
    slug: "adire-heritage-workshop-recap",
    title: "Inside the Adire Heritage Workshop: A Weekend of Indigo",
    excerpt:
      "Members gathered in Abeokuta for a hands-on workshop reviving traditional resist-dyeing methods with a modern twist.",
    content:
      "<p>Over a sunlit weekend, members travelled to Abeokuta to study the craft of Adire from master dyers. The workshop blended history with experimentation, producing a striking collection of community pieces.</p><p>Documentation from the workshop will feed into an upcoming archival project.</p>",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1400&q=80&fit=crop",
    category: "Workshops",
    author: "Education Sub-Committee",
    date: "2025-01-12",
    readingTime: 4,
  },
  {
    id: "n4",
    slug: "lagos-art-week-partnership",
    title: "SNA Lagos Partners with Lagos Art Week for 2025",
    excerpt:
      "A new partnership will give members dedicated booth space and panel slots at this year's citywide celebration of the arts.",
    content:
      "<p>The chapter has entered a partnership with the organisers of Lagos Art Week, securing member exhibition space and speaking opportunities across the festival's program.</p><p>More details on participation will be shared with members shortly.</p>",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1400&q=80&fit=crop",
    category: "Announcements",
    author: "Public Relations Office",
    date: "2024-12-20",
    readingTime: 2,
  },
  {
    id: "n5",
    slug: "in-memoriam-tribute",
    title: "Honouring a Lifetime of Service to Nigerian Art",
    excerpt:
      "The chapter pays tribute to a beloved member whose decades of mentorship shaped a generation of Lagos artists.",
    content:
      "<p>It is with deep gratitude that we celebrate the legacy of a member whose generosity and craft inspired countless artists across the chapter.</p><p>A commemorative exhibition is being planned in their honour.</p>",
    image:
      "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=1400&q=80&fit=crop",
    category: "Community",
    author: "SNA Lagos Secretariat",
    date: "2024-12-05",
    readingTime: 3,
  },
  {
    id: "n6",
    slug: "digital-archive-launch",
    title: "Building a Digital Archive of Lagos Chapter Works",
    excerpt:
      "A new initiative will digitise and preserve member works, making the chapter's history searchable for researchers and collectors.",
    content:
      "<p>The chapter is launching a digital archive to preserve and celebrate the body of work produced by its members over the decades.</p><p>Members are invited to contribute high-resolution documentation of their pieces.</p>",
    image:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1400&q=80&fit=crop",
    category: "Programs",
    author: "Archive Working Group",
    date: "2024-11-22",
    readingTime: 3,
  },
];
