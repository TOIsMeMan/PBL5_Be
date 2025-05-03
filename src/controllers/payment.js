import * as services from '../services'
import { internalServerError } from '../middlewears/handle_error'

export const sendPaymentContoller = async (req, res) => {
    try {
        const payementInfo = req.body
        const response = await services.sendPayment(payementInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
