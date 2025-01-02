const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  // Required field
  },
  lastName: {
    type: String,
    required: true,  // Required field
  },
  studentId: {
    type: String,
    required: true,
    unique: true,  // Ensure studentId is unique
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],  // Limit to predefined gender options
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,  // Ensure phone number is unique
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensure email is unique
    match: [/.+\@.+\..+/, 'Please enter a valid email address'],  // Simple email format validation
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ['InActive', 'Active'],  // Limit to predefined gender options
    default: 'Active', // The student's current status
  },
  enrollmentDate: {
    type: Date,
    default: Date.now, // Auto set the enrollment date when the student is created
  },
  course: {
    type: String, // The course/program the student is enrolled in
  },
  room: {
    type: String,  // Room assigned to the student (if applicable)
  },   
  building: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the building
    ref: 'Building',
  },
  emergencyContact: {
    name: {
      type: String,
    },
    relationship: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
  },
});

// Create the Student model based on the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
