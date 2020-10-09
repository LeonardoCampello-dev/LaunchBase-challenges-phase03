const express = require('express')
const routes = express.Router()

const TeachersController = require('../app/controllers/TeachersController')

routes.get('/', TeachersController.index)
routes.get('/create', TeachersController.create)
routes.get('/:id', TeachersController.show)
routes.get('/:id/edit', TeachersController.edit)
routes.post('/', TeachersController.post)
routes.put('/', TeachersController.update)
routes.delete('/', TeachersController.delete)

module.exports = routes