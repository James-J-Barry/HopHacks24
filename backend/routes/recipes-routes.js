const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();
const collectionName = "recipez";

// Create a new document
router.post("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const collection = db.collection(collectionName);
        const result = await collection.insertOne(req.body);
        res.status(201).json({
            message: `${collectionName.slice(0, -1)} created successfully`,
            [collectionName.slice(0, -1)]: result,
            _id: result.insertedId,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all documents
router.get("/", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.status(200).json(documents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single document by ID
router.get("/:id", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const collection = db.collection(collectionName);
        const document = await collection.findOne({
            _id: new ObjectId(req.params.id),
        });
        if (document) {
            res.status(200).json(document);
        } else {
            res.status(404).json({
                error: `${collectionName.slice(0, -1)} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a document by ID
router.put("/:id", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const collection = db.collection(collectionName);
        const { _id, ...updateData } = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updateData }
        );
        if (result.matchedCount > 0) {
            res.status(200).json({
                message: `${collectionName.slice(0, -1)} updated successfully`,
                result,
            });
        } else {
            res.status(404).json({
                error: `${collectionName.slice(0, -1)} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a document by ID
router.delete("/:id", async (req, res) => {
    const db = req.app.locals.db;
    try {
        const collection = db.collection(collectionName);
        const result = await collection.deleteOne({
            _id: new ObjectId(req.params.id),
        });
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: `${collectionName.slice(0, -1)} deleted successfully`,
            });
        } else {
            res.status(404).json({
                error: `${collectionName.slice(0, -1)} not found`,
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
