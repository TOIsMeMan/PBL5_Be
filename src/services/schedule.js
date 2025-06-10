import { raw } from 'mysql2'
import db from '../models'
import {Op, where} from 'sequelize'

    const getRouteId = async ({fromLocationId, toLocationId}) => {
        const response = await db.Route.findOne({
            where: {
                fromLocationId,
                toLocationId
            },
            raw: true
        })
        console.log(response)
        return response? response.id : null
    }

    export const getAllSchedulesByRouteId = (routeId) => new Promise(async (resolve, reject) => {
        try {
            console.log(routeId)
            const query = {}
            query.routeId = routeId

            console.log(query)

            const scheduleResponse = await db.Schedule.findAndCountAll({
                where: query,
                attributes:{
                    exclude: ['createdAt', 'updatedAt']                            
                },
                raw: true
            })
            console.log(scheduleResponse)
            const routeResponse = await db.Route.findOne({
                where: {
                    id: routeId
                },
                attributes: [
                    'id'
                ],
                include: [
                    { 
                        model: db.Location, 
                        as: 'fromLocation' ,
                        attributes: [
                            'id',
                            'name',
                            'province'
                            
                        ]
                    },
                    { 
                        model: db.Location, 
                        as: 'toLocation',
                        attributes: [
                            'id',
                            'name',
                            'province'
                            
                        ] 
                    }
                ],
                raw: true,
                nest: true
            })
            resolve({
                success: scheduleResponse ? true : false,
                data: {
                    scheduleData: scheduleResponse? scheduleResponse : null,
                    routeData: routeResponse? routeResponse : null
                }
            })

            resolve({
                success: false,
                data: null
            })         
        } catch (error) {
            reject(error)   
        }
    })
    

    export const getSchedules = ({fromLocationId, toLocationId, date}) => new Promise(async (resolve, reject) => {
        try {
            
            if (fromLocationId && toLocationId) {
                const routeId = await getRouteId({fromLocationId: fromLocationId, toLocationId: toLocationId})
                if (routeId !== null) {

                    const query = {}
                    query.routeId = routeId
                    if (date) {
                        query.date = date
                    }

                    console.log(query)

                    const scheduleResponse = await db.Schedule.findAndCountAll({
                        where: query,
                        attributes:{
                            exclude: ['createdAt', 'updatedAt']                            
                        },
                        raw: true
                    })
                    console.log(scheduleResponse)
                    const routeResponse = await db.Route.findOne({
                        where: {
                            id: routeId
                        },
                        attributes: [
                            'id'
                        ],
                        include: [
                            { 
                                model: db.Location, 
                                as: 'fromLocation' ,
                                attributes: [
                                    'id',
                                    'name',
                                    'province'
                                    
                                ]
                            },
                            { 
                                model: db.Location, 
                                as: 'toLocation',
                                attributes: [
                                    'id',
                                    'name',
                                    'province'
                                    
                                ] 
                            }
                        ],
                        raw: true,
                        nest: true
                    })
                    resolve({
                        success: scheduleResponse ? true : false,
                        data: {
                            scheduleData: scheduleResponse? scheduleResponse : null,
                            routeData: routeResponse? routeResponse : null
                        }
                    })
                }
    
                resolve({
                    success: false,
                    data: null
                })
            } else {
                const response = await db.Schedule.findAll()
                resolve({
                    success: response? true : false,
                    data: response? response : null
                })
            }            
        } catch (error) {
            reject(error)   
        }
    })

    export const getScheduleById = (id) => new Promise(async (resolve, reject) => {
        try {
            const response = await db.Schedule.findOne({ 
                where: { id: id },
                attributes:{
                    exclude: ['createdAt', 'updatedAt']                            
                },
                include: [
                    {
                        model: db.Route,
                        as: 'routeData',
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'duration', 'distance', 'description', 'status_code']
                        },
                        include: [
                            {
                                model: db.Location,
                                as: 'fromLocation',
                                attributes: ['name']
                            },
                            {
                                model: db.Location,
                                as: 'toLocation',
                                attributes: ['name']
                            }
                        ]

                    },
                    {
                        model: db.BusType,
                        attributes: ['code', 'name', 'totalSeats', 'layout']
                    }
                ]
            });
            resolve({
                success: response? true : false,
                data: response? response : null
            })
        } catch (error) {
            reject(error)   
        }
    })

    export const addSchedule = ({ routeId, departureTime, arrivalTime, Date, price, busType }) => new Promise(async (resolve, reject) => {
    try {
        const [schedule, created] = await db.Schedule.findOrCreate({
            where: {
                routeId,
                departureTime,
                date: Date // trường DB là 'date'
            },
            defaults: {
                arrivalTime,
                price,
                busType
            }
        });

        if (!created) {
            return resolve({
                success: false,
                message: 'Schedule already exists for this route, time and date'
            });
        }

        resolve({
            success: true,
            data: schedule
        });
    } catch (error) {
        reject(error);
    }
});

export const updateSchedule = ({ scheduleId, departureTime, arrivalTime, Date, price, busType }) => new Promise(async (resolve, reject) => {
    try {
        // Tìm schedule cần sửa
        const schedule = await db.Schedule.findByPk(scheduleId);
        if (!schedule) {
            return resolve({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Chỉ cập nhật trường nào được truyền vào
        if (departureTime !== undefined) schedule.departureTime = departureTime;
        if (arrivalTime !== undefined) schedule.arrivalTime = arrivalTime;
        if (Date !== undefined) schedule.date = Date;
        if (price !== undefined) schedule.price = price;
        if (busType !== undefined) schedule.busType = busType;

        await schedule.save();

        resolve({
            success: true,
            data: schedule
        });
    } catch (error) {
        reject(error);
    }
});

export const deleteSchedule = ({ scheduleId }) => new Promise(async (resolve, reject) => {
    try {
        const schedule = await db.Schedule.findByPk(scheduleId);
        if (!schedule) {
            return resolve({
                success: false,
                message: 'Schedule not found'
            });
        }
        await schedule.destroy();
        resolve({
            success: true,
            message: 'Schedule deleted successfully'
        });
    } catch (error) {
        reject(error);
    }
});