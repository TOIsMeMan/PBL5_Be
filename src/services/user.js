import db from '../models'

export const getOne = (userId) => new Promise(async (resolve, reject) => {
    try {
        console.log(`userId: ${userId}`)
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