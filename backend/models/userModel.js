const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcrypt

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
    file: {
      type: String,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'DIRECTOR', 'PROCTOR'],
      default: 'PROCTOR',
    },
    status: {
      type: String,
      enum: ['Active', 'Blocked'],
      default: 'Active',
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it is new or modified
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with the salt
    user.password = await bcrypt.hash(user.password, salt);
    next(); // Proceed to save the user
  } catch (error) {
    console.log(error)
    next(error); // Pass error to the next middleware
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    
    return bcrypt.compareSync(candidatePassword, this.password);
  } catch (error) {
    console.log(error)
  }
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
