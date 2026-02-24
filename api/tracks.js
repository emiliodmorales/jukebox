import { getTrack, getTracks } from "#db/queries/tracks";
import { Router } from "express";
const router = Router();
export default router;

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const track = await getTrack(id);
  if (!track) return res.status(404).send("Track not found.");

  res.send(track);
});
