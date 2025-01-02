const httpError = require("../middleware/httpError")
const Building = require("../models/buildingModel")
const Student = require("../models/studentModel")
const userModel = require("../models/userModel")

const getDataAnalysis = async (req, res, next) => {
    try {
        const totalBuildings = await Building.countDocuments()
        const totalStudents = await Student.estimatedDocumentCount()
        res.status(200).json({
            totalStudents,
            totalBuildings
        })
    } catch (error) {
        next(new httpError(error.message, 500))
    }
}
const AdminDataAnalysis = async (req, res, next) => {
    try {
        // Total number of users
        const totalUsers = await userModel.countDocuments();
         // users 
        // Logged-in users
        const loggedinUsers = await userModel.aggregate([
            {
                $match: { isLoggedIn: true }
            },
            {
                $count: 'loggedinUsers'
            }
        ]);
        const totalLoggedinUsers = loggedinUsers.length > 0 ? loggedinUsers[0].loggedinUsers : 0;

        // Monthly users
        const monthlyUsers = await userModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year-month
                    totalUsers: { $sum: 1 } // Count the number of users in each group
                }
            },
            {
                $sort: { _id: 1 } // Sort by date in ascending order
            }
        ]);
        // const monthlyUsersinPercentage = `${(100 * monthlyUsers.length) / totalUsers} %`
        // dayly users 
        console.log(monthlyUsers.length)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const visits = await userModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: yesterday } // Filter visits in the last 24 hours
                }
            },
            {
                $count: "lastDayVisits" // Count the visits
            }
        ]);

        const lastDayVisits = visits.length > 0 ? visits[0].lastDayVisits : 0;


        // new 

        const monthlyUsersPercentage = await userModel.aggregate([
            // Step 1: Group by month and count users
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } }, // Group by year-month
                    totalUsers: { $sum: 1 } // Count users per month
                }
            },
            // Step 2: Calculate the total number of users
            {
                $group: {
                    _id: null, // Group all documents together
                    monthlyData: { $push: { month: "$_id", totalUsers: "$totalUsers" } }, // Push month data into an array
                    totalUsers: { $sum: "$totalUsers" } // Calculate total users
                }
            },
            // Step 3: Calculate percentage for each month
            {
                $unwind: "$monthlyData" // Unwind the monthly data array
            },
            {
                $project: {
                    _id: "$monthlyData.month", // Extract month as the ID
                    totalUsers: "$monthlyData.totalUsers", // Keep total users for the month
                    percentage: {
                        $multiply: [
                            { $divide: ["$monthlyData.totalUsers", "$totalUsers"] }, // Divide by total users
                            100 // Convert to percentage
                        ]
                    }
                }
            },
            // Step 4: Sort by month
            {
                $sort: { _id: 1 } // Sort by month in ascending order
            }
        ]);
        const passwordStrength = await userModel.aggregate([
            {
              $group: {
                _id: "$role", // Group by "role"
                averagePasswordLength: { $avg: { $strLenCP: "$password" } }, // Average password length
              }
            }
          ]);
          const inactiveUsers = await userModel.aggregate([
            {
              $match: {
                isLoggedIn: false,
                updatedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } // Last 30 days
              }
            },
            {
              $count: "inactiveUsers" // Count inactive users
            }
          ]);
          
          
        console.log(inactiveUsers)
        res.status(200).json({
            totalUsers,
            totalLoggedinUsers,
            monthlyUsersPercentage,
            lastDayVisits,
            inActive:inactiveUsers[0]?.inactiveUsers || 0,
            password:passwordStrength[0].averagePasswordLength || 0,

        });
    } catch (error) {
        console.error(error);
        next(new httpError(error.message, 500));
    }
};


module.exports = {
    getDataAnalysis,
    AdminDataAnalysis
}