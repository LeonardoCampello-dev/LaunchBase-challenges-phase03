const Teacher = require('../models/Teacher')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        Teacher.all((teachers) => {
            for (let teacher of teachers) {
                teacher.subjects_taught = teacher.subjects_taught.split(",")
            }
            
            return res.render("teachers/index", { teachers })
        })
    },
    create(req, res) {
        return res.render("teachers/create")       
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
        }
    
        Teacher.create(req.body, (teacher) => {
            return res.redirect(`/teachers/${teacher.id}`)
        })   
    },
    show(req, res) {
        Teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send("Instructor not found!")

            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")

            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })
        })   
    },
    edit(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
        }
    
        return
    },
    update(req, res) {
        return
    },
    delete(req, res) {
        return
    }
}
