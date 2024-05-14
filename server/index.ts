import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import path from "path";
import cors from "cors";
import itemRoute from "./routes/items";
import listRoute from "./routes/lists";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use('/api/list', listRoute);
app.use('/api/item', itemRoute)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World !')
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});