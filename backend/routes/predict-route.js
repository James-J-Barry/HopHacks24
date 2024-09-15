const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { predictImage } = require("../services/predict-service");

router.post("/predict", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        const prediction = await predictImage(req.file.buffer);
        res.json({ prediction });
    } catch (error) {
        console.error("Error making prediction:", error);
        res.status(500).send("Error making prediction");
    }
});

module.exports = router;
