const fs = require('fs')
const data = require('./data')

exports.post = (req, res) => {
    const keys = Object.keys(req.body)

    for (let key of keys) {
        if (req.body[key] == "") return res.send("Por favor, preencha todos os campos do formulário!")
    }

    let { avatar_url, name, birth, educational_level, class_type, services } = req.body
    
    birth = Date.parse(birth)
    const created_at = Date.now()

    const id = Number(data.teachers.length + 1)
    
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        educational_level,
        class_type,
        services,
        created_at
    })
    
    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!")
    })
    
    return res.redirect("/teachers")
}