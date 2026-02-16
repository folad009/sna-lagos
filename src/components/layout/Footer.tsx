import { MapPin, Mail, Globe, Instagram, Twitter } from "lucide-react";

const Footer = ({ setView }: any) => {
  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-16">
          <div className="col-span-2">
            <p className="text-gray-400 max-w-sm text-lg leading-relaxed mb-10">
              Empowering Nigerian artists through professional connection, legal
              advocacy, and global exhibitions since 1963.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://instagram.com/snalagos"
                target="_blank"
                rel="noreferrer"
                className="text-[#ffc293] hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://twitter.com/snalagos"
                target="_blank"
                rel="noreferrer"
                className="text-[#ffc293] hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://snalagos.ng"
                target="_blank"
                rel="noreferrer"
                className="text-[#ffc293] hover:text-white transition-all transform hover:-translate-y-1"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-8 font-serif text-lg">Ecosystem</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>
                <button
                  onClick={() => setView("directory")}
                  className="hover:text-white transition-colors"
                >
                  Artist Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setView("about")}
                  className="hover:text-white transition-colors"
                >
                  Our Heritage
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Membership Guide
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Juried Exhibitions
                </button>
              </li>
              <li>
                <button className="hover:text-white transition-colors">
                  Legal Advocacy
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-8 font-serif text-lg">Contact Us</h4>
            <ul className="space-y-6 text-gray-400 font-medium">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-[#ffc293] shrink-0" />
                <span>National Theatre Complex, Iganmu, Lagos State.</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-[#ffc293] shrink-0" />
                <span>info@snalagos.ng</span>
              </li>
              <li className="flex items-center">
                <Globe size={20} className="mr-3 text-[#ffc293] shrink-0" />
                <span>www.snalagos.ng</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span>
            © {new Date().getFullYear()} Society of Nigerian Artists (Lagos
            Chapter).
          </span>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Membership
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
