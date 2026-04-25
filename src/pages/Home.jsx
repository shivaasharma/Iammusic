import { useDispatch, useSelector } from "react-redux";
import { setTrack, loadTracks, selectTracks, addToPlaylist } from "../store/playerSlice";
import { Play } from "lucide-react";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const tracks = useSelector(selectTracks);
  const status = useSelector((state) => state.player.status);

  useEffect(() => {
    dispatch(loadTracks());
  }, [dispatch]);

  return (
    <div className="flex-1 p-6 text-white overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 tracking-tight text-white/90">
  Music
</h1>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {status === "loading"
          ? [...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#181818] p-4 rounded-2xl animate-pulse"
              >
                <div className="w-full h-40 bg-[#2a2a2a] rounded-xl mb-3"></div>
                <div className="h-4 bg-[#2a2a2a] rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-[#2a2a2a] rounded w-1/2"></div>
              </div>
            ))
          : tracks.map((track, i) => (
              <div
                key={i}
                onClick={() => dispatch(setTrack(i))}
                className="group bg-[#181818] p-4 rounded-2xl cursor-pointer 
                transition-all duration-300 ease-out
                hover:bg-[#222] hover:scale-[1.05] 
                hover:shadow-[0_0_35px_rgba(255,51,102,0.25)]"
              >
                <div className="relative overflow-hidden rounded-xl">
                  
                  {/* ➕ ADD BUTTON (NEW) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(addToPlaylist(track));
                    }}
                    className="absolute top-3 right-3 bg-white/10 backdrop-blur p-2 rounded-full 
                    opacity-0 group-hover:opacity-100 transition hover:scale-110"
                  >
                    +
                  </button>

                  {/* Album */}
                  <img
                    src={track.image}
                    alt="cover"
                    className="w-full h-40 object-cover mb-3 
                    transition-all duration-500 
                    group-hover:scale-105 group-hover:brightness-110"
                  />

                  {/* Play button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setTrack(i));
                    }}
                    className="absolute bottom-3 right-3 bg-[#FF3964] text-black p-3 rounded-full 
                    shadow-lg opacity-0 group-hover:opacity-100 
                    transform translate-y-4 group-hover:translate-y-0 
                    transition-all duration-300 ease-out
                    hover:scale-110 hover:shadow-[0_0_20px_#FF3964]"
                  >
                    <Play size={18} fill="black" />
                  </button>
                </div>

                <p className="text-sm font-semibold tracking-tight truncate">
                  {track.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {track.artist}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Home;