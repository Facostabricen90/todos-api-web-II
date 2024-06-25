const express = require('express')
const todosFilesRouter = require('./todos.api.files.router')
const todosApiRouter = require('./todos.api.router')
const todosRouter = require('./todos.router')

function routerTodos(app){
    const router = express.Router()
    app.use('/', router) 
    router.use('/todospanel', todosRouter)
    router.use('/api/v1/files/todos', todosFilesRouter)
    router.use('/api/v1/todos', todosApiRouter)
}

module.exports = routerTodos

/* const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const todosRouter = require("./todos.api.router");

// Configurar el motor de vistas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use("/", todosRouter);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); */