import joi from 'joi'
import { name, email, phone, scheduleId, seats } from '../helpers/joi_schema'
import { internalServerError, badRequest } from '../middlewears/handle_error'
import * as services from '../services'

export const sendBookingController = async (req, res) => {
    try {
        const {error} = joi.object({
            name: name,
            email: email,
            phone: phone,
            scheduleId: scheduleId,
            seats: joi.array().items(joi.string()).required()
        }).validate(req.body)
        if (error) return badRequest(error.details[0].message, res)

        const bookingInfo = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            scheduleId: req.body.scheduleId,
            seats: req.body.seats
        }

        const response = await services.sendBooking(bookingInfo)
        return res.status(200).json(response)
    } catch (error) {
        console.error('Booking Error:', error);
        return internalServerError(res);
    }
}

export const getBookingByIdController = async (req, res) => {
    try {
        const bookingDetailInfo = {
            bookingId: parseInt(req.body.id)
        }
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

export const updateBookingStatusController = async (req, res) => {
    try {
        const response = await services.updateBookingStatus(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getAllBookingAdminController = async (req, res) => {
    try {
        const response = await services.getAllBookingAdmin(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getBookingByReferenceController = async (req, res) => {
    try {
        const response = await services.getBookingByReference(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}