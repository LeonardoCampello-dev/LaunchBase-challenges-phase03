const Teacher = require('../models/Teacher')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        offset = limit * (page - 1)

        const params = {
            filter,
            page,
            limit,
            offset,
            callback(teachers) {
                const pagination = {
                    total: Math.ceil(teachers[0].total / limit),
                    page
                }

                for (let teacher of teachers) {
                    teacher.subjects_taught = teacher.subjects_taught.split(",")
                }

                return res.render("teachers/index", { filter, pagination, teachers })
            }
        }

        Teacher.paginate(params)
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
            if (!teacher) return res.send("Professor não encontrado!")

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

        Teacher.find(req.params.id, (teacher) => {
            if (!teacher) return res.send("Professor não encontrado!")

            teacher.birth = date(teacher.birth).iso
            teacher.subjects_taught = teacher.subjects_taught.split(",")

            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/edit", { teacher })
        })
    },
    update(req, res) {
        Teacher.update(req.body, () => {
            return res.redirect(`/teachers/${req.body.id}`)
        })
    },
    delete(req, res) {
        Teacher.delete(req.body.id, () => {
            return res.redirect("/teachers")
        })
    }
}