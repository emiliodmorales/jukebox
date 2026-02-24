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
  if (Number.isNaN(+id))
    return res.status(400).send("Track id must be a number.");

  const track = await getTrack(id);
  if (!track) return res.status(404).send("Track not found.");

  res.send(track);
});
