const Student = require('../models/Student')
const { date, grade } = require('../../lib/utils')

module.exports = {
    async index(req, res) {
        let { filter, page, limit } = req.query

        page = page || 1
        limit = limit || 3
        offset = limit * (page - 1)

        const params = {
            filter,
            limit,
            offset
        }

        const students = await Student.paginate(params)

        const pagination = {
            total: Math.ceil(students[0].total / limit),
            page
        }

        for (let student of students) {
            student.school_year = grade(student.school_year)
        }

        return res.render('students/index.njk', { 
            filter, 
            pagination, 
            students,
            success: req.query.success
        })
    },
    async create(req, res) {
        try {
            const teachersSelectOptions = await Student.teachersSelectOptions()

            return res.render('students/create.njk', { teachersSelectOptions })
        } catch (error) {
            console.error(error)
        }
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == '') return res.send('Por favor, preencha todos os campos do formulário!')
            }

            const {
                avatar_url,
                name,
                email,
                birth,
                school_year,
                workload,
                teacher
            } = req.body

            const studentId = await Student.create({
                avatar_url,
                name,
                email,
                birth,
                school_year,
                workload,
                teacher_id: teacher
            })

            return res.redirect(`/students/${studentId}?success=Cadastro realizado com sucesso!`)
        } catch (error) {
            console.error(error)
        }
    },
    async show(req, res) {
        try {
            const student = await Student.find(req.params.id)

            if (!student) return res.send('Aluno não encontrado!')

            student.birth = date(student.birth).bDay
            student.school_year = grade(student.school_year)

            const teachersSelectOptions = await Student.teachersSelectOptions()

            return res.render('students/show.njk', { 
                student, 
                teachersSelectOptions,
                success: req.query.success
            })
        } catch (error) {
            console.error(error)
        }
    },
    async edit(req, res) {
        try {
            const student = await Student.find(req.params.id)

            if (!student) return res.send('Aluno não encontrado!')

            student.birth = date(student.birth).iso
            student.school_year = grade(student.school_year)

            const teachersSelectOptions = await Student.teachersSelectOptions()

            return res.render('students/edit.njk', { student, teachersSelectOptions })
        } catch (error) {
            console.error(error)
        }
    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body)

            for (let key of keys) {
                if (req.body[key] == '') return res.send('Por favor, preencha todos os campos do formulário!')
            }

            const {
                avatar_url,
                name,
                email,
                birth,
                school_year,
                workload,
                teacher
            } = req.body

            await Student.update(req.body.id, {
                avatar_url,
                name,
                email,
                birth,
                school_year,
                workload,
                teacher_id: teacher
            })

            return res.redirect(`/students/${req.body.id}?success=Perfil atualizado!`)
        } catch (error) {
            console.error(error)
        }
    },
    async delete(req, res) {
        await Student.delete(req.body.id)

        return res.redirect('/students?success=Perfil deletado!')
    }
}

