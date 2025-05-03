import { badRequest, internalServerError } from '../middlewears/handle_error'
import * as services from '../services'
import { name ,email, password, phone, oldPassword } from '../helpers/joi_schema'
import joi from 'joi'

export const register = async (req, res) => {
    try {
        const {error} = joi.object({name, email, password, phone}).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const response = await services.register(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const login = async (req, res) => {
    try {
        const {error} = joi.object({email, password}).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const response = await services.login(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const changePasswordController = async (req, res) => {
    try {
        const {error} = joi.object({password, oldPassword}).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)
        const changePasswordInfo = {
            oldPassword: req.body.oldPassword,
            newPassword: req.body.password,
            userId: req.user.id
        }
        const response = await services.changePassword(changePasswordInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}