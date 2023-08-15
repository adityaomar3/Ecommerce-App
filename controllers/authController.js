import userModel from '../models/userModel.js'
import { hashPassword } from '../helpers/authHelper.js'
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
        const user = new userModel({ name, email, phone, address, password: hashedPassword }).save()

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