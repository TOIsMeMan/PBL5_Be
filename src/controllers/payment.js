import * as services from '../services'
import { internalServerError } from '../middlewears/handle_error'

export const sendPaymentContoller = async (req, res) => {
    try {
        const payemntInfo = req.body.bookingId
        console.log('paymentInfo: ', payemntInfo)
        const response = await services.sendPayment(payemntInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
