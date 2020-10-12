const db = require('../../config/db')
const { date } = require('../../lib/utils')

module.exports = {
    async all() {
        const query = `
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        GROUP BY teachers.id
        ORDER BY teachers.id
        `

        const results = await db.query(query)

        return results.rows
    },
    async create(data) {
        const query = `
        INSERT INTO teachers (
            avatar_url,
            name,
            birth,
            educational_level,
            class_type,
            subjects_taught,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.educational_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso
        ]

        const results = await db.query(query, values)

        return results.rows[0].id
    },
    async find(id) {
        const results = await db.query(`SELECT * FROM teachers WHERE id = $1`, [id])

        return results.rows[0]
    },
    async findBy(filter) {
        const query = `
        SELECT teachers.*, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        WHERE teachers.name ILIKE '%${filter}%' 
        OR teachers.subjects_taught ILIKE '%${filter}%'
        GROUP BY teachers.id
        ORDER BY teachers.id
        `

        const results = await db.query(query)

        return results.rows
    },
    update(data) {
        const query = `
        UPDATE teachers SET
            avatar_url = ($1),
            name = ($2),
            birth = ($3),
            educational_level = ($4),
            class_type = ($5),
            subjects_taught = ($6)
        WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            data.birth,
            data.educational_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]

        return db.query(query, values)
    },
    delete(id) {
        return db.query(`DELETE FROM teachers WHERE id = $1`, [id])
    },
    async paginate({ filter, limit, offset }) {
        let query = '',
            filterQuery = '',
            totalQuery = `(
                SELECT count (*) FROM teachers
            ) AS total`

        if (filter) {
            filterQuery = `
            WHERE teachers.name ILIKE '%${filter}%'
            OR teachers.subjects_taught ILIKE '%${filter}%'
            `
            totalQuery = `(
                SELECT count (*) FROM teachers
                ${filterQuery}
            ) AS total`
        }

        query = `
        SELECT teachers.*, ${totalQuery}, count(students) AS total_students
        FROM teachers
        LEFT JOIN students ON (students.teacher_id = teachers.id)
        ${filterQuery}
        GROUP BY teachers.id LIMIT $1 OFFSET $2
        `

        const results = await db.query(query, [limit, offset])

        return results.rows
    }
}