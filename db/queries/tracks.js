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
  try {
    const {
      rows: [track],
    } = await db.query(SQL, [name, durationMs]);
    return track;
  } catch (err) {
    console.error(err);
  }
}
