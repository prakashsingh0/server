const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const UserModel = require('../models/user_schema');


const Register = async (req, res) => {
    try {
        const { fullName, phone, password } = req.body;
        if (!fullName || !phone || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const capitalizeWords = (fullName) => {
            return fullName
                .toLowerCase()
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };


        const phoneInDb = await UserModel.findOne({ phone: phone });
        console.log(phoneInDb);

        if (phoneInDb) {
            return res.status(400).json({ message: "This phone number is already in use" });
        }
        const hashPassword = await bcryptjs.hash(password, 16);
        const user = new UserModel({ fullName: capitalizeWords(fullName), password: hashPassword, phone: phone });
        await user.save();
        res.status(201).json({ message: "Account created successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Login = async (req, res) => {
    try {
        const { phone, password } = req.body;
        console.log("Login request received:", req.body);
        if (!phone || !password) {
            return res.status(400).json({ message: "Please provide email/phone/username and password" });
        }


        const userInDb = await UserModel.findOne({ phone: phone });
        console.log(userInDb);

        if (!userInDb) {
            return res.status(404).json({ message: "User not found" });
        }
        const match = await bcryptjs.compare(password, userInDb.password);
        if (!match) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const jwtToken = jwt.sign({ _id: userInDb._id }, process.env.JWT_KEY, { expiresIn: "1h" });
        const user = await UserModel.find(userInDb._id).select("-password")
        console.log(user)

        res.status(200).json({ token: jwtToken, user: user, message: `welcome back ${userInDb.fullName}`, success: true });
        // console.log("user logged in");
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const Users = async(req,res)=>{
    return res.send({message:"hello i have got this message"})
}


module.exports = { Register, Login ,Users}