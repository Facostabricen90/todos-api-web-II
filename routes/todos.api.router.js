const router = require("express").Router();
const Todo = require("../src/models/todoModel");

// Index - get visual interface
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Store - create item
router.post("/", async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await Todo.create({ title, completed });
    res.status(201).json(newTodo);
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
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.update({ title, completed }, { where: { id } });
    if (updatedTodo[0] === 0) {
      return res.status(404).send("Todo not found");
    }
    res.send("Todo updated");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete - item
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCount = await Todo.destroy({ where: { id } });
  
      if (deletedCount === 0) {
        return res.status(404).send("Todo not found");
      }
      res.send("Todo deleted");
    } catch (error) {
      res.status(500).send(error.message);
    }
});

module.exports = router;