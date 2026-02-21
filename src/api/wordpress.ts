import { Member, PortfolioItem } from "../types"


const API_URL = "https://thedesignhub.com.ng/sna-backend/wp-json/wp/v2"

const getMedia = async (id: string) => {
  const res = await fetch(`${API_URL}/media/${id}`)
  const data = await res.json()
  return {
    id,
    url: data.source_url,
    title: data.title?.rendered || "",
    category: "Work"
  }
}

const mapArtistToMember = async (item: any): Promise<Member> => {
  const fields = item.meta_box || {};

  let portfolio: PortfolioItem[] = [];


  if (fields.portfolio?.length) {
    portfolio = await Promise.all(
      fields.portfolio.map((id: string) => getMedia(id))
    );
  }

  return {
    id: item.id,
    name: item.title?.rendered || "Unnamed Artist",
    bio: fields.bio || "",
    avatar:
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      fields.avatar ||
      "",
    location: fields.location || "",
    category: fields.category || "General",
    email: fields.email || "",
    phoneNumber: fields.phoneNumber || "",
    portfolio,
    featured: fields.feature || false, // match API
    socials: fields.socials || {},
  };
};



export const getArtists = async (): Promise<Member[]> => {
  const res = await fetch(`${API_URL}/artist?_embed`)
  const data = await res.json()

  console.log("RAW API:", data[0])

  return Promise.all(data.map(mapArtistToMember))
}

export const getArtistById = async (id: number): Promise<Member> => {
    const res = await fetch(`${API_URL}/artist/${id}?_embed`)
    if (!res.ok) throw new Error("Failed to fetch artist")

    const data = await res.json()
    return mapArtistToMember(data)
}