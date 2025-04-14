import * as services from '../services'
import { badRequest, internalServerError } from '../middlewears/handle_error'

export const getSchedulesController = async (req, res) => {
    try {
        const response = await services.getSchedules(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
