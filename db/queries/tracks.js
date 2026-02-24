import db from "#db/client";

/**
 * Create a new record in the tracks table
 * @param {Object} track - The new track to create
 * @param {string} track.name - The name of the new track
 * @param {integer} track.durationMs - The duration of the new track
 * @returns the newly created track
 */
export async function createTrack({ name, durationMs }) {
  const SQL = `
    INSERT INTO tracks (name, duration_ms)
    VALUES ($1, $2)
    RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(SQL, [name, durationMs]);
  return track;
}

/** @returns an array of all tracks */
export async function getTracks() {
  const SQL = `SELECT * FROM tracks`;
  const { rows: tracks } = await db.query(SQL);
  return tracks;
}

/** @returns the track specified by id */
export async function getTrack(id) {
  const SQL = `
    SELECT * FROM tracks
    WHERE id = $1
  `;
  const {
    rows: [track],
  } = await db.query(SQL, [id]);
  return track;
}
