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
  const {
    rows: [playlistTrack],
  } = await db.query(SQL, [playlistId, trackId]);
  return playlistTrack;
}

export async function getTracksByPlaylist(playlistId) {
  const SQL = `
    SELECT tracks.*
    FROM tracks
    JOIN playlists_tracks
      ON playlists_tracks.playlist_id = $1
      AND playlists_tracks.track_id = tracks.id
  `;
  const { rows: tracks } = await db.query(SQL, [playlistId]);
  return tracks;
}
