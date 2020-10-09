const express = require('express')
const routes = express.Router()

const teachers = require('./teachers')
const students = require('./students')

routes.use('/teachers', teachers)
routes.use('/students', students)

routes.get('/', (req, res) => {
    return res.redirect('teachers')
})

module.exports = routes
