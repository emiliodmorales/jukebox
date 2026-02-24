import db from "#db/client";

/**
 * Creates a new record in the playlists table
 * @param {Object} playlist - The new playlist to create
 * @param {string} playlist.name - The name of the new playlist
 * @param {string} playlist.description - The description of the new playlist
 * @returns the newly created playlist
 */
export async function createPlaylist({ name, description }) {
  const SQL = `
    INSERT INTO playlists (name, description)
    VALUES ($1, $2)
    RETURNING *
  `;
  try {
    const {
      rows: [playlist],
    } = await db.query(SQL, [name, description]);
    return playlist;
  } catch (err) {
    console.log(err);
  }
}
