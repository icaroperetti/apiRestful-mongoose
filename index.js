const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

const personRoutes = require("./routes/personRoutes");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//API Routes

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const databaseurl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wuenn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
mongoose
  .connect(databaseurl)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  })
  .catch((err) => console.log(err));
