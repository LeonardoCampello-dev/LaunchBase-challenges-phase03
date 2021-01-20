const express = require("express");
const routes = express.Router();

const StudentsController = require("../app/controllers/StudentsController");

routes.get("/", StudentsController.index);
routes.get("/create", StudentsController.create);
routes.get("/:id", StudentsController.show);
routes.get("/:id/edit", StudentsController.edit);
routes.post("/", StudentsController.post);
routes.put("/", StudentsController.update);
routes.delete("/", StudentsController.delete);

module.exports = routes;
