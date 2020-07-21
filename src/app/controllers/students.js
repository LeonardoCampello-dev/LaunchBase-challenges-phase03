const Student = require('../models/Student')
const { date, grade } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        Student.all((students) => {
            for (let student of students) {
                student.school_year = grade(student.school_year)
            }

            return res.render("students/index", { students })
        })
    },
    create(req, res) {
        Student.teachersSelectOptions((options) => {
            return res.render("students/create", { teachersSelectOptions: options })
        })
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
        }

        Student.create(req.body, (student) => {
            return res.redirect(`/students/${student.id}`)
        })
    },
    show(req, res) {
        Student.find(req.params.id, (student) => {
            if (!student) return res.send("Aluno não encontrado!")

            student.birth = date(student.birth).bDay
            student.school_year = grade(student.school_year)

            Student.teachersSelectOptions((options) => {
                return res.render("students/show", { student, teachersSelectOptions: options })
            })
        })
    },
    edit(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
        }

        Student.find(req.params.id, (student) => {
            if (!student) return res.send("Aluno não encontrado!")

            student.birth = date(student.birth).iso

            Student.teachersSelectOptions((options) => {
                return res.render("students/edit", { student, teachersSelectOptions: options })
            })
        })
    },
    update(req, res) {
        Student.update(req.body, () => {
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect("/students")
        })
    }
}

