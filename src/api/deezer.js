export const fetchDeezerTracks = async () => {
  try {
    const queries = [
      "drake",
      "arijit singh",
      "weeknd",
      "taylor swift",
      "eminem",
      "kanye west",
      "shreya ghoshal",
      "ed sheeran",
      "bad bunny",
      "dua lipa",
    ];

    
    const promises = queries.map((q) =>
      fetch(
        `https://deezerdevs-deezer.p.rapidapi.com/search?q=${q}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "abbd5606f0msh12937a2a8d7c8e0p1007adjsncdbd39cc52c2",
            "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
          },
        }
      ).then((res) => res.json())
    );

    const results = await Promise.all(promises);

    
    let allTracks = results.flatMap((r) => r.data);

    
    allTracks = allTracks.sort(() => 0.5 - Math.random());


    const seen = new Set();

    const finalTracks = allTracks.filter((track) => {
      if (!track.preview) return false;

      const key = track.title + track.artist.name;

      if (seen.has(key)) return false;

      seen.add(key);
      return true;
    });

    return finalTracks.slice(0, 12).map((track) => ({
      title: track.title,
      artist: track.artist.name,
      image: track.album.cover_big,
      preview: track.preview,
    }));
  } catch (err) {
    console.error("Deezer error:", err);
    return [];
  }
};