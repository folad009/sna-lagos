export const SectionHeading = ({
  title,
  subtitle,
  eyebrow,
  centered = false,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  centered?: boolean;
}) => (
  <div className={`mb-12 ${centered ? "text-center flex flex-col items-center" : ""}`}>
    {eyebrow && (
      <span className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-brand-500">
        <span className="h-px w-6 bg-brand-500" />
        {eyebrow}
      </span>
    )}
    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">{title}</h2>
    {subtitle && (
      <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">{subtitle}</p>
    )}
    <div
      className={`w-24 h-1.5 bg-brand-500 mt-6 rounded-full ${centered ? "mx-auto" : ""}`}
    ></div>
  </div>
);
