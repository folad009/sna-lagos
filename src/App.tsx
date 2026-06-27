import { useState } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomeView from "./views/HomeView";
import DirectoryView from "./views/DirectoryView";
import ProfileView from "./views/ProfileView";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
import EditProfileView from "./views/EditProfile";
import { User, Member } from "./types";
import AboutView from "./views/AboutView";
import ContactView from "./views/ContactView";
import GalleryView from "./views/GalleryView";
import NewsView from "./views/NewsView";
import { useMembers } from "./hooks/useMembers";


const App = () => {
  const [view, setView] = useState("home");
  const [aboutMountKey, setAboutMountKey] = useState(0);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {members, loading} = useMembers();

  const navigate = (next: string) => {
    if (next === "about" && view !== "about") {
      setAboutMountKey((k) => k + 1);
    }
    setView(next);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("home");
  };


  const renderContent = () => {
    switch (view) {
      case "home":
        return (
          <HomeView
            members={members}
            onExplore={() => navigate("directory")}
            onSelectMember={(member) => {
              setSelectedMember(member);
              navigate("profile");
              window.scrollTo(0, 0);
            }}
          />
        );

      case "directory":
        if (loading) {
          return (
            <div className="py-40 text-center">
              <p className="text-gray-400 font-bold">Loading members of SNA Lagos Chapter</p>
            </div>
          )
        }
        return (
          <DirectoryView
            members={members}
            onSelectMember={(m) => {
              setSelectedMember(m);
              navigate("profile");
            }}
          />
        );

      case "about":
        return <AboutView key={aboutMountKey} />;
      case "gallery":
        return <GalleryView />;
      case "news":
        return <NewsView />;
      case "contact":
        return <ContactView />;
      case "profile":
        return selectedMember ? (
          <ProfileView
            member={selectedMember}
            onBack={() => navigate("directory")}
          />
        ) : null;

      case "login":
        return <LoginView onLogin={setUser} />;

      case "dashboard":
        return user ? (
          <DashboardView user={user} onEdit={() => navigate("edit-profile")} />
        ) : (
          <LoginView onLogin={setUser} />
        );

      case "edit-profile":
        return (
          <EditProfileView user={user} onBack={() => navigate("dashboard")} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar
        activeView={view}
        setView={navigate}
        user={user}
        onLogout={handleLogout}
      />
      <main>{renderContent()}</main>
      <Footer setView={navigate} />
    </>
  );
};

export default App;
