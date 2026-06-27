


const PARTNERS = [
  "NATIONAL THEATRE",
  "NIKE ART GALLERY",
  "LAGOS STATE GOVT",
  "VISUAL ARTS COUNCIL",
];

export const PartnerBar = () => (
  <div className="py-12 border-y border-gray-100 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
        Supported by & Partners with
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
        {PARTNERS.map((name) => (
          <span
            key={name}
            className="text-2xl font-bold font-serif text-gray-400 opacity-60 grayscale transition-all duration-500 hover:text-brand-500 hover:opacity-100 hover:grayscale-0"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);