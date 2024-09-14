import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { Db, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import recipesRoute from './routes/recipes-routes';

dotenv.config();

const app = express();

const port: string | number = process.env.PORT || 3001;
const uri: string = process.env.MONGODB_URI!;
const dbName: string = process.env.DB_NAME!;

const client: MongoClient = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

let db: Db; // The database connection will be stored here

async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db(dbName);
        console.log("Connected to MongoDB");

        const collectionInfo = await db.listCollections({ name: "recipes" }).next();
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

app.use((req: Request, res: Response, next: NextFunction) => {
    req['db'] = db; // Attach the database instance to the req object
    next();
});

app.use("/api/recipes", recipesRoute);

app.get("/", (req: Request, res: Response) => {
    res.send("Home");
});

app.listen(port, () => {
    console.log(`Server up and running at http://localhost:${port}`);
});

function gracefulShutdown() {
    if (client) {
        client.close(false).then(() => {
            console.log("MongoDB connection closed.");
            process.exit(0);
        }).catch((err) => {
            console.error("Error closing MongoDB connection:", err);
            process.exit(1);
        });
    }
}

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
