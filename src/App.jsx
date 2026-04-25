import Sidebar from "./components/Sidebar/Sidebar";
import Player from "./components/Player/Player";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { selectCurrentTrack } from "./store/playerSlice";
import Library from "./pages/Library";
import { useState } from "react";
import Splash from "./components/Splash"; // ✅ NEW

function App() {
  const track = useSelector(selectCurrentTrack);

  const [activePage, setActivePage] = useState("home");
  const [loading, setLoading] = useState(true); // ✅ NEW

  // ✅ SHOW SPLASH FIRST
  if (loading) {
    return <Splash onFinish={() => setLoading(false)} />;
  }

  return (
    <div className="relative h-screen text-white overflow-hidden flex flex-col bg-black">
      
      {/* 🎧 Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-5 scale-110"
        style={{
          backgroundImage: track?.image ? `url(${track.image})` : "none",
        }}
      />

      {/* 🌈 Tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,51,102,0.15),transparent_70%)]" />

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black" />

      {/* Layout */}
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar setActivePage={setActivePage} />

        <div className="flex-1 overflow-y-auto">
          {activePage === "home" && <Home />}
          {activePage === "library" && <Library />}
        </div>
      </div>

      {/* Player */}
      <Player />
    </div>
  );
}

export default App;