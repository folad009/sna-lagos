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
            <div className="w-10 h-10 art-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight uppercase">
                SNA <span className="text-emerald-800">LAGOS</span>
              </span>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold -mt-1">
                Society of Nigerian Artists
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => setView("home")}
              className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === "home" ? "text-emerald-700 underline underline-offset-8" : "text-gray-600"}`}
            >
              Home
            </button>
            <button
              onClick={() => setView("directory")}
              className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === "directory" ? "text-emerald-700 underline underline-offset-8" : "text-gray-600"}`}
            >
              Directory
            </button>
            <button
              onClick={() => setView("about")}
              className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === "about" ? "text-emerald-700 underline underline-offset-8" : "text-gray-600"}`}
            >
              Mission
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setView("dashboard")}
                  className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-100 transition"
                >
                  <User size={16} />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  title="Logout"
                  className="text-gray-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setView("login")}
                className="bg-emerald-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-900 transition flex items-center space-x-2 shadow-md"
              >
                <LogIn size={16} />
                <span>Member Portal</span>
              </button>
            )}
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
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "home" ? "text-emerald-800" : "text-gray-700"}`}
          >
            Home
          </button>
          <button
            onClick={() => {
              setView("directory");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "directory" ? "text-emerald-800" : "text-gray-700"}`}
          >
            Directory
          </button>
          <button
            onClick={() => {
              setView("about");
              setIsMobileMenuOpen(false);
            }}
            className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === "about" ? "text-emerald-800" : "text-gray-700"}`}
          >
            Mission
          </button>
          <div className="pt-6 border-t border-gray-50">
            {user ? (
              <button
                onClick={() => {
                  setView("dashboard");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-emerald-50 text-emerald-800 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2"
              >
                <User size={18} />
                <span>Dashboard</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setView("login");
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg"
              >
                <LogIn size={18} />
                <span>Member Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
