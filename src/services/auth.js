import db from '../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = ({name, email, password, phone}) => new Promise(async (resolve, reject) => {
    try {
        console.log(name)
        console.log(phone)
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(password, salt);
        const response = await db.User.findOrCreate({
            where: { email: email },
            attributes:{
                exclude: ['password', 'createdAt', 'updatedAt']                            
            },
            defaults: {
                name: name,
                email,
                password: hash,
                phone: phone
            }
        })

        resolve({
            success: response[1] ? true : false,
            mes: response[1] ? 'Đăng ký thành công' : 'Email is already exists',
            data: response[1]? {
                user: response[0]
            } : null
        })
    } catch (error) {
        reject(error)
    }
})

export const login = ({ email, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { email: email },
            attributes:{
                exclude: ['createdAt', 'updatedAt']                            
            },
            raw: true
        })
        const isChecked = response && bcrypt.compareSync(password, response.password)
        const token = isChecked? jwt.sign({id: response.id, email: response.email, role_code: response.role_code}, process.env.JWT_SECRET, { expiresIn: '5d'}) : null
        resolve({
            success: token ? true : false,
            mes: token ? 'Login success' : response? 'Wrong password' : 'Wrong email',
            data: token? {
                token: `Bearer ${token}`,
                user: response
            } : null
            
        })
    } catch (error) {
        reject(error)
    }
})