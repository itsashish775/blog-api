const student = require("../models/student")

const studentController = {
    getAllStudents: async (req, res) => {
        let students = await student.find();
        // let students= await student.create({
        //     firstName:"Siddharth",
        //     lastName:"Mallik",
        //     gradeLevel:7
        // })
        return res.json({ students })
    }
}

module.exports = studentController