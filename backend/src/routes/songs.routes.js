const express = require("express")

const router = express.Router();

const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const uploadFile = require("../services/storage.sevice")

router.post("/songs", upload.single("audio"), async (req, res) => {
    const responce = uploadFile(req.file);

    res.status(201).json({
        msg: "Song created successfully",
        responce: responce
    })
})


module.exports = router;