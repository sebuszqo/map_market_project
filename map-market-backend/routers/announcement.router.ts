import {Router} from "express";
import {AnnounceRecord} from "../records/announce.record";

export const announcementRouter = Router();

announcementRouter
    .get("/search/:name?", async (req, res) => {
        const announcement = await AnnounceRecord.findAll(req.params.name ?? "");
        res.json(announcement);
    })

    .get("/:id", async (req, res) => {
        const announcement = await AnnounceRecord.findOne(req.params.id);
        res.json(announcement);
    })

    .post("/", async (req, res) => {
        const announcement = new AnnounceRecord(req.body);
        await announcement.insert();
        res.json(announcement);
    });
