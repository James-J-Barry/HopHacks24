const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
const recipesRoute = require("./routes/recipes-routes");

dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db; // The database connection will be stored here

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");

        const collectionInfo = await db
            .listCollections({ name: "recipes" })
            .next();
        if (!collectionInfo) {
            await db.createCollection("recipes");
            console.log("Collection recipes created!");
        }
    } catch (err) {
        console.error(err);
    }
}

connectToDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
    req.app.locals.db = db; // Attach the database instance to app.locals
    next();
});

app.use("/api/recipes", recipesRoute);

app.get("/", (req, res) => {
    res.send("Home");
});

app.listen(port, () => {
    console.log(`Server up and running at http://localhost:${port}`);
});

function gracefulShutdown() {
    if (client) {
        client
            .close(false)
            .then(() => {
                console.log("MongoDB connection closed.");
                process.exit(0);
            })
            .catch((err) => {
                console.error("Error closing MongoDB connection:", err);
                process.exit(1);
            });
    }
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
