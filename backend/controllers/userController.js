const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { validationResult } = require('express-validator');
const httpError = require('../middleware/httpError');
const exceljs = require('exceljs')
const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path');
const generateAccessToken = require('../utills/generateAccessToken');
const { userInfo } = require('os');
const generateRefreshToken = require('../utills/generateRefreshToken');

const BACKUP_PATH = path.join(__dirname, '..', 'backups')
const register = async (req, res) => {
    const { userName, email, password, role,status } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 
if(!req.file) return res.status(404).json({message:'No File sended'})
    try { 
        const existingUser = await userModel.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with that username or email already exists.' });
        }


        const newUser = new userModel({
            userName,
            email,
            password,
            role: role || 'PROCTOR',
            file:req?.file?.filename,
            status:status || 'Active'
        });

        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                role: newUser.role,
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};
const login = async (req, res,next) => {
    const { userName, email, password, role } = req.body;

    try {
        const existingUser = await userModel.findOne({ userName });
        if (!existingUser) {
            return next(new httpError('inCorrect username or password ',401));
        }
        const isMatched = await existingUser.comparePassword(password)
        console.log(password,isMatched)
        if (!isMatched) {
            return next(new httpError('Wrong Password', 401))
        }
        const accessToken = await generateAccessToken(
            {
                userInfo: {
                    userName: existingUser.userName,
                    role: existingUser.role
                }
            },next
        )
        const refreshToken =await generateRefreshToken(
            {
                userInfo: {
                    userName: existingUser.userName,
                    role: existingUser.role
                }
            },next
        )
       await userModel.findByIdAndUpdate(
            existingUser._id,
            { refreshToken, isLoggedIn: true },
            { new: true })
            res.cookie('Token',refreshToken,{maxAge:36000*24})
        res.status(200).json({
            ...existingUser._doc,
            password: undefined,
            refreshToken:undefined,
            accessToken
        });

    } catch (error) {
        console.error(error);
        next(new httpError(error.message,500))
    }
};

const updateUser = async (req, res, next) => {
    try {
        // Find and update user by ID
        const updatedUser = await userModel.findByIdAndUpdate(
            { _id: req.body.id },
            { ...req.body },
            { new: true } // This ensures the updated document is returned
        );

        // If no user is found, return an error message
        if (!updatedUser) {
            return res.status(400).json({ message: "User not found" });
        }

        // If update is successful, send a success response
        res.status(200).json({ message: 'User successfully updated', updatedUser });
    } catch (error) {
        // Catch any server error and log it
        console.log(error);
        res.status(500).json({ message: "Server error while updating user" });
    }
};

const getUserById = async (req, res, next) => {
    const { id } = req.params
    console.log(id)
    try {
        const user = await userModel.findById(id)
        if (!user) return res.send("errror user not found")
        res.status(200).json(user)
    } catch (error) {
        res.send("errror on server")
        console.log(error)
    }
}
const getAllUser = async (req, res, next) => {
    try {
        const user = await userModel.find()
        if (!user) return res.send("errror user not found")
        res.status(200).json(user)
    } catch (error) {
        res.send("errror on server")
        console.log(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const user = await userModel.findByIdAndDelete(req.body.id)
        if (!user) return res.send("errror user not found")
        res.status(200).json({ message: 'sucessfuly deleted' })
    } catch (error) {
        res.send("errror on server")
        console.log(error)
    }
}

// backup
const backupUsers = async (req, res, next) => {
    try {
        const user = await userModel.find()
        if (!user) return res.send("errror user not found")
        res.status(200).json(user)
    } catch (error) {
        res.send("errror on server")
        console.log(error)
    }
}
const createBackup = async (req, res, next) => {
    try {
        const users = await userModel.find()
        if (!fs.existsSync(BACKUP_PATH)) {
            fs.mkdirSync(BACKUP_PATH)
        }
        // crating work book and worksheet

        const workBook = new exceljs.Workbook()
        const worksheet = workBook.addWorksheet('user backup')
        // add headers
        worksheet.columns = [
            { header: 'ID', key: '_id', width: 30 },
            { header: 'Username', key: 'userName', width: 30 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Password', key: 'password', width: 30 },
            { header: 'Created At', key: 'createdAt', width: 30 },
        ];
        // add rows
        users.forEach((user) => {
            worksheet.addRow({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                password: user.password,
                createdAt: user.createdAt,
            });
        });
        // generate excel
        const backupFile = path.join(BACKUP_PATH, `users_backup_${Date.now()}.xlsx`);
        await workBook.xlsx.writeFile(backupFile);

        res.status(200).json({ message: 'Backup created successfully!', file: backupFile });
    } catch (error) {
        console.log(error)
        return next(new httpError(error.message, 500))
    }
}
// restore

const restoreBackup = async (req, res) => {
    try {
        // Path to the most recent backup file (or specify a file in the request)
        const backupFiles = fs.readdirSync(BACKUP_PATH).sort((a, b) => b.localeCompare(a));
        if (backupFiles.length === 0) {
            return res.status(404).json({ message: 'No backup files found!' });
        }

        const latestBackup = path.join(BACKUP_PATH, backupFiles[0]);
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile(latestBackup);
        const worksheet = workbook.getWorksheet('user backup');

        // Parse rows and restore to the database
        const restoredUsers = [];
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header row
            const user = {
                _id: row.getCell(1).value,
                userName: row.getCell(2).value,
                email: row.getCell(3).value,
                password: row.getCell(4).value,
                createdAt: row.getCell(5).value,
            };
            restoredUsers.push(user);
        });

        // Clear current data (optional)
        await userModel.deleteMany();

        // Insert restored data
        await userModel.insertMany(restoredUsers);

        res.status(200).json({ message: 'Backup restored successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to restore backup', error });
    }
};
const logout= async (req,res,next) => {
    const cookie = req.cookies 
    if(!cookie) return next(new httpError('please login',401))
        const refreshToken = cookie.Token

    try {
        const logoutUser = await userModel.findOne({refreshToken})
        if(!logoutUser) return next(new httpError('please login',401))
        await userModel.findByIdAndUpdate(logoutUser._id,{refreshToken:'',isLoggedIn:false},{new:true})
        res.clearCookie('Token')
        res.status(200).json({message:'successfully logut'})
    } catch (error) {
        next(new httpError(error.message,500))
    }
}

module.exports = {
    register,
    updateUser,
    getUserById,
    getAllUser,
    deleteUser,
    createBackup,
    backupUsers,
    restoreBackup,
    login,
    logout
}
