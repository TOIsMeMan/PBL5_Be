import { internalServerError } from '../middlewears/handle_error'
import * as services from '../services'

export const sendBookingController = async (req, res) => {
    try {
        const userId = req.user.id
        const bookingInfo = {}
        bookingInfo.userId = userId
        bookingInfo.scheduleId = req.body.scheduleId
        bookingInfo.seats = req.body.seats
        const response = await services.sendBooking(bookingInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getBookingByIdController = async (req, res) => {
    try {
        const bookingDetailInfo = {}
        bookingDetailInfo.userId = req.user.id
        bookingDetailInfo.bookingId = parseInt(req.body.id)
        const response = await services.getBookingById(bookingDetailInfo)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getAllBookingController = async (req, res) => {
    try {
        const response = await services.getAllBooking(req.user.id)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}
