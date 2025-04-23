import { internalServerError } from '../middlewears/handle_error'
import * as services from '../services'

export const sendBookingController = async (req, res) => {
    try {
        const id = req.user.id
        const bookingInfo = {}
        bookingInfo.id = id
        bookingInfo.scheduleId = req.body.scheduleId
        bookingInfo.seat = req.body.seat
        console.log(bookingInfo.seat[1])
        const response = await services.sendBooking(bookingInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
