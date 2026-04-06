import { useEffect, useState, type FormEvent } from "react";
import {
  MapPin,
  Mail,
  Globe,
  Phone,
  User,
  Send,
  Check,
  MessageSquare,
} from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useMetaTags } from "../hooks/useMetaTags";

const ORG = "Society of Nigerian Artists";
const CHAPTER = "Lagos State Chapter";
const ADDRESS_LINES = [
  "Suite 2, Aina Onabolu Building",
  "National Theatre, Iganmu, Lagos",
];
const EMAIL = "societyofnigerianartists@gmail.com";
const WEBSITE = "https://www.snalagos.com";
const WEBSITE_DISPLAY = "www.snalagos.com";
const PHONES = [
  "+2348028344206",
  "+2348023921891",
  "+2348052063771",
];

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=National+Theatre+Iganmu+Lagos";

const ENQUIRY_TYPES = [
  "General enquiry",
  "Membership",
  "Exhibitions & events",
  "Press & media",
  "Other",
] as const;

const ContactView = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [enquiryType, setEnquiryType] =
    useState<(typeof ENQUIRY_TYPES)[number]>("General enquiry");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle"
  );

  useMetaTags(
    `Contact — ${CHAPTER} | ${ORG}`,
    `${ORG} ${CHAPTER}. ${ADDRESS_LINES.join(", ")}. Email: ${EMAIL}.`
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    const bodyLines = [
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      phone.trim() ? `Phone: ${phone.trim()}` : null,
      `Enquiry: ${enquiryType}`,
      "",
      message.trim(),
    ].filter(Boolean) as string[];
    const subject = `[SNA Lagos] ${enquiryType}`;
    const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

    window.setTimeout(() => {
      window.location.href = mailto;
      setFormStatus("sent");
    }, 350);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3.5 text-gray-900 shadow-sm outline-none transition-all placeholder:text-gray-400 focus:border-[#bb6e31]/40 focus:ring-2 focus:ring-[#bb6e31]/25";

  return (
    <div className="pt-32 pb-24 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Contact Us"
          subtitle="Reach the Lagos State Chapter secretariat for membership, exhibitions, and general enquiries."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="space-y-10">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#bb6e31] mb-2">
                {ORG}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">
                {CHAPTER}
              </h3>
            </div>

            <ul className="space-y-8">
              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#bb6e31]/10 text-[#bb6e31]">
                  <MapPin size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Address</p>
                  {ADDRESS_LINES.map((line) => (
                    <p key={line} className="text-gray-600 leading-relaxed">
                      {line}
                    </p>
                  ))}
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-3 text-sm font-semibold text-[#bb6e31] hover:text-[#8c3e02] underline underline-offset-4"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#bb6e31]/10 text-[#bb6e31]">
                  <Mail size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Email</p>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="text-gray-600 hover:text-[#bb6e31] transition-colors break-all"
                  >
                    {EMAIL}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#bb6e31]/10 text-[#bb6e31]">
                  <Globe size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-gray-900 mb-1">Website</p>
                  <a
                    href={WEBSITE}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-[#bb6e31] transition-colors"
                  >
                    {WEBSITE_DISPLAY}
                  </a>
                </div>
              </li>

              <li className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#bb6e31]/10 text-[#bb6e31]">
                  <Phone size={22} aria-hidden />
                </span>
                <div>
                  <p className="font-bold text-gray-900 mb-2">Telephone</p>
                  <ul className="space-y-2">
                    {PHONES.map((num) => (
                      <li key={num}>
                        <a
                          href={`tel:${num}`}
                          className="text-gray-600 hover:text-[#bb6e31] transition-colors font-medium"
                        >
                          Tel: {num}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[2.5rem] border border-gray-100 bg-gradient-to-br from-emerald-50/80 to-white p-10 md:p-12 shadow-lg">
            <h4 className="text-xl font-bold font-serif text-gray-900 mb-4">
              Visiting the chapter office
            </h4>
            <p className="text-gray-600 leading-relaxed mb-6">
              We are located within the National Theatre complex in Iganmu. For
              appointments or event enquiries, email or call ahead when possible
              so we can direct you to the right committee.
            </p>
            <div className="aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200 shadow-inner">
              <iframe
                title="Map — National Theatre, Iganmu, Lagos"
                src="https://maps.google.com/maps?q=Suite+2+Aina+Onabolu+Building+National+Theatre+Iganmu+Lagos&hl=en&z=16&output=embed"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="text-xs text-gray-400 mt-4">
              For turn-by-turn directions, use “Open in Google Maps” beside the
              address above.
            </p>
          </div>
        </div>

        <section
          id="contact-form"
          className="mt-20 md:mt-28 max-w-3xl mx-auto"
          aria-labelledby="contact-form-heading"
        >
          <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 md:p-12 shadow-xl shadow-gray-200/50">
            <h3
              id="contact-form-heading"
              className="text-2xl md:text-3xl font-bold font-serif text-gray-900 mb-2"
            >
              Send us a message
            </h3>
            <p className="text-gray-500 mb-10 leading-relaxed">
              Complete the form and we will open your email app with your
              message addressed to the chapter secretariat. You can edit before
              sending.
            </p>

            {formStatus === "sent" ? (
              <div className="py-10 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <Check size={40} strokeWidth={2.5} />
                </div>
                <h4 className="text-xl font-bold font-serif text-gray-900 mb-2">
                  Email ready to send
                </h4>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                  If your mail app did not open, email us directly at{" "}
                  <a
                    href={`mailto:${EMAIL}`}
                    className="font-semibold text-[#bb6e31] hover:underline"
                  >
                    {EMAIL}
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFormStatus("idle");
                    setName("");
                    setEmail("");
                    setPhone("");
                    setEnquiryType("General enquiry");
                    setMessage("");
                  }}
                  className="rounded-2xl bg-[#bb6e31] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#8c3e02] active:scale-[0.98]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-name"
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Your name
                    </label>
                    <div className="relative">
                      <User
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={16}
                        aria-hidden
                      />
                      <input
                        id="contact-name"
                        required
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-email"
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={16}
                        aria-hidden
                      />
                      <input
                        id="contact-email"
                        required
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-phone"
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Phone{" "}
                      <span className="font-normal normal-case text-gray-400">
                        (optional)
                      </span>
                    </label>
                    <div className="relative">
                      <Phone
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                        size={16}
                        aria-hidden
                      />
                      <input
                        id="contact-phone"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 …"
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="contact-enquiry"
                      className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700"
                    >
                      Enquiry type
                    </label>
                    <select
                      id="contact-enquiry"
                      value={enquiryType}
                      onChange={(e) =>
                        setEnquiryType(
                          e.target.value as (typeof ENQUIRY_TYPES)[number]
                        )
                      }
                      className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                      }}
                    >
                      {ENQUIRY_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="ml-1 text-xs font-bold uppercase tracking-wider text-gray-700"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      className="pointer-events-none absolute left-4 top-4 text-gray-300"
                      size={16}
                      aria-hidden
                    />
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can we help?"
                      className={`${inputClass} resize-none pl-11`}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#bb6e31] py-4 text-base font-bold text-white shadow-xl transition hover:bg-[#8c3e02] disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
                >
                  {formStatus === "sending" ? (
                    <span className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  ) : (
                    <>
                      <Send size={18} />
                      Open email app to send
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactView;
