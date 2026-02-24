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

/** @returns an array of all playlists */
export async function getPlaylists() {
  const SQL = `SELECT * FROM playlists`;
  try {
    const { rows: playlists } = await db.query(SQL);
    return playlists;
  } catch (err) {
    console.error(err);
  }
}

/** @returns the playlist specified by id */
export async function getPlaylist(id) {
  const SQL = `
    SELECT * FROM playlists
    WHERE id = $1
  `;
  try {
    const {
      rows: [playlist],
    } = await db.query(SQL, [id]);
    return playlist;
  } catch (err) {
    console.error(err);
  }
}
