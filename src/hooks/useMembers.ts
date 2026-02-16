import { useEffect, useState } from "react";
import { getArtists } from "../api/wordpress";
import { Member } from "../types";

export const useMembers = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getArtists()
      .then(setMembers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { members, loading, error };
};
