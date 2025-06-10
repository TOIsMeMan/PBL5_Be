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

export const getScheduleByIdController = async (req, res) => {
    try {
        const scheduleId = parseInt(req.body.id)
        console.log(scheduleId)
        const response = await services.getScheduleById(scheduleId)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const getAllSchedulesByRouteIdController = async (req, res) => {
    try {
        const routeId = parseInt(req.body.routeId)
        console.log(routeId)
        const response = await services.getAllSchedulesByRouteId(routeId)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const addScheduleController = async (req, res) => {
    try {
        console.log(req.body)
        const response = await services.addSchedule(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const updateScheduleController = async (req, res) => {
    try {
        console.log(req.body)
        const response = await services.updateSchedule(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}

export const deleteScheduleController = async (req, res) => {
    try {
        console.log(req.body)
        const response = await services.deleteSchedule(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return internalServerError(res)
    }
}