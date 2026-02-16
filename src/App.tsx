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
import { useMembers } from "./hooks/useMembers";


const App = () => {
  const [view, setView] = useState("home");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const {members, loading} = useMembers();

  const handleLogout = () => {
    setUser(null);
    setView("home");
  };


  const renderContent = () => {
    switch (view) {
      case "home":
        return (
          <HomeView
            members={members}
            onExplore={() => setView("directory")}
            onSelectMember={(member) => {
              setSelectedMember(member);
              setView("profile");
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
              setView("profile");
            }}
          />
        );

      case "about":
        console.log("About view active");
        return <AboutView />;
      case "profile":
        return selectedMember ? (
          <ProfileView
            member={selectedMember}
            onBack={() => setView("directory")}
          />
        ) : null;

      case "login":
        return <LoginView onLogin={setUser} />;

      case "dashboard":
        return user ? (
          <DashboardView user={user} onEdit={() => setView("edit-profile")} />
        ) : (
          <LoginView onLogin={setUser} />
        );

      case "edit-profile":
        return (
          <EditProfileView user={user} onBack={() => setView("dashboard")} />
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar
        activeView={view}
        setView={setView}
        user={user}
        onLogout={handleLogout}
      />
      <main>{renderContent()}</main>
      <Footer setView={setView} />
    </>
  );
};

export default App;
