import cors from 'cors';
import { config } from 'dotenv';
config();
import express, { json } from 'express';
import ingestController from './controllers/Ingest.controller.ts';
import itemsController from './controllers/Items.controller.ts';
import queryController from './controllers/Query.controller.ts';

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  })
);
app.use(json());

const main = () => {
  const PORT = process.env.PORT || 4000;

  app.post("/ingest", ingestController);
  app.get("/items", itemsController);
  app.post("/query", queryController);

  app.listen(PORT, () => console.log(`Started listening on port ${PORT}`))
}

main();