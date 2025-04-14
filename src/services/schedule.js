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
        return response? response.id : null
    }

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