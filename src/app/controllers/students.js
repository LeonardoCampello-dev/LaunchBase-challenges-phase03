const { age, date } = require('../../lib/utils')

module.exports = {
    index(req, res) {
        return res.render("students/index")
    },
    create(req, res) {
        return res.render("students/create")       
    },
    post(req, res) {
        const keys = Object.keys(req.body)

        for (let key of keys) {
            if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
        }
    
        let { avatar_url, name, birth, educational_level, class_type, services } = req.body   
    },
    show(req, res) {
        return   
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

