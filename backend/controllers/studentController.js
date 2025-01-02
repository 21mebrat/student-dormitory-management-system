const ExcelJS = require('exceljs');
const Student = require('../models/studentModel');
const Building = require('../models/buildingModel');
const httpError = require('../middleware/httpError');

// Function to read Excel and insert data into MongoDB
const insertStudentsFromExcel = async (req, res, next) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'File not provided' });
    }

    const file = req.file;
    const workbook = new ExcelJS.Workbook();

    // Read the uploaded Excel file
    await workbook.xlsx.readFile(file.path);

    // Assuming the first sheet contains the students' data
    const worksheet = workbook.worksheets[0];

    // Convert the rows to JSON format
    const studentData = [];
    worksheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) return; // Skip the header row

      const student = {
        firstName: row.getCell(1).value,
        lastName: row.getCell(2).value,
        studentId: row.getCell(3).value,
        dateOfBirth: new Date(row.getCell(4).value),
        gender: row.getCell(5).value,
        phoneNumber: row.getCell(6).value,
        email: row.getCell(7).value,
        address: row.getCell(8).value,
        status: row.getCell(9).value || 'Active',
        emergencyContact: {
          name: row.getCell(10).value,
          relationship: row.getCell(11).value,
          phoneNumber: row.getCell(12).value,
        },
      };

      studentData.push(student);
    });

    // Insert student data into MongoDB
    const insertedStudents = await Student.insertMany(studentData);

    res.status(200).json({
      message: 'Student data uploaded successfully',
      insertedCount: insertedStudents.length,
    });
  } catch (error) {
    console.error('Error inserting student data:', error);
    res.status(500).json({ message: 'Failed to upload data' });
  }
};
const makePlacement = async (req, res) => {
  try {
    // Step 1: Fetch all students and buildings
    const students = await Student.find({ status: "Active" }); // Only place active students
    const buildings = await Building.find().sort({ buildingNumber: 1 }); // Sort buildings by number for consistency

    let studentIndex = 0;
    const assignedStudents = [];

    // Step 2: Assign students to buildings, floors, and rooms
    for (const building of buildings) {
      for (let floor = 1; floor <= building.floors; floor++) {
        for (const room of building.rooms) { // Use dynamic room configuration per building
          if (studentIndex < students.length) {
            const student = students[studentIndex];

            assignedStudents.push({
              _id: student._id,
              firstName: student.firstName,
              lastName: student.lastName,
              studentId: student.studentId,
              building: building._id,
              room: `Building ${building.buildingNumber}, Floor ${floor}, Room ${room.roomNumber}`, // Include floor and room details
            });

            studentIndex++;
          } else {
            break; // Stop if all students are assigned
          }
        }

        if (studentIndex >= students.length) {
          break; // Stop if all students are assigned
        }
      }

      if (studentIndex >= students.length) {
        break; // Stop if all students are assigned
      }
    }

    // Step 3: Check if all students were placed
    if (studentIndex < students.length) {
      return res.status(400).json({
        message: "Not enough rooms available for all students.",
        unplacedStudents: students.slice(studentIndex), // Include unplaced students in the response
      });
    }

    // Step 4: Update students with their assigned rooms and buildings
    const updatedStudents = await Promise.all(
      assignedStudents.map(async (assignedStudent) => {
        return await Student.findByIdAndUpdate(
          assignedStudent._id,
          {
            building: assignedStudent.building,
            room: assignedStudent.room,
          },
          { new: true }
        );
      })
    );

    // Step 5: Return the response with the updated students
    res.status(200).json({
      message: "Placement complete!",
      students: updatedStudents,
    });
  } catch (error) {
    console.error("Error in student placement:", error);
    return res.status(500).json({
      message: "An error occurred during placement.",
      error: error.message,
    });
  }
};

// fetch all Students

const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({})
    if (!students) return next(new httpError('Sorry Your Database is Empty. Tray Again.', 400))
    res.status(200).json(students)
  } catch (error) {
    next(new httpError(error.message, 500))
  }

}
// delete Student 
const deleteStudent = async (req, res, next) => {
  try {
      const student = await Student.findByIdAndDelete(req.body.id)
      if (!student) return next(new httpError('NO Student With This ID',404))
      res.status(200).json({ message: 'sucessfuly deleted',success:true })
  } catch (error) {
    next(new httpError(error.message,500))
      console.log(error)
  }
}
// get student by id

const getStudentById = async (req, res,next) => {

  const { id } = req.params
  console.log(id)
  try {
    const student = await Student.findById(id);

    if (!student) {
      return next(new httpError('No Student Found',404));
    }

    res.status(200).json(student);
  } catch (error) {
    next(new httpError(error.message,500))
  }
};

// Update Student by ID
const updateStudentById = async (req, res,next) => {
  try {
    const {id} = req.body; 
    const student = await Student.findByIdAndUpdate(id, {...req.body}, {
      new: true
    })

    if (!student) {
      return next(new httpError('No Student Found',404));
    }

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    next(new httpError(error.message,500))
  }
};
module.exports = {
  insertStudentsFromExcel,
  makePlacement,
  getAllStudents,
  deleteStudent,
  updateStudentById,
  getStudentById
};
