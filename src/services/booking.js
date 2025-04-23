import db from '../models'

export const sendBooking = ({id, scheduleId}) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
                    where: { id: userId },
                    attributes:{
                        exclude: ['password', 'createdAt', 'updatedAt']                            
                    },
                    include: [
                        {
                            model: db.Role, 
                            as: 'roleData',
                            attributes: [
                                'id',
                                'code',
                                'value'
                            ]
                        }
                    ],
                    raw: true,
                    nest: true
                })

        resolve({
            success: response ? true : false,
            data: response? {
                user: response
            } : null
        })
    } catch (error) {
        reject(error)
    }
})