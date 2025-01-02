import * as yup from "yup";

const validationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .max(50, "Email cannot exceed 50 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password cannot exceed 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #, etc.)"
    ),
  file: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      return value?.[0]?.size <= 1024 * 1024; // Max 2MB
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return ['image/jpeg', 'image/png', 'image/jpg'].includes(value?.[0]?.type);
    }),
});

export const contactValidationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .max(50, "Email cannot exceed 50 characters"),
  message: yup
    .string()
    .required("message is required")
    .min(10,"message must be atleast 10 letters.")
    .max(200, "Email cannot exceed 50 characters"),
  studentId: yup
    .string()
    .matches(/^DMU\d{6}$/, "Student ID must start with 'DMU' followed by exactly 6 digits.")
    .required("Student ID is required."),
})
export const updateUserValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email address")
    .max(50, "Email cannot exceed 50 characters"),
});
export const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password cannot exceed 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #, etc.)"
    ),
});
export const idValidationSchema = yup.object().shape({
  studentId: yup
    .string()
    // .matches(/^DMU\d{6}$/, "Student ID must start with 'DMU' followed by exactly 6 digits.")
    .required("Student ID is required."),
});
export const loginValidationSchema = yup.object().shape({
  userName: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username cannot exceed 20 characters")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password cannot exceed 30 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #, etc.)"
    ),
});

export const UpdateStudentSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  building: yup.string().required("Building is required"),
  room: yup.string().required("Room is required"),
});
export const UpdateBuildingSchema = yup.object({
  buildingNumber: yup
    .string()
    .required("Building number is required")
    .matches(/^[A-Za-z0-9]+$/, "Building number must be alphanumeric"),

  floors: yup
    .number()
    .required("Number of floors is required")
    .min(1, "Building must have at least one floor"),

  location: yup
    .string()
    .required("Location is required"),

  description: yup
    .string()
    .max(500, "Description cannot exceed 500 characters"),

  rooms: yup
    .array()
    .of(
      yup.object({
        floorNumber: yup
          .number()
          .required("Floor number is required")
          .min(1, "Floor number must be at least 1"),

        roomNumber: yup
          .number()
          .required("Room number is required")
          .min(1, "Room number must be at least 1"),

        capacity: yup
          .number()
          .required("Capacity is required")
          .min(1, "Room capacity must be at least 1"),

        currentOccupants: yup
          .number()
          .required("Current occupants is required")
          .min(0, "Current occupants cannot be negative")
          .max(
            yup.ref('capacity'),
            "Current occupants cannot exceed room capacity"
          ),
      })
    )
    .min(1, "At least one room is required")
    .required("Rooms are required"),
});

export default validationSchema;
