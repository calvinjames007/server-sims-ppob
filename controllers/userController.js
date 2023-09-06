const {User} = require('../models');
const bcrypt = require('bcryptjs');
const {signToken} = require('../helpers/jwt')

module.exports = class userController {
    // Regist new user
    static async registerNewUser(req, res) {
        try {
            const {firstName, lastName, email, password} = req.body
            const newRegister = await User.create({firstName, lastName, balance : 0, email, password, userPicture : "https://api.multiavatar.com/Binx Bond.svg"})
            res.status(201).json({message: `New user ${newRegister.firstName} ${newRegister.lastName} has been created`})
        }
        catch (error) {
            res.status(400).json({message: `Bad Request`})
        }
    }

    // Login user
    static async loginUser(req, res) {
        try {
            const {email, password} = req.body;

            if (!email) {
                return res.status(400).json({message: 'Please enter your email'})
            }

            if (!password) {
                return res.status(400).json({message: 'Please enter your password'})
            }

            const [user] = await User.findAll({where: {email}});

            if (!user) {
                return res.status(404).json({message: "User not found"})
            }
            
            const isValidPass = bcrypt.compareSync(password, user.password);

            if (!isValidPass) {
                return res.status(401).json({message: "Email or Password is incorrect"})
            }

            const accessToken = signToken({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            })

            res.json({accessToken})
        }
        catch(error) {
            console.log(error)
        }
    }

    // Check User Profile
    static async readUserProfile(req, res) {
        try {
            const userProfile = await User.findAll(
                {
                where: {email: req.user.email},
                attributes: {exclude: ['password']}
                }
            )

            res.status(200).json({userProfile})
        }
        catch (error) {
            res.status(404).json({message: "User not found"})
        }
    }

    // Edit User Profile And Their Picture
    static async editUserProfile(req, res) {
        try {
            const {firstName, lastName, email, userPicture} = req.body;

            await User.update(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                userPicture: userPicture
            }, 
            {
                where: {email: req.user.email}
            })

            res.status(201).json({message: `User ${req.user.firstName} ${req.user.lastName} updated their profile`})
        }
        catch(error) {
            res.status(500).json({message: `Internal Server Error`})
        }
    }
}