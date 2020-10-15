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

const schoolYear = [
    '5EF',
    '6EF',
    '7EF',
    '8EF',
    '9EF',
    '1EM',
    '2EM',
    '3EM'
]

async function createTeachers() {
    const teachers = []

    while (teachers.length < totalTeachers) {
        teachers.push({
            avatar_url: faker.image.imageUrl(),
            name: faker.name.findName(),
            birth: date(faker.date.past()).iso,
            educational_level: educationalLevel[Math.floor(Math.random() * educationalLevel.length)],
            class_type: classType[Math.round(Math.random())],
            subjects_taught: `${faker.name.jobArea()}, ${faker.name.jobArea()}, ${faker.name.jobArea()}`,
            created_at: date(new Date()).iso
        })
    }

    const teachersPromises = teachers.map(teacher => Teacher.create(teacher))

    teachersIds = await Promise.all(teachersPromises)
}

async function createStudents() {
    const students = []

    while (students.length < totalStudents) {
        students.push({
            avatar_url: faker.image.imageUrl(),
            name: faker.name.firstName(),
            email: faker.internet.email(),
            birth: date(faker.date.past()).iso,
            school_year: schoolYear[Math.floor(Math.random() * schoolYear.length)], 
            workload: Math.floor(Math.random() * 10 + 1),
            teacher_id: teachersIds[Math.floor(Math.random() * totalTeachers)]
        })
    }

    const studentsPromises = students.map(student => Student.create(student))

    studentsIds = await Promise.all(studentsPromises)
}

async function init() {
    await createTeachers()
    await createStudents()
}

init()