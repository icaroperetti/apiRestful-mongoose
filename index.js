const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv/config");

const Person = require("./models/Person");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//API Routes
app.post("/person", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    await Person.create(person);
    res.status(200).json({ message: "Person created" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

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
