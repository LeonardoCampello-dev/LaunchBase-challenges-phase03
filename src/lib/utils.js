module.exports = {
    age: (timestamp) => {
        const today = new Date()
        const birthDate = new Date(timestamp)
        
        let age = today.getFullYear() - birthDate.getUTCFullYear()
        const month = today.getMonth() - birthDate.getMonth()
        
        if (month < 0 || month == 0 && today.getDate > birthDate.getDate ) {
            age -= 1 
        }

        return age
    },
    date: (timestamp) => {
        const date = new Date(timestamp)

        const year = date.getFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day, 
            month,
            year,
            iso: `${year}-${month}-${day}`,
            bDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    grade: (schoolYear) => {
        if (schoolYear == "5EF") {
            schoolYear = "5º ano do ensino fundamental"
        } else if (schoolYear == "6EF") {
            schoolYear = "6º ano do ensino fundamental"
        } else if (schoolYear == "7EF") {
            schoolYear = "7º ano do ensino fundamental"
        } else if (schoolYear == "8EF") {
            schoolYear = "8º ano do ensino fundamental"
        } else if (schoolYear == "9EF") {
            schoolYear = "9º ano do ensino fundamental"
        } else if (schoolYear == "1EM") {
            schoolYear = "1º ano do ensino médio"
        } else if (schoolYear == "2EM") {
            schoolYear = "2º ano do ensino médio"
        } else if (schoolYear == "3EM") {
            schoolYear = "3º ano do ensino médio"
        }

        return schoolYear
    }
}