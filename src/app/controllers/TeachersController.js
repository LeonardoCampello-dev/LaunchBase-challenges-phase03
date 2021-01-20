const Teacher = require("../models/Teacher");
const { age, date } = require("../../lib/utils");

module.exports = {
  async index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 3;
    offset = limit * (page - 1);

    const params = {
      filter,
      limit,
      offset,
    };

    const teachers = await Teacher.paginate(params);

    if (!teachers) return res.send("Professores não encontrados!");

    const pagination = {
      total: Math.ceil(teachers[0].total / limit),
      page,
    };

    for (let teacher of teachers) {
      teacher.subjects_taught = teacher.subjects_taught.split(",");
    }

    return res.render("teachers/index.njk", {
      filter,
      pagination,
      teachers,
      success: req.query.success,
    });
  },
  create(req, res) {
    return res.render("teachers/create.njk");
  },
  async post(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor, preencha todos os campos do formulário!");
    }

    const {
      avatar_url,
      name,
      birth,
      educational_level,
      class_type,
      subjects_taught,
    } = req.body;

    const teacherId = await Teacher.create({
      avatar_url,
      name,
      birth,
      educational_level,
      class_type,
      subjects_taught,
    });

    return res.redirect(
      `/teachers/${teacherId}?success=Cadastro realizado com sucesso!`
    );
  },
  async show(req, res) {
    const teacher = await Teacher.find(req.params.id);

    if (!teacher) return res.send("Professor não encontrado!");

    teacher.age = age(teacher.birth);
    teacher.subjects_taught = teacher.subjects_taught.split(",");
    teacher.created_at = date(teacher.created_at).format;

    return res.render("teachers/show.njk", {
      teacher,
      success: req.query.success,
    });
  },
  async edit(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor, preencha todos os campos do formulário!");
    }

    const teacher = await Teacher.find(req.params.id);

    if (!teacher) return res.send("Professor não encontrado!");

    teacher.birth = date(teacher.birth).iso;
    teacher.subjects_taught = teacher.subjects_taught.split(",");
    teacher.created_at = date(teacher.created_at).format;

    return res.render("teachers/edit.njk", { teacher });
  },
  async update(req, res) {
    const keys = Object.keys(req.body);

    for (let key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor, preencha todos os campos do formulário!");
    }

    const {
      avatar_url,
      name,
      birth,
      educational_level,
      class_type,
      subjects_taught,
    } = req.body;

    await Teacher.update(req.body.id, {
      avatar_url,
      name,
      birth,
      educational_level,
      class_type,
      subjects_taught,
    });

    return res.redirect(`/teachers/${req.body.id}?success=Perfil atualizado!`);
  },
  async delete(req, res) {
    await Teacher.delete(req.body.id);

    return res.redirect("/teachers?success=Perfil deletado!");
  },
};
