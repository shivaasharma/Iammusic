import { useSelector, useDispatch } from "react-redux";
import { selectPlaylist, removeFromPlaylist, setTrack } from "../store/playerSlice";
import { Trash2, Play } from "lucide-react";

function Library() {
  const playlist = useSelector(selectPlaylist);
  const dispatch = useDispatch();

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Playlist</h1>

      {playlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
          <p className="text-lg">No songs added yet</p>
          <p className="text-sm mt-2 opacity-60">
            Add songs from Home to see them here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {playlist.map((track, i) => (
            <div
              key={i}
              className="group bg-[#181818] p-4 rounded-xl flex items-center gap-4 
              hover:bg-[#222] transition-all duration-300 hover:scale-[1.02]
              hover:shadow-[0_0_25px_rgba(255,51,102,0.2)]"
            >
              <div className="relative">
                <img
                  src={track.image}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                {/* Play */}
                <button
                  onClick={() => dispatch(setTrack(i))}
                  className="absolute inset-0 flex items-center justify-center 
                  opacity-0 group-hover:opacity-100 transition"
                >
                  <div className="bg-[#FF3964] p-2 rounded-full">
                    <Play size={14} fill="black" />
                  </div>
                </button>
              </div>

              <div className="flex-1">
                <p className="text-sm font-semibold truncate">
                  {track.title}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {track.artist}
                </p>
              </div>

              {/* Remove */}
              <button
                onClick={() => dispatch(removeFromPlaylist(track.title))}
                className="opacity-0 group-hover:opacity-100 transition text-red-400 hover:scale-110"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;