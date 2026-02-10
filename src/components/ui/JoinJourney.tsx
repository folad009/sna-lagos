import { SectionHeading } from "./SectionHeading";

export const JoinJourney = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Your Creative Journey"
          subtitle="How to become a professional member of Nigeria's premier artistic society."
          centered
        />
        <div className="grid md:grid-cols-3 gap-16 relative mt-20">
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-emerald-100 -z-10"></div>
          {[
            {
              step: "01",
              title: "Submit Portfolio",
              desc: "Share your professional body of work and CV with the Lagos Secretariat for review.",
            },
            {
              step: "02",
              title: "Review Board",
              desc: "Our executive council of masters evaluates applications quarterly for technical mastery.",
            },
            {
              step: "03",
              title: "Full Membership",
              desc: "Gain voting rights, exhibition priority, and access to legal advocacy programs.",
            },
          ].map((item, i) => (
            <div key={i} className="text-center relative">
              <div className="w-24 h-24 bg-white border-4 border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-3xl font-bold text-emerald-800 font-serif">
                {item.step}
              </div>
              <h4 className="text-2xl font-bold mb-4 font-serif">
                {item.title}
              </h4>
              <p className="text-gray-500 leading-relaxed max-w-xs mx-auto text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
