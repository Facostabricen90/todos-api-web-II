const router = require("express").Router();
const Todo = require("../src/models/todoModel");

// Index
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.render("todos/index", { todos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Store
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await Todo.create({ title, completed });
    res.redirect("/todospanel");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;