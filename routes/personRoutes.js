const router = require("express").Router();
const Person = require("../models/Person");

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name || !salary || !approved) {
    res.status(422).json({ error: "Missing params" });
  }

  const userExists = await Person.findOne({ name });

  if (userExists) {
    return res.status(422).json({ error: "Person already exists" });
  }

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

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const person = await Person.findOne({ _id: id });
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
