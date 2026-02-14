const express = require("express")

const router = express.Router();

const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const uploadFile = require("../services/storage.sevice")
const songModel = require("../models/songs.model")

router.post("/songs", upload.single("audio"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const response = await uploadFile(req.file);

        let songs = await songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: req.file.url,
            mood: req.body.mood
        })

        res.status(201).json({
            msg: "Song created successfully",
            songs
        });
    }
    catch (err) {
        console.error("Upload Error:", err.message);
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;