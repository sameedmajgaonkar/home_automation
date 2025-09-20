import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import usagelogs from "./routes/usagelogs.js";
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/usagelogs", usagelogs);
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to MongoDB"));

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
