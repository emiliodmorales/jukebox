import db from "#db/client";

/**
 * Add a track to a playlist by id
 * @param {integer} playlistId - the id of the playlist being added to
 * @param {integer} trackId - the id of the track to add
 * @returns the newly created playlists_tracks record
 */
export async function addTrackToPlaylist(playlistId, trackId) {
  const SQL = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  try {
    const {
      rows: [playlistTrack],
    } = await db.query(SQL, [playlistId, trackId]);
    return playlistTrack;
  } catch (err) {
    console.error(err);
  }
}
