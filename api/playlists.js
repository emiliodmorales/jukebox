import {
  createPlaylist,
  getPlaylist,
  getPlaylists,
} from "#db/queries/playlists";
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
