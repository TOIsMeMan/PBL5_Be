import { internalServerError } from '../middlewears/handle_error'
import * as services from '../services'

export const getSeatStatusesController = async (req, res) => {
    try {
        console.log(req.body)
        const response = await services.getSeatStatus(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
