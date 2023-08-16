import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from '../helpers/authHelper.js'
import JWT from 'jsonwebtoken'
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body
        //validations

        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'email is required' })
        }
        if (!password) {
            return res.send({ error: 'password is required' })
        }
        if (!phone) {
            return res.send({ error: 'phone is required' })
        }
        if (!address) {
            return res.send({ error: 'address is required' })
        }

        // check existing user
        const existinguser = await userModel.findOne({ email })
        //existing user
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'Email Already Registererd'
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })


    } catch (e) {
        console.log(e)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            e
        })
    }
}
export { registerController }
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        //check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                messaeg: 'Email is not registered'
            })
        }

        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password'
            })
        }
        //token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: 'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        })


    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            e
        })
    }
}
//test controller 
export const testController = (req, res) => {
    console.log('protected route');
}