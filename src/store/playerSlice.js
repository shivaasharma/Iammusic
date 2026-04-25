import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDeezerTracks } from "../api/deezer";

export const loadTracks = createAsyncThunk(
  "player/loadTracks",
  async () => {
    return await fetchDeezerTracks();
  }
);

const initialState = {
  tracks: [],
  currentIndex: 0,
  isPlaying: false,
  progress: 0,
  status: "idle",

  // 🔥 NEW
  playlist: [],
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setTrack: (state, action) => {
      state.currentIndex = action.payload;
      state.isPlaying = true;
      state.progress = 0;
    },

    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    nextTrack: (state) => {
      if (state.tracks.length === 0) return;
      state.currentIndex =
        (state.currentIndex + 1) % state.tracks.length;
      state.progress = 0;
    },

    prevTrack: (state) => {
      if (state.tracks.length === 0) return;
      state.currentIndex =
        (state.currentIndex - 1 + state.tracks.length) %
        state.tracks.length;
      state.progress = 0;
    },

    setProgress: (state, action) => {
      state.progress = action.payload;
    },

    // 🔥 CREATE
    addToPlaylist: (state, action) => {
      const exists = state.playlist.find(
        (t) => t.title === action.payload.title
      );
      if (!exists) {
        state.playlist.push(action.payload);
      }
    },

    // 🔥 DELETE
    removeFromPlaylist: (state, action) => {
      state.playlist = state.playlist.filter(
        (t) => t.title !== action.payload
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadTracks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadTracks.fulfilled, (state, action) => {
        state.status = "success";
        state.tracks = action.payload;
      })
      .addCase(loadTracks.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  setTrack,
  togglePlay,
  nextTrack,
  prevTrack,
  setProgress,
  addToPlaylist,
  removeFromPlaylist,
} = playerSlice.actions;

export const selectTracks = (state) => state.player.tracks;
export const selectPlaylist = (state) => state.player.playlist;

export const selectCurrentTrack = (state) =>
  state.player.tracks[state.player.currentIndex];

export const selectIsPlaying = (state) =>
  state.player.isPlaying;

export const selectProgress = (state) =>
  state.player.progress;

export default playerSlice.reducer;