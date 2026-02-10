import { useEffect } from "react";

export const useMetaTags = (
  title: string,
  description: string,
  image?: string
) => {
  useEffect(() => {
    const originalTitle = document.title;
    const originalDescEl = document.querySelector('meta[name="description"]');
    const originalDesc = originalDescEl?.getAttribute("content") || "";

    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      let el = property
        ? document.querySelector(`meta[property="${name}"]`)
        : document.querySelector(`meta[name="${name}"]`);

      if (!el) {
        el = document.createElement("meta");
        if (property) el.setAttribute("property", name);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }

      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    if (image) setMeta("og:image", image, true);
    setMeta("og:type", "profile", true);

    return () => {
      document.title = originalTitle;
      if (originalDescEl) {
        originalDescEl.setAttribute("content", originalDesc);
      }
    };
  }, [title, description, image]);
};
