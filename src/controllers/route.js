import * as services from '../services'
import { badRequest, internalServerError } from '../middlewears/handle_error'

export const getRouteController = async (req, res) => {
    try {
        const response = await services.getRoute()
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
