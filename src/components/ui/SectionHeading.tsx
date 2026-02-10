

export const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">{title}</h2>
    {subtitle && <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
    <div className={`w-24 h-1.5 bg-emerald-800 mt-6 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);
