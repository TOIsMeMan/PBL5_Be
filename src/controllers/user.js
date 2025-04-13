import { badRequest, internalServerError } from '../middlewears/handle_error'
import * as services from '../services'
import joi from 'joi'

export const getCurrentUser = async (req, res) => {
    try {
        const id = req.user.id
        const response = await services.getOne(id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
