import express from "express";
import * as dotenv from "dotenv";
import routes from "./routes/userRouter";
import db from "./db/db";

dotenv.config();
const app = express();

app.use(express.json());

db.connect();

app.use(routes);

const port = process.env.PORT || 3300;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
