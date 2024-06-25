const router = require("express").Router();
const Todo = require("../src/models/todoModel");

// Index - get visual interface
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.render("index", { todos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Store - create item
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await Todo.create({ title, completed: completed === 'on' });
    res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Show - item by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.json(todo);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update - item
router.post("/modify", async (req, res) => {
  try {
    const { id, title, completed } = req.body;
    const updatedTodo = await Todo.update({ title, completed: completed === 'on' }, { where: { id } });
    if (updatedTodo[0] === 0) {
      return res.status(404).send("Todo not found");
    }
    res.redirect("/todospanel");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete - item
router.post("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    await todo.destroy();
    res.redirect("/todospanel");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;