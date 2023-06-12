const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes.js");
app.use(cors());
app.use(express.json());

const port = 5000;

mongoose
  .connect(
    "mongodb+srv://aaromalanil001:Upscarml123@cluster1.akcuv97.mongodb.net/woxro"
  )
  .then(() => console.log("Db connected"))
  .catch((err) => console.log("error in db", err));

app.use("/", userRoutes);
app.listen(port, () => {
  console.log(`Listening on port 5000`);
});
