const faker = require('faker')

const Teacher = require('./src/app/models/Teacher')
const Student = require('./src/app/models/Student')

const { date } = require('./src/lib/utils')

let teachersIds = []
let studentsIds = []

const totalTeachers = 6
const totalStudents = 12

const classType = ['Presencial', 'À distância']
const educationalLevel = [
    'Ensino Médio Completo',
    'Ensino Superior Completo',
    'Mestrado',
    'Doutorado'
]

async function createTeachers() {
    const teachers = []

    while (teachers.length < totalTeachers) {
        teachers.push({
            avatar_url: faker.image.imageUrl(),
            name: faker.name.findName(),
            birth: date(faker.date.past()).iso,
            educational_level: educationalLevel[Math.floor(Math.random() * 3)],
            class_type: classType[Math.round(Math.random())],
            subjects_taught: `${faker.name.jobArea()}, ${faker.name.jobArea()}, ${faker.name.jobArea()}`,
            created_at: date(new Date()).iso
        })
    }

    const teachersPromises = teachers.map(teacher => Teacher.create(teacher))

    teachersIds = await Promise.all(teachersPromises)
}

async function init() {
    await createTeachers()
}

init()