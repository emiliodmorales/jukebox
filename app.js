import express from "express";
const app = express();
export default app;

import tracksRouter from "./api/tracks.js";
import playlistsRouter from "./api/playlists.js";

app.use(express.json());

app.use("/tracks", tracksRouter);

app.use("/playlists", playlistsRouter);

app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  // Unique constraint violation
  if (err.code === "23505") {
    return res.status(400).send(err.detail);
  }

  // Invalid input syntax for type integer
  if (err.code === "22P02") {
    return res.status(400).send(err.message);
  }

  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});
