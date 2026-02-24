import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from "#db/queries/playlists";
import {
  addTrackToPlaylist,
  getTracksByPlaylist,
} from "#db/queries/playlists_tracks";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing.");

  const { name, description } = req.body;
  if (!name || !description)
    return res.status(400).send("Request body is missing required fields.");

  const playlist = await createPlaylist({ name, description });
  res.status(201).send(playlist);
});

router.param("id", async (req, res, next) => {
  const { id } = req.params;
  if (Number.isNaN(+id))
    return res.status(400).send("Playlist id must be a number.");

  const playlist = await getPlaylist(id);
  if (!playlist) return res.status(404).send("Playlist not found.");

  req.playlist = playlist;
  next();
});

router.get("/:id", async (req, res) => {
  res.send(req.playlist);
});

router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylist(req.playlist.id);
  res.send(tracks);
});

router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body is missing.");

  const { trackId } = req.body;
  if (!trackId)
    return res.status(400).send("Request body is missing required fields.");

  if (Number.isNaN(+trackId))
    return res.status(400).send("Track id must be a number.");

  try {
    const track = await addTrackToPlaylist(req.playlist.id, trackId);
    res.status(201).send(track);
  } catch (err) {
    if (err.code === "23503")
      return res.status(400).send("Track does not exist.");

    if (err.code === "23505")
      return res.status(400).send("Playlist track already exists.");

    console.error(err);
  }
});
