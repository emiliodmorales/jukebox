import db from "#db/client";
import { createPlaylist } from "./queries/playlists.js";
import { addTrackToPlaylist } from "./queries/playlists_tracks.js";
import { createTrack } from "./queries/tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i <= 10; i++) {
    await createPlaylist({
      name: "Playlist " + i,
      description: "blah blah blah",
    });
  }

  for (let i = 1; i <= 20; i++) {
    const track = await createTrack({
      name: "Track " + i,
      durationMs: Math.floor(Math.random() * 120000),
    });

    const playlistId = Math.floor(Math.random() * 10) + 1;
    await addTrackToPlaylist(playlistId, track.id);
  }
}
