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

    export const getSchedules = ({fromLocationId, toLocationId}) => new Promise(async (resolve, reject) => {
        try {
            const routeId = await getRouteId({fromLocationId: fromLocationId, toLocationId: toLocationId})
            if (routeId !== null) {
                const scheduleResponse = await db.Schedule.findAndCountAll({
                    where: {
                        routeId: routeId
                    },
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
            
        } catch (error) {
            reject(error)   
        }
    })