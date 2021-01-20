const db = require("../../config/db");

const Base = require("./Base");

Base.init({ table: "teachers" });

module.exports = {
  ...Base,
  async findBy(filter) {
    const query = `
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        WHERE teachers.name ILIKE '%${filter}%' 
        OR teachers.subjects_taught ILIKE '%${filter}%'
        GROUP BY teachers.id
        ORDER BY teachers.id
        `;

    const results = await db.query(query);

    return results.rows;
  },
  async paginate({ filter, limit, offset }) {
    let query = "",
      filterQuery = "",
      totalQuery = `(
                SELECT count (*) FROM teachers
            ) AS total`;

    if (filter) {
      filterQuery = `
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.subjects_taught ILIKE '%${filter}%'
            `;
      totalQuery = `(
                SELECT count (*) FROM teachers
                ${filterQuery}
            ) AS total`;
    }

    query = `
        SELECT teachers.*, ${totalQuery}, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        ${filterQuery}
        GROUP BY teachers.id LIMIT $1 OFFSET $2
        `;

    const results = await db.query(query, [limit, offset]);

    return results.rows;
  },
};
