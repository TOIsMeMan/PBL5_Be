import * as services from '../services'

export const searchLocationController = async (req, res) => {
    try {
        const text = req.body
        console.log(text)
        const response = await services.searchLocation(text)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
