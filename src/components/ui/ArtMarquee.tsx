

export const ArtMarquee = () => {
  const images = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544411047-c4915842127b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=400&fit=crop"
  ];

  return (
    <div className="relative py-12 bg-white overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...images, ...images].map((src, i) => (
          <div key={i} className="mx-4 w-64 h-64 shrink-0 rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="SNA Artwork" />
          </div>
        ))}
      </div>
    </div>
  );
};