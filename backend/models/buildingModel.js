const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  capacity: {
    type: Number,
    default: 6, // Default to 6 students per room
  },
  currentOccupants: {
    type: Number,
    default: 0, // Tracks the number of students currently assigned
  },
});

const BuildingSchema = new mongoose.Schema({
  buildingNumber: {
    type: String,
    required: true,
    unique: true,
  },
  floors: {
    type: Number,
    required: true,
  },
  rooms: {
    type: [RoomSchema], // Nested schema for rooms
    default: [],
  },
  location: {
    type: String,
    required: true,
  },   
  createdTime: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: "No description provided.",
  },
});

const Building = mongoose.model("Building", BuildingSchema);

module.exports = Building;
