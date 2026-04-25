import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentTrack,
  selectIsPlaying,
  selectProgress,
  togglePlay,
  nextTrack,
  prevTrack,
  setProgress,
} from "../../store/playerSlice";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";

function Player() {
  const dispatch = useDispatch();
  const track = useSelector(selectCurrentTrack);
  const isPlaying = useSelector(selectIsPlaying);
  const progress = useSelector(selectProgress);

  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.7);

  // 🎵 Play / Pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (track?.preview) {
      audioRef.current.src = track.preview;
    }

    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  // 🎯 FIXED PROGRESS (REAL TIME)
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!audio.duration) return;

      const percent =
        (audio.currentTime / audio.duration) * 100;

      dispatch(setProgress(percent));
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () =>
      audio.removeEventListener("timeupdate", updateProgress);
  }, [dispatch]);

  // 🔊 Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  if (!track) return null;

  return (
    <div className="h-24 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center justify-between px-6">

      {/* AUDIO */}
      <audio ref={audioRef} />

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <img
          src={track.image}
          alt="cover"
          className="w-14 h-14 rounded-lg object-cover"
        />
        <div>
          <p className="font-semibold text-sm">{track.title}</p>
          <p className="text-xs text-gray-400">{track.artist}</p>

          {!track.preview && (
            <p className="text-[10px] text-red-400">
              No preview
            </p>
          )}
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col items-center gap-2 w-[40%]">
        <div className="flex items-center gap-6">
          <SkipBack
            onClick={() => dispatch(prevTrack())}
            className="cursor-pointer hover:scale-110 transition"
            size={18}
          />

          <button
            onClick={() => dispatch(togglePlay())}
            className="bg-white text-black p-3 rounded-full hover:scale-110 transition"
          >
            {isPlaying ? (
              <Pause size={18} fill="black" />
            ) : (
              <Play size={18} fill="black" />
            )}
          </button>

          <SkipForward
            onClick={() => dispatch(nextTrack())}
            className="cursor-pointer hover:scale-110 transition"
            size={18}
          />
        </div>

        {/* 🔥 SMOOTH + WAVE PROGRESS BAR */}
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative">
          
          {/* animated gradient glow */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#FF3964]/20 via-[#FF3964]/40 to-[#FF3964]/20 animate-pulse"
          />

          {/* actual progress */}
          <div
            className="h-full bg-[#FF3964] transition-[width] duration-150 ease-linear relative z-10"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        <Volume2 size={18} />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 accent-[#FF3964]"
        />
      </div>
    </div>
  );
}

export default Player;