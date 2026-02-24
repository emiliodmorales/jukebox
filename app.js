import express from "express";
const app = express();
export default app;

import tracksRouter from "./api/tracks.js";
import playlistsRouter from "./api/playlists.js";

app.use(express.json());

app.use("/tracks", tracksRouter);

app.use("/playlists", playlistsRouter);
