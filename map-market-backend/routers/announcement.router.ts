import {Router} from "express";

export const announcementRouter = Router();

announcementRouter.get("/", async (req, res) => {
  res.json({
    ok: true,
  });
});
