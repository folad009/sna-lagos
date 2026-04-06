import { useState } from "react";
import { User, LogIn, Menu, X, LogOut } from "lucide-react";

interface NavbarProps {
  activeView: string;
  setView: (view: any) => void;
  user: any;
  onLogout: () => void;
}

const Navbar = ({ activeView, setView, user, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => {
              setView("home");
              setIsMobileMenuOpen(false);
            }}
          >
            <img
              src="/assets/img/sna_Logo.webp"
              alt="SNA Lagos Logo"
              className="h-20 w-auto"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setView("home")}
              className={`text-sm font-medium hover:text-[#bb6e31] transition ${activeView === "home" ? "text-[#bb6e31] underline underline-offset-8" : "text-gray-600"}`}
            >
              Home
            </button>

            <button
              onClick={() => setView("about")}
              className={`text-sm font-medium hover:text-[#bb6e31] transition ${activeView === "about" ? "text-[#bb6e31] underline underline-offset-8" : "text-gray-600"}`}
            >
              About SNA Lagos Chapter
            </button>
            <button
              onClick={() => setView("directory")}
              className={`text-sm font-medium hover:text-[#bb6e31] transition ${activeView === "directory" ? "text-[#bb6e31] underline underline-offset-8" : "text-gray-600"}`}
            >
              Directory
            </button>
            <button
              onClick={() => setView("contact")}
              className={`text-sm font-medium hover:text-[#bb6e31] transition ${activeView === "contact" ? "text-[#bb6e31] underline underline-offset-8" : "text-gray-600"}`}
            >
              Contact
            </button>


          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-gray-600 p-2 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-8 px-6 flex flex-col space-y-4 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top">
          <button
            onClick={() => {
              setView("home");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "home" ? "text-[#bb6e31]" : "text-gray-700"}`}
          >
            Home
          </button>

          <button
            onClick={() => {
              setView("about");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "about" ? "text-[#bb6e31]" : "text-gray-700"}`}
          >
            About SNA Lagos Chapter
          </button>

          <button
            onClick={() => {
              setView("directory");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "directory" ? "text-[#bb6e31]" : "text-gray-700"}`}
          >
            Directory
          </button>

          <button
            onClick={() => {
              setView("contact");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "contact" ? "text-[#bb6e31]" : "text-gray-700"}`}
          >
            Contact us
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
